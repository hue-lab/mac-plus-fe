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
  // const [
  //   categoryTree,
  //   footerNav,
  //   layoutFields,
  // ] = await Promise.all([
  //   getCategoryTree(),
  //   getMenuByCode("footer_nav"),
  //   getFieldsObject(
  //     "telegram",
  //     "viber",
  //     "instagram",
  //     "phone",
  //     "email",
  //     "address",
  //     "work_time",
  //     "copyright",
  //     "legal",
  //     "nav-sale-title",
  //     "nav-sale-link",
  //     "nav-sale-image",
  //     "main-seo-title",
  //     "main-seo-description",
  //     "nav-limit"
  //   )
  // ]);
  // console.log(categoryTree, footerNav, layoutFields);
  const [
    categoryTree,
    footerNav,
    layoutFields,
  ] = [
    {
      _id: '65130f8c61d75bc4c35899e4',
      name: 'root',
      handle: 'root',
      description: '',
      media: [],
      children: []
    },
    {
      _id: '6527f364d9f2333094474f95',
      name: 'Навигация [Footer]',
      handle: '#',
      description: '',
      media: [],
      children: [
        {
          _id: '6527faacfe86a8b9a00a6956',
          name: 'Главная',
          handle: '/',
          description: '',
          media: [],
          children: [],
          code: 'footer_nav_home',
          __v: 0
        },
        {
          _id: '65282729231262fb09808d7f',
          name: 'Каталог',
          handle: '/shop',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_cat',
          __v: 0
        },
        {
          _id: '65282746231262fb09808d97',
          name: 'Корзина',
          handle: '/pages/cart',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_cart',
          __v: 0
        },
        {
          _id: '65282773231262fb09808dad',
          name: 'Блог',
          handle: '/blog',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_blog',
          __v: 0
        },
        {
          _id: '652827b3231262fb09808dd2',
          name: 'Контакты',
          handle: '/pages/contact-us',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_cont',
          __v: 0
        },
        {
          _id: '6565a39cb334bb89c2daa450',
          name: 'Политика обработки персональных данных',
          handle: '/pages/privacy',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_privacy',
          __v: 0
        },
        {
          _id: '6565a407b334bb89c2daa47c',
          name: 'Договор публичной оферты',
          handle: '/pages/offer',
          description: null,
          media: [],
          children: [],
          code: 'footer_nav_offer',
          __v: 0
        },
        {
          _id: '6683d846ee4a005796633aff',
          name: 'Условия оплаты',
          handle: '/pages/payment-terms/',
          description: null,
          media: [],
          children: [],
          code: 'nav_footer_payment_terms',
          __v: 0
        },
        {
          _id: '6683d886ee4a00579663435b',
          name: 'Условия доставки',
          handle: '/pages/delivery-terms',
          description: null,
          media: [],
          children: [],
          code: 'nav_footer_delivery_terms',
          __v: 0
        }
      ],
      code: 'footer_nav',
      __v: 0
    },
    {
      address: 'г. Минск',
      copyright: ' Mac Plus',
      email: 'info@macplus.by',
      instagram: 'https://www.instagram.com/macplus.by/',
      legal: 'ООО "МакПлюсТрейд"\n' +
        'УНП 491468179\n' +
        'Дата регистрации в торговом реестре - 10.11.2023.',
      'main-seo-description': 'Продажа Электроники / Гаджетов в Минске и Беларуси',
      'main-seo-title': 'Интернет-магазин электроники в Беларуси',
      'nav-limit': '7',
      'nav-sale-image': '220c78c519b86b.webp',
      'nav-sale-link': 'https://macplus.by/macbook/MacBook_Pro_M3',
      'nav-sale-title': 'Купить сейчас',
      phone: '+375 (29) 644 40 42',
      telegram: 'https://t.me/macplusby',
      viber: '+375296444042',
      work_time: 'Пн - Вс / 9:00 - 20:00'
    }
  ]
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
