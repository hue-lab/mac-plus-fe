import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import {getImgPath, orderCategories} from "~/utils";

function MainMenu({ router, categoryTree, layoutFields }) {
  const { pathname, query, asPath, route } = useRouter();

  return (
    <nav className="main-nav ml-4">
      <ul className="menu">
        <li className={`${asPath === '/' ? 'active' : ''}`}>
          <ALink href="/">Главная</ALink>
        </li>
        {categoryTree.sort(orderCategories).map((route, index) => {
          return (
            <li className={`${route.children?.length ? 'submenu' : ''} ${asPath.includes(route._id) ? 'active' : ''}`} key={route.name + index}>
              <ALink href={{ pathname: `/${route.handle}` }}>{route.name}</ALink>

              {route.children?.length ?
                <div className="megamenu" style={{ marginLeft: "-19px" }}> ?
                  <div className="row">
                    <div className="col-5">
                      <ul>
                        {
                          route.children.sort(orderCategories).map((item, index) => (
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

                    <div style={{minHeight: '520px'}} className="col-7 menu-banner menu-banner1 banner banner-fixed">
                      <figure>
                        <img style={{objectFit: "cover"}} src={getImgPath(layoutFields['nav-sale-image'])} alt="Menu banner" width="221" height="330" />
                      </figure>
                      <div className="banner-content y-50">
                        <ALink href={layoutFields['nav-sale-link'] || '#'} className="btn btn-link btn-underline" style={{fontWeight: '600', fontSize: '1.7rem'}}>{ layoutFields['nav-sale-title'] || 'Купить' }<i
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
