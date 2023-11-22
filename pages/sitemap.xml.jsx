import {getArticles} from "~/utils/endpoints/articles";
import {getCategories} from "~/utils/endpoints/categoryTree";
import {getProducts} from "~/utils/endpoints/products";

const host = process.env.NEXT_PUBLIC_HOST || 'https://macplus.by';

function generateSiteMap({posts, categories, products}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${host}/</loc>
     </url>
     <url>
       <loc>${host}/pages/contact-us</loc>
     </url>
     <url>
       <loc>${host}/pages/trade-in</loc>
     </url>
     ${(categories || []).map(item => {
      return `
         <url>
             <loc>${`${host}/${item.handle === 'root' ? 'shop' : item.handle}`}</loc>
         </url>
        `;
     }).join('')}
     <url>
       <loc>${host}/blog</loc>
     </url>
     ${(products?.data || []).map(item => {
      return `
         <url>
             <loc>${`${host}/${item.categoryHandle}/${item.seo?.seoUrl}`}</loc>
         </url>
        `;
     }).join('')}
     ${(posts?.data || []).map(item => {
      return `
       <url>
           <loc>${`${host}/blog/${item.seo?.seoUrl}`}</loc>
       </url>
      `;
     }).join('')}
   </urlset>
 `;
}

function SiteMap() { }

export async function getServerSideProps({ res }) {
  const posts = await getArticles(1, 1000);
  const categories = await getCategories();
  const products = await getProducts({
    preview: true,
    pagination: {
      page: 1,
      limit: 2000,
    },
  });

  const sitemap = generateSiteMap({posts, categories, products});

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;