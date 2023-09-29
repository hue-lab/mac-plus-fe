import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useRouter } from 'next/router';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';

import { mainMenu } from '~/utils/data/menu';



function MobileMenu({ categoryTree }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    window.addEventListener('resize', hideMobileMenuHandler);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener('resize', hideMobileMenuHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    }
  }, [])

  useEffect(() => {
    setSearch("");
  }, [router.query.slug])

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector('body').classList.remove('mmenu-active');
    }
  }

  const hideMobileMenu = () => {
    document.querySelector('body').classList.remove('mmenu-active');
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search')) return e.target.closest('.header-search').classList.contains('show-results') || e.target.closest('.header-search').classList.add('show-results');

    document.querySelector('.header-search.show') && document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: {
        search: search
      }
    });
  }

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}>
      </div>

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}><i className="d-icon-times"></i></ALink>

      <div className="mobile-menu-container scrollable">
        <form action="#" className="input-wrapper" onSubmit={onSubmitSearchForm}>
          <input type="text" className="form-control" name="search" autoComplete="off" value={search} onChange={onSearchChange}
            placeholder="Search your keyword..." required />
          <button className="btn btn-search" type="submit">
            <i className="d-icon-search"></i>
          </button>
        </form>

        <Tabs selectedTabClassName="active" selectedTabPanelClassName="active" className="tab tab-nav-simple tab-nav-boxed form-tab mt-5">
          <TabList className="nav nav-tabs nav-fill">
            <Tab className="nav-item">
              <span className="nav-link">Меню</span>
            </Tab>
            <Tab className="nav-item">
              <span className="nav-link">Категории</span>
            </Tab>
          </TabList>
          <div className="tab-content">
            <TabPanel className="tab-pane">
              <ul className="mobile-menu mmenu-anim">
                <li>
                  <ALink href="/">Home</ALink>
                </li>

                <li>
                  <Card title="categories" type="mobile" url="/shop">
                    <ul>
                      <li>
                        <Card title="Variations 1" type="mobile">
                          <ul>
                            {
                              mainMenu.shop.variation1.map((item, index) => (
                                <li key={index}>
                                  <ALink href={'/' + item.url}>
                                    {item.title}
                                    {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                                  </ALink>
                                </li>
                              ))
                            }
                          </ul>
                        </Card>
                      </li>
                      <li>
                        <Card title="Variations 2" type="mobile">
                          <ul>
                            {
                              mainMenu.shop.variation2.map((item, index) => (
                                <li key={index}>
                                  <ALink href={'/' + item.url}>
                                    {item.title}
                                    {item.new ? <span className="tip tip-new">New</span> : ""}
                                  </ALink>
                                </li>
                              ))
                            }
                          </ul>
                        </Card>
                      </li>
                    </ul>
                  </Card>
                </li>

                <li>
                  <Card title="Products" type="mobile" url="/product/default/woman-dress">
                    <ul>
                      <li>
                        <Card title="Product Pages" type="mobile">
                          {
                            mainMenu.product.pages.map((item, index) => (
                              <ALink href={'/' + item.url} key={index}>
                                {item.title}
                                {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                              </ALink>
                            ))
                          }
                        </Card>
                      </li>

                      <li>
                        <Card title="Product Layouts" type="mobile">
                          <ul>
                            {
                              mainMenu.product.layout.map((item, index) => (
                                <li key={index}>
                                  <ALink href={'/' + item.url}>
                                    {item.title}
                                    {item.new ? <span className="tip tip-new">New</span> : ""}
                                  </ALink>
                                </li>
                              ))
                            }
                          </ul>
                        </Card>
                      </li>
                    </ul>
                  </Card>
                </li>

                <li>
                  <Card title="Pages" type="mobile" url="/pages/about-us">
                    <ul>
                      {
                        mainMenu.other.map((item, index) => (
                          <li key={index}>
                            <ALink href={'/' + item.url}>
                              {item.title}
                              {item.new ? <span className="tip tip-new">New</span> : ""}
                            </ALink>
                          </li>
                        ))
                      }
                    </ul>
                  </Card>
                </li>

                <li>
                  <Card title="Blog" type="mobile" url="/blog/classic">
                    <ul>
                      {
                        mainMenu.blog.map((item, index) => (
                          item.subPages ?
                            <li key={index}>
                              <Card title={item.title} url={'/' + item.url} type="mobile">
                                <ul>
                                  {
                                    item.subPages.map((item, index) => (
                                      <li key={index}>
                                        <ALink href={'/' + item.url}>
                                          {item.title}
                                        </ALink>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </Card>
                            </li> :

                            <li key={index} className={item.subPages ? "submenu" : ""}>
                              <ALink href={'/' + item.url}>
                                {item.title}
                              </ALink>
                            </li>
                        ))
                      }
                    </ul>
                  </Card>
                </li>

                <li>
                  <Card title="elements" type="mobile" url="/elements">
                    <ul>
                      {
                        mainMenu.element.map((item, index) => (
                          <li key={index}>
                            <ALink href={'/' + item.url}>
                              {item.title}
                            </ALink>
                          </li>
                        ))
                      }
                    </ul>
                  </Card>
                </li>

                <li><ALink href="#">Buy Riode!</ALink></li>
              </ul>
            </TabPanel>

            <TabPanel>
              <ul className="mobile-menu">
                <li><ALink href="/shop" class="menu-title">Все товары</ALink></li>
                {categoryTree.map((category, index) => (
                  category.children.length ?
                    <SlideToggle duration={300} collapsed key={index} >
                      {({ onToggle, setCollapsibleElement, toggleState }) => (
                        <li className={`submenu ${toggleState === 'EXPANDED' ? 'show' : ''}`}>
                          <ALink href={{ pathname: `/shop`, query: { category: category.handle, grid: query.grid } }} scroll={false}>
                            <i className="d-icon-camera1"></i>{category.name}
                            <span className={`toggle-btn ${toggleState.toLowerCase()}`} onClick={e => { e.stopPropagation(); e.preventDefault(); onToggle(); }}></span>
                          </ALink>

                          <div ref={setCollapsibleElement} style={{ overflow: 'hidden' }}>
                            <ul style={{ display: "block", background: "#232323" }}>
                              {category.children.map((item, index) => (
                                <li key={index}><ALink href={{ pathname: '/shop', query: { category: item.handle } }} scroll={false}>{item.name}</ALink></li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      )}
                    </SlideToggle>
                    :
                    <li key={index}>
                      <ALink href={{ pathname: '/shop', query: { category: category.handle } }}>
                        <i className="d-icon-camera1"></i>{category.name}
                      </ALink>
                    </li>
                ))}
              </ul>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default React.memo(MobileMenu);