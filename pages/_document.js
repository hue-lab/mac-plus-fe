import Document, {NextScript, Head, Main, Html} from 'next/document';
import Helmet from "react-helmet";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps, helmet: Helmet.renderStatic()}
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
                if (window) {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KZX7JHJG');
                }
              `
                  }}
          />
          <script id="google-tag-manager"
                  dangerouslySetInnerHTML={{
                    __html: `
                if (window) {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MNFW8ZCH');
                }
              `
                  }}
          />
          <script id="yandex-analytics"
                  dangerouslySetInnerHTML={{
                    __html: `
                if (window) {
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
                }
            `
                  }}
          />
          <script id="meta-pixel"
                  dangerouslySetInnerHTML={{
                    __html: `
               !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1184434382543279');
                fbq('track', 'PageView');
            `
                  }}
          />
          <script dangerouslySetInnerHTML={{
                    __html: `
                var _mtm = window._mtm = window._mtm || [];
                 _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
                 (function () {
                     var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                     g.src = 'https://stat1.clickfraud.ru/js/container_v5tvjjul.js'; s.parentNode.insertBefore(g, s);
                 })();
            `
          }} />
          <noscript>
            <div><img src="https://mc.yandex.ru/watch/96220740" style={{position: 'absolute', left: '-9999px'}} alt=""/>
            </div>
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
          {this.headTitle}
          {this.headMeta}
          <meta name="google-site-verification" content="zkGKtNXlNUPH0rhw2sORnyS0J9USz7B6xXI0Gey3NwE"/>
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
        <noscript>
          <img src="https://www.facebook.com/tr?id=1184434382543279&ev=PageView&noscript=1" height="1" width="1"
               style={{display: 'none'}}/>
        </noscript>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
