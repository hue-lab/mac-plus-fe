import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

function MainMenu({ router, categoryTree }) {
  const { pathname, query, asPath, route } = useRouter();

  return (
    <nav className="main-nav ml-4">
      <ul className="menu">
        <li className={`${asPath === '/' ? 'active' : ''}`}>
          <ALink href="/">Главная</ALink>
        </li>
        {categoryTree.map((route, index) => {
          return (
            <li className={`${route.children?.length ? 'submenu' : ''} ${asPath.includes(route._id) ? 'active' : ''}`} key={route.name + index}>
              <ALink href={{ pathname: `/${route.handle}` }}>{route.name}</ALink>

              {route.children?.length ?
                <div className="megamenu" style={{ marginLeft: "-19px" }}> ?
                  <div className="row">
                    <div className="col-5">
                      <ul>
                        {
                          route.children.map((item, index) => (
                            <li key={`shop-${item.name + index}`}>
                              <ALink href={{ pathname: `/${item.handle}` }}>
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
                </div> : ''}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainMenu;
