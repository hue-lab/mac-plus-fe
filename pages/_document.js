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
          <script id="google-tag-manager"
                  dangerouslySetInnerHTML={{
                    __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KZX7JHJG');
              `
                  }}
          />
          <script id="google-tag-manager"
                  dangerouslySetInnerHTML={{
                    __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MNFW8ZCH');
              `
                  }}
          />
          <script id="yandex-analytics"
                  dangerouslySetInnerHTML={{
                    __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                 m[i].l=1*new Date();
                 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              
                 ym(96220740, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                 });
            `
                  }}
          />
          <noscript>
            <div><img src="https://mc.yandex.ru/watch/96220740" style={{position: 'absolute', left: '-9999px'}} alt=""/></div>
          </noscript>
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
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZX7JHJG" height="0" width="0"
                  style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNFW8ZCH" height="0" width="0"
                  style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>

        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
