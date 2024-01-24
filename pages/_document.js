import Document, { NextScript, Head, Main, Html } from 'next/document';
import Helmet from "react-helmet";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, helmet: Helmet.renderStatic() }
  }

  get headTitle() {
    return this.props.helmet.title.toComponent();
  }

  get headMeta() {
    return this.props.helmet.meta.toComponent();
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <base href="/"></base>
          <title>Mac Plus</title>
          <link rel="icon" href="images/icons/favicon.ico"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"/>
          <link rel="stylesheet" type="text/css" href="vendor/riode-fonts/riode-fonts.css"/>
          <link rel="stylesheet" type="text/css" href="vendor/fontawesome-free/css/all.min.css"/>
          <link rel="stylesheet" type="text/css" href="vendor/owl-carousel/owl.carousel.min.css"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
          <script src="//code.jivo.ru/widget/ZlrgcjXbN7" async></script>
          {this.headTitle}
          {this.headMeta}
        </Head>

        <body>
          <Main/>
          <NextScript/>

          <script async src="https://www.googletagmanager.com/gtag/js?id=G-SBW9V252TZ"/>
          <script id="google-analytics"
                  dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-SBW9V252TZ');
              `
                  }}
          />

          <script id="yandex-analytics"
                  dangerouslySetInnerHTML={{
                    __html: `
              (function (m, e, t, r, i, k, a){m[i] = m[i] || function () {
                (m[i].a = m[i].a || []).push(arguments)
              };
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) {return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(96220740, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `
                  }}
          />

          <noscript>
            <div><img src="https://mc.yandex.ru/watch/96220740" style={{position: 'absolute', left: '-9999px'}} alt=""/>
            </div>
          </noscript>
        </body>
      </Html>
    )
  }
}
