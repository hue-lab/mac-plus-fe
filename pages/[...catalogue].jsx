import { getItemBySlug } from "~/utils/endpoints/item";
import ProductItem from "~/components/items/product";
import { getProducts, getProductsAdvanced } from "~/utils/endpoints/products";
import { getDeliveryMethods } from "~/utils/endpoints/orders";
import { getFilters } from "~/utils/endpoints/filters";
import { getBannerSlide } from "~/utils/endpoints/slides";
import { getFieldsObject } from "~/utils/endpoints/fields";
import Category from "~/components/items/category";
import { pagePath, parseFilterString } from "~/utils";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import {getSeoByUrl} from "~/utils/endpoints/seo";
import {isTemporaryApiError} from "~/utils/endpoints/fetch-json";
import {prepareSeoContent} from "~/utils/seo-content";

export async function getServerSideProps(context) {
  try {
    return await loadCatalogue(context);
  } catch (error) {
    if (!isTemporaryApiError(error)) throw error;
    context.res.statusCode = 503;
    return { props: { serviceUnavailable: true, retryUrl: context.resolvedUrl } };
  }
}

async function loadCatalogue({ query, params, resolvedUrl, req }) {
  const cyrillicToTranslit = new CyrillicToTranslit();
  const {
    per_page,
    type,
    sortby,
    min_price,
    max_price,
    search,
  } = query;
  const fullPath = params.catalogue.join("/");
  const pathSegments = fullPath.split("/filter/");
  const page = parseInt(fullPath.split("/page-is-")[1] || 1);
  const filterString = pathSegments[1]?.split("/page-is-")[0] || null;
  const filterObject = parseFilterString(filterString);
  const path = pathSegments[0].split("/page-is-")[0];
  const searchValue = path === "shop" && typeof search === "string" ? search : null;
  const item = path === "shop"
    ? { name: "Все товары", title: "Каталог техники Apple в Минске" }
    : await getItemBySlug(path);
  if (!item || item.statusCode === 404) return { notFound: true };

  const route = item.catalogueRoute;
  const normalizedPath = pagePath((route?.publicPath || path) + fullPath.slice(path.length));
  const requestedUrl = new URL(req.headers['x-nextjs-data'] ? resolvedUrl : req.url, "http://localhost");
  const redirect = () => {
    if (decodeURI(requestedUrl.pathname) === normalizedPath) return null;
    return { redirect: { destination: encodeURI(normalizedPath) + requestedUrl.search, statusCode: 301 } };
  };
  const loadSeo = () => Promise.all([
    getFieldsObject(
      "category-seo-header",
      "category-seo-title",
      "category-seo-description",
      "product-seo-header",
      "product-seo-title",
      "product-seo-description",
    ),
    getSeoByUrl(`/${fullPath}`).then((seo) => {
      if (seo || !route || route.sourcePath === path) return seo;
      return getSeoByUrl(`/${route.sourcePath}${fullPath.slice(path.length)}`);
    }),
  ]);

  if (item.category) {
    if (path !== fullPath) return { notFound: true };
    const redirectResult = redirect();
    if (redirectResult) return redirectResult;
    const [
      featuredRes,
      deliveryRes,
      [seoFields, seoMainMeta],
    ] = await Promise.all([
      getProductsAdvanced(item.category._id, item._id),
      getDeliveryMethods(),
      loadSeo(),
    ]);
    const { html } = prepareSeoContent(seoMainMeta?.content || item.content || "");
    return { props: {
      featured: featuredRes || [],
      deliveryMethods: deliveryRes || [],
      data: item,
      type: "product",
      mainSeo: { ...seoMainMeta, content: html },
      seoFields,
      canonicalPath: route?.canonicalPath || null,
      noindex: Boolean(item.category.isHidden),
    } };
  }

  const filters = await getFilters(item._id) || [];
  const filtersPairs = filters.reduce((filterAcc, filterCurr) => {
    const optionsArr = [];
    const filterKey = filterCurr.code || filterCurr._id;
    const valuesPairs = (filterCurr.options || []).reduce(
      (optionAcc, optionCurr) => {
        const translitOption = cyrillicToTranslit.transform(String(optionCurr), "_").toLowerCase();
        optionsArr.push({
          key: translitOption,
          value: optionCurr,
        });
        optionAcc[translitOption] = optionCurr;
        return optionAcc;
      },
      Object.create(null)
    );
    if (filterCurr.type === "CHECKBOX") valuesPairs.true = true;
    filterAcc[filterKey] = {
      valuesPairs,
      ...filterCurr,
    };
    filterCurr.options = optionsArr;
    return filterAcc;
  }, Object.create(null));
  const suffix = fullPath.slice(path.length);
  if (suffix && !/^(?:\/filter\/[^/]+(?:\/[^/]+)*?)?(?:\/page-is-[1-9]\d*)?$/.test(suffix)) {
    return { notFound: true };
  }
  if (filterString && (Object.keys(filterObject).length !== filterString.split("/").length ||
    Object.entries(filterObject).some(([key, values]) =>
      !Object.hasOwn(filtersPairs, key) || values.some((value) => !Object.hasOwn(filtersPairs[key].valuesPairs, value))
    ))) return { notFound: true };
  const redirectResult = redirect();
  if (redirectResult) return redirectResult;
  const filtersCodes = (filters || []).map((filterItem) => {
    return filterItem.code || filterItem._id;
  });
  const requestFilters = {
    baseProperties: {},
    customProperties: {},
    preview: true,
    storefrontListing: true,
    listingDescriptions: type === 'list',
    pagination: {
      page: Number(page) || 1,
      limit: [12, 24, 36].includes(Number(per_page)) ? Number(per_page) : 12,
    },
  };

  if (filterObject && Object.keys(filterObject).length) {
    requestFilters.customProperties = Object.keys(filterObject).reduce((acc, key) => {
      const values = filterObject[key];
      if (values?.length && values[0].length && filtersCodes.includes(key)) {
        const filterId = (filters || []).find((filter) => filter.code === key)?._id;
        if (values.length === 1) {
          acc[filterId || key] = {
            $eq: values[0] === "true" ? true : filtersPairs[key].valuesPairs[values[0]],
          };
        } else {
          acc[filterId || key] = {
            $in: values.map((val) => filtersPairs[key].valuesPairs[val]),
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
      $eq: item._id,
    };
  }
  if (search) {
    requestFilters.search = search;
  }
  if (sortby) {
    switch (sortby) {
      case "price-low":
        requestFilters.sort = {
          direction: 1,
          property: "totalPrice",
        };
        break;
      case "price-high":
        requestFilters.sort = {
          direction: -1,
          property: "totalPrice",
        };
        break;
    }
  }
  const [products, bannerResult, [seoFields, seoMainMeta]] = await Promise.all([
    getProducts(requestFilters),
    getBannerSlide(),
    loadSeo(),
  ]);
  const banner = bannerResult?.data?.[0];
  const { html, faq } = prepareSeoContent(seoMainMeta?.content || item.content || "");
  const filterLabel = Object.entries(filterObject).map(([key, values]) =>
    `${filtersPairs[key].name} - ${values.map((value) => filtersPairs[key].valuesPairs[value]).join(', ')}`
  ).join('; ');

  return { props: {
    page,
    banner: banner ? {
      media: banner.media || null,
      title: banner.title || '',
      description: banner.description || '',
      seo: { seoUrl: banner.seo?.seoUrl || null, seoImageAlt: banner.seo?.seoImageAlt || '' },
    } : null,
    data: {
      name: item.name || '',
      title: item.title || '',
      handle: item.handle || null,
      keywords: item.keywords || [],
    },
    products: {
      metadata: products.metadata,
      data: products.data.map(({_id, name, media, price, totalPrice, discount, brand, description,
        isNew, isRec, isStock, categoryHandle, categoryName, seo, publicPath}) => ({
        _id, name: name || '', media: media || [], price: price ?? null, totalPrice: totalPrice ?? null,
        discount: discount || 0, brand: brand?.name ? {name: brand.name} : null,
        ...(type === 'list' && {description: description || ''}),
        isNew: Boolean(isNew), isRec: Boolean(isRec), isStock: Boolean(isStock),
        categoryHandle: categoryHandle || null, categoryName: categoryName || null, publicPath: publicPath || null,
        seo: {seoUrl: seo?.seoUrl || null, seoTitle: seo?.seoTitle || null, seoImage: seo?.seoImage?.slice(0, 1) || []},
      })),
    },
    filters: filters.map(({_id, code, name, type, options, units}) => ({
      _id, code: code || _id, name: name || '', type: type || null, options, units: units || null,
    })),
    type: "category",
    filterObject: filterObject,
    filterLabel,
    fullPath: fullPath,
    mainSeo: { ...seoMainMeta, content: html },
    seoFields,
    searchValue,
    faq,
    isShop: path === "shop" && !suffix && !searchValue,
    noindex: Boolean(item.isHidden || searchValue || sortby || min_price || max_price),
  } };
}

export default function GenericCatalogueItem({
  data,
  type,
  featured,
  deliveryMethods,
  banner,
  filters,
  products,
  page,
  filterObject,
  filterLabel,
  fullPath,
  mainSeo,
  seoFields,
  searchValue,
  faq,
  isShop,
  noindex,
}) {
  return type === "product" ? (
    <ProductItem
      product={data}
      featured={featured}
      deliveryMethods={deliveryMethods}
      seoFields={seoFields}
      mainSeo={mainSeo}
      noindex={noindex}
    />
  ) : (
    <Category
      searchValue={searchValue}
      page={page}
      banner={banner}
      filters={filters}
      products={products}
      category={data}
      filterObject={filterObject}
      fullPath={fullPath}
      filterLabel={filterLabel}
      seoFields={seoFields}
      mainSeo={mainSeo}
      faq={faq}
      isShop={isShop}
      noindex={noindex}
    />
  );
}
