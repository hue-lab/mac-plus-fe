import {getItemBySlug} from "~/utils/endpoints/item";
import ProductItem from "~/components/items/product";
import {getProducts, getProductsAdvanced} from "~/utils/endpoints/products";
import {getDeliveryMethods} from "~/utils/endpoints/orders";
import {getFilters} from "~/utils/endpoints/filters";
import {getBannerSlide} from "~/utils/endpoints/slides";
import Category from "~/components/items/category";
import {parseFilterString} from "~/utils";
import CyrillicToTranslit from "cyrillic-to-translit-js";

GenericCatalogueItem.getInitialProps = async ({ query, res }) => {
  const cyrillicToTranslit = new CyrillicToTranslit();
  const { catalogue, page, per_page, price, sortby, type, min_price, max_price, search, ...customProperties } = query;
  const fullPath = catalogue.join('/');
  const pathSegments = fullPath.split('/filter/');
  const filterString = pathSegments[1] || null;
  const filterObject = parseFilterString(filterString);
  const path = pathSegments[0];
  const item = path === 'shop' ? {
    name: 'Все товары',
    description: 'Все товары каталога',
  } : await getItemBySlug(path);

  if (item?.statusCode === 404 && path !== 'shop') {
    if (res) {
      res.writeHead(301, {
        Location: '/404',
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end();
      return;
    }

    window.location = `${window.location.origin}/404`;
  }

  if (item?.price) {
    const featuredRes = await getProductsAdvanced(item.category._id, item._id);
    const deliveryRes = await getDeliveryMethods();
    return {
      featured: featuredRes || [],
      deliveryMethods: deliveryRes || [],
      data: item,
      type: 'product'
    }
  }

  const filters = item ? await getFilters(item._id) : [];
  const filtersPairs = filters.reduce((filterAcc, filterCurr) => {
    const optionsArr = [];
    filterAcc[filterCurr.code || filterCurr._id] = filterCurr.options.reduce((optionAcc, optionCurr) => {
       const translitOption = cyrillicToTranslit.transform(optionCurr, "_").toLowerCase();
       optionsArr.push({
         key: translitOption,
         value: optionCurr,
       });
       optionAcc[translitOption] = optionCurr;
       return optionAcc;
    }, {});
    filterCurr.options = optionsArr;
    return filterAcc;
  }, {});
  const filtersCodes = (filters || []).map(filterItem => {
    return filterItem.code || filterItem._id;
  });
  const banner = await getBannerSlide();
  const requestFilters = {
    baseProperties: {},
    customProperties: {},
    preview: true,
    pagination: {
      page: Number(page) || 1,
      limit: Number(per_page) || 12,
    }
  };

  if (filterObject && Object.keys(filterObject).length) {
    requestFilters.customProperties = Object.keys(filterObject).reduce((acc, key) => {
      const values = filterObject[key];
      if (values?.length && values[0].length && filtersCodes.includes(key)) {
        const filterId = (filters || []).find(filter => filter.code === key)?._id;
        if (values.length === 1) {
          acc[filterId || key] = {
            $eq: values[0] === 'true' ? true : filtersPairs[key][values[0]]
          }
        } else {
          acc[filterId || key] = {
            $in: values.map(val => filtersPairs[key][val]),
          };
        }
      }
      return acc;
    }, {});
  }
  if (min_price || max_price) {
    requestFilters.baseProperties.totalPrice = {};
    if (min_price) {
      requestFilters.baseProperties.totalPrice.$gte = Number(min_price);
    }
    if (max_price) {
      requestFilters.baseProperties.totalPrice.$lte = Number(max_price);
    }
  }
  if (item?._id) {
    requestFilters.baseProperties.categoryId = {
      $eq: item._id
    }
  }
  if (search) {
    requestFilters.search = search;
  }
  if (sortby) {
    switch (sortby) {
      case 'price-low':
        requestFilters.sort = {
          direction: 1,
          property: 'totalPrice',
        };
        break;
      case 'price-high':
        requestFilters.sort = {
          direction: -1,
          property: 'totalPrice',
        };
        break;
    }
  }
  const products = await getProducts(requestFilters);
  return {
    page: page,
    banner: banner?.data[0],
    data: item,
    products: products,
    filters,
    type: 'category',
    filterObject: filterObject,
  }
}

export default function GenericCatalogueItem({ data,  type, featured, deliveryMethods, banner, filters, products, page, filterObject }) {
  return type === 'product' ?
    <ProductItem product={data} featured={featured} deliveryMethods={deliveryMethods}/>
    : <Category page={page} banner={banner} filters={filters} products={products} category={data} filterObject={filterObject} />;
}
