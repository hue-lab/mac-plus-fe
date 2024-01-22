import { useStore, Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from "react-helmet";

import { wrapper } from "~/store";
import Layout from '~/components/layout';

import "~/public/sass/style.scss";
import {getCategoryTree} from "~/utils/endpoints/categoryTree";
import {getFieldsObject} from "~/utils/endpoints/fields";
import {getMenuByCode} from "~/utils/endpoints/menu";

const App = ({ Component, pageProps }) => {
  const store = useStore();

  return (
    typeof window === "undefined" ?
      <Provider store={store}>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <title>Mac Plus</title>

          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>

        <Layout categoryTree={pageProps.categoryTree} layoutFields={pageProps.layoutFields} footerNav={pageProps.footerNav}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      :
      <Provider store={store}>
        <PersistGate
          persistor={store.__persistor}
          loading={<div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
              <div className="bounce4"></div>
            </div>
          </div>}>
          <Helmet>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <title>Mac Plus</title>

            <meta name="keywords" content="Apple, Iphone, Mac, Ipad, Watch, AirPods" />
            <meta name="description" content="Продажа Электроники / Гаджетов в Минске и Беларуси" />
            <meta name="author" content="Mac Plus" />
          </Helmet>

          <Layout categoryTree={pageProps.categoryTree} layoutFields={pageProps.layoutFields} footerNav={pageProps.footerNav}>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const categoryTree = await getCategoryTree();
  const footerNav = await getMenuByCode('footer_nav');
  const layoutFields = await getFieldsObject('telegram', 'viber', 'instagram', 'phone', 'email', 'address', 'work_time', 'copyright', 'legal', 'nav-sale-title', 'nav-sale-link', 'nav-sale-image');
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps: Object.assign(pageProps, { categoryTree: categoryTree.children, footerNav, layoutFields }) };
};

export default wrapper.withRedux(App);
