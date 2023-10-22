import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useRouter } from 'next/router';
import SlideToggle from 'react-slide-toggle';
import ALink from '~/components/features/custom-link';


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
              <span className="nav-link">Навигация</span>
            </Tab>
          </TabList>
          <div className="tab-content">
            <TabPanel>
              <ul className="mobile-menu">
                <li><ALink href="/">Главная</ALink></li>
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
