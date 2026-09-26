import {getArticles} from "~/utils/endpoints/articles";
import {getCategories} from "~/utils/endpoints/categoryTree";
import {getProducts} from "~/utils/endpoints/products";
import {getAllSeo} from "~/utils/endpoints/seo";
import {pageUrl} from "~/utils";

function generateSiteMap({posts, categories, products, filters}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${pageUrl()}</loc>
     </url>
     <url>
       <loc>${pageUrl('pages/contact-us')}</loc>
     </url>
     <url>
       <loc>${pageUrl('pages/trade-in')}</loc>
     </url>
     ${(categories || []).map(item => {
      return `
         <url>
             <loc>${pageUrl(item.handle === 'root' ? 'shop' : item.handle)}</loc>
         </url>
        `;
     }).join('')}
     ${(filters || []).map(item => {
      return `
         <url>
             <loc>${pageUrl(item.url)}</loc>
         </url>
          `;
      }).join('')}
     ${(products?.data || []).map(item => {
      return `
         <url>
             <loc>${pageUrl(item.categoryHandle, item.seo?.seoUrl)}</loc>
         </url>
        `;
     }).join('')}
     <url>
       <loc>${pageUrl('blog')}</loc>
     </url>
     ${(posts?.data || []).map(item => {
      return `
       <url>
           <loc>${pageUrl('blog', item.seo?.seoUrl)}</loc>
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
  const filters = (await getAllSeo() || []).filter((item) => {
    return item.url?.includes('/filter/')
  });
  const products = await getProducts({
    preview: true,
    pagination: {
      page: 1,
      limit: 2000,
    },
  });

  const sitemap = generateSiteMap({posts, categories, products, filters});

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;