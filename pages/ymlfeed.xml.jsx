import {getCategoryTree} from "~/utils/endpoints/categoryTree";
import {getProducts} from "~/utils/endpoints/products";
import {getFieldsObject} from "~/utils/endpoints/fields";
import {getImgPath} from "~/utils";

const host = process.env.NEXT_PUBLIC_HOST || 'https://macplus.by';

function generateYmlFeed({categories, products, fields}) {
  const date = new Date();
  return `<?xml version="1.0" encoding="UTF-8"?>
    <yml_catalog date="${date.toISOString()}">
      <shop>
        <name>${fields['yml-feed-name']}</name>
        <company>${fields['yml-feed-company']}</company>
        <url>${host}</url>
        <categories>
          ${(categories || []).reduce((acc, item) => {
            acc.push(`<category id="${item._id}">${item.name || ''}</category>`);
            if (item.children?.length) {
              item.children.forEach((child) => {
                acc.push(`<category id="${child._id}" parentId="${item._id}">${child.name || ''}</category>`)
              });
            }
            return acc;
          }, []).join('')}
        </categories>
        <delivery>${fields['yml-feed-delivery']}</delivery>
        <offers>
          ${(products?.data || []).map((item) => {
            return `
              <offer id="${item._id}">
                <name>${normalizeString((item.name || ''))}</name>
                <vendor>${normalizeString(item.brand?.name || '')}</vendor>
                <url>${`${host}/${item.categoryHandle}/${item.seo?.seoUrl}`}</url>
                <price>${item.totalPrice || 0}</price>
                <oldprice>${item.price || 0}</oldprice>
                <enable_auto_discounts>true</enable_auto_discounts>
                <currencyId>BYN</currencyId>
                <categoryId>${item.categoryId[0]._id}</categoryId>
                <picture>${item.media?.length ? getImgPath(item.media[0]) : undefined}</picture>
                <description>${normalizeString(item.description || '')}</description>       
              </offer>
            `
  }).join('')}            
        </offers>
      </shop>
    </yml_catalog>
  `;
}

function YmlFeed() { }

function normalizeString(name) {
  return name
    .replace("\"", "&quot;")
    .replace("&", "&amp;")
    .replace(">", "&gt;")
    .replace("<", "&lt;")
    .replace("'", "&apos;")
    .trim()
}

export async function getServerSideProps({ res }) {
  const categoriesRoot = await getCategoryTree();
  const categories = categoriesRoot?.children;
  const fields = await getFieldsObject('yml-feed-name', 'yml-feed-company', 'yml-feed-delivery');
  const products = await getProducts({
    preview: true,
    pagination: {
      page: 1,
      limit: 2000,
    },
  });
  const ymlFeed = generateYmlFeed({categories, products, fields});

  res.setHeader('Content-Type', 'text/xml');
  res.write(ymlFeed);
  res.end();

  return {
    props: {},
  };
}

export default YmlFeed;
