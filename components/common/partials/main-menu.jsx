import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

function MainMenu({ router }) {
  const { pathname, query, asPath, route } = useRouter();
  const navBar = [
    {
      name: 'Главная',
      href: '/',
    },
    {
      name: 'Mac',
      href: '/shop/all/',
      children: [
        {
          name: 'MacBook',
          href: '/shop/macbook/',
        },
      ]
    },
    {
      name: 'iPhone',
      href: '/shop/iphone/',
    },
    {
      name: 'iPad',
      href: '/shop/ipad/',
    },
    {
      name: 'Watch',
      href: '/shop/watch/',
    },
    {
      name: 'AirPods',
      href: '/shop/airpods/',
    },
  ];

  return (
    <nav className="main-nav ml-4">
      <ul className="menu">{navBar.map((route, index) => {
        console.log(asPath);
        return (
          <li className={`${route.children?.length ? 'submenu' : ''} ${asPath === route.href ? 'active' : ''}`} key={route.name + index}>
            <ALink href={route.href}>{route.name}</ALink>

            { route.children?.length && <div className="megamenu" style={{ marginLeft: "-19px" }}>
              <div className="row">
                <div className="col-5">
                  <ul>
                    {
                      route.children.map((item, index) => (
                        <li key={`shop-${item.name + index}`}>
                          <ALink href={'/' + item.href}>
                            {item.name}
                            {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                          </ALink>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className="col-7 menu-banner menu-banner1 banner banner-fixed">
                  <figure>
                    <img src="./images/menu/banner-1.jpg" alt="Menu banner" width="221" height="330" />
                  </figure>
                  <div className="banner-content y-50">
                    <h4 className="banner-subtitle font-weight-bold text-primary ls-m">Sale.
                    </h4>
                    <h3 className="banner-title font-weight-bold"><span
                      className="text-uppercase">Up to</span>70% Off</h3>
                    <ALink href={"/shop"} className="btn btn-link btn-underline">shop now<i
                      className="d-icon-arrow-right"></i></ALink>
                  </div>
                </div>
              </div>
            </div> }
          </li>
        )
      })}
      </ul>
    </nav>
  )
}

export default MainMenu;
