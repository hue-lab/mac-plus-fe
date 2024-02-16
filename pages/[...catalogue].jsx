import {getItemBySlug} from "~/utils/endpoints/item";
import ProductItem from "~/components/items/product";
import {getProducts, getProductsAdvanced} from "~/utils/endpoints/products";
import {getDeliveryMethods} from "~/utils/endpoints/orders";
import {getFilters} from "~/utils/endpoints/filters";
import {getBannerSlide} from "~/utils/endpoints/slides";
import Category from "~/components/items/category";

GenericCatalogueItem.getInitialProps = async ({ query, res }) => {
  const { catalogue, page, per_page, price, sortby, type, min_price, max_price, search, ...customProperties } = query;
  const path = catalogue.join('/');
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

  if (customProperties && Object.keys(customProperties).length) {
    requestFilters.customProperties = Object.keys(customProperties).reduce((acc, key) => {
      const values = customProperties[key]?.split(',');
      if (values?.length && values[0].length && filtersCodes.includes(key)) {
        const filterId = (filters || []).find(filter => filter.code === key)?._id;
        if (values.length === 1) {
          acc[filterId || key] = {
            $eq: values[0] === 'true' ? true : values[0]
          }
        } else {
          acc[filterId || key] = {
            $in: values,
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
  }
}

export default function GenericCatalogueItem({ data,  type, featured, deliveryMethods, banner, filters, products, page }) {
  return type === 'product' ?
    <ProductItem product={data} featured={featured} deliveryMethods={deliveryMethods}/>
    : <Category page={page} banner={banner} filters={filters} products={products} category={data}/>;
}
