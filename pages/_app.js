import {useStore, Provider} from "react-redux";
import {wrapper} from "~/store";
import Layout from "~/components/layout";
import "~/public/sass/style.scss";
import {getCategoryTree} from "~/utils/endpoints/categoryTree";
import {getFieldsObject} from "~/utils/endpoints/fields";
import {getMenuByCode} from "~/utils/endpoints/menu";
import NextNProgress from 'nextjs-progressbar';
import React from "react";
import Head from 'next/head'

const App = ({Component, pageProps}) => {
  const store = useStore();

  return (
    <Provider store={store}>
      <NextNProgress color="#007945" />
      <Head>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <title>{pageProps.layoutFields["main-seo-title"] || "Mac Plus"}</title>
        <meta
          property="og:title"
          content={pageProps.layoutFields["main-seo-title"] || "Mac Plus"}
        />
        <meta name="keywords" content="React Template"/>
        <meta
          name="description"
          content={
            pageProps.layoutFields["main-seo-description"] ||
            "Интернет-магазин электроники в Беларуси"
          }
        />
        <meta
          property="og:description"
          content={
            pageProps.layoutFields["main-seo-description"] ||
            "Интернет-магазин электроники в Беларуси"
          }
        />
        <meta name="author" content="D-THEMES"/>
      </Head>
      <Layout
        categoryTree={pageProps.categoryTree}
        layoutFields={pageProps.layoutFields}
        footerNav={pageProps.footerNav}
      >
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
};

App.getInitialProps = async ({Component, ctx}) => {
  const [
    categoryTree,
    footerNav,
    layoutFields,
  ] = await Promise.all([
    getCategoryTree(),
    getMenuByCode("footer_nav"),
    getFieldsObject(
      "telegram",
      "viber",
      "instagram",
      "phone",
      "email",
      "address",
      "work_time",
      "copyright",
      "legal",
      "nav-sale-title",
      "nav-sale-link",
      "nav-sale-image",
      "main-seo-title",
      "main-seo-description",
      "nav-limit"
    )
  ]);
  let pageProps = {};
  if (Component.getInitialProps) {
    const pagePropsRes = await Component.getInitialProps(ctx);
    if (pagePropsRes) {
      pageProps = pagePropsRes;
    }
  }
  return {
    pageProps: Object.assign(pageProps, {
      categoryTree: categoryTree.children,
      footerNav,
      layoutFields,
    }),
  };
};

export default wrapper.withRedux(App);
