import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import OwlCarousel from '~/components/features/owl-carousel';

import SmallProduct from '~/components/features/product/product-sm';



import filterData from '~/utils/data/shop';
import { scrollTopHandler } from '~/utils';

export default function SidebarFilterOne({ type = "left", isFeatured = false, filters = [] }) {
  const router = useRouter();
  const query = router.query;
  const data = null;
  const loading = false;
  let tmpPrice = 50000;
  const [filterPrice, setPrice] = useState({
    min: 0,
    max: 0,
  });
  const [isFirst, setFirst] = useState(true);
  let sidebarData = data && data.shopSidebarData;
  let timerId;

  useEffect(() => {
    window.addEventListener('resize', hideSidebar);

    return () => {
      window.removeEventListener('resize', hideSidebar);
    }
  }, [])

  const filterByPrice = (e) => {
    e.preventDefault();
    let url = router.pathname.replace('[grid]', query.grid);
    let arr = [`min_price=${filterPrice.min}`, `max_price=${filterPrice.max}`, 'page=1'];
    for (let key in query) {
      if (key !== 'min_price' && key !== 'max_price' && key !== 'page' && key !== 'grid') arr.push(key + '=' + query[key]);
    }
    url = url + '?' + arr.join('&');
    router.push(url);
  }

  const containsAttrInUrl = (type, value) => {
    const currentQueries = query[type] ? query[type].split(',') : [];
    return currentQueries && currentQueries.includes(value);
  }

  const getUrlForAttrs = (type, value) => {
    let currentQueries = query[type] ? query[type].split(',') : [];
    currentQueries = containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
    return currentQueries.join(',');
  }

  const onChangePrice = value => {
    setPrice(value);
  }

  const toggleSidebar = e => {
    e.preventDefault();
    document.querySelector('body').classList.remove(`${type === "left" || type === "off-canvas" ? "sidebar-active" : "right-sidebar-active"}`);

    let stickyWraper = e.currentTarget.closest('.sticky-sidebar-wrapper');

    let mainContent = e.currentTarget.closest('.main-content-wrap');
    if (mainContent && type !== "off-canvas" && query.grid !== '4cols')
      mainContent.querySelector('.row.product-wrapper') && mainContent.querySelector('.row.product-wrapper').classList.toggle('cols-md-4');

    if (mainContent && stickyWraper) {
      stickyWraper.classList.toggle('closed');

      if (stickyWraper.classList.contains('closed')) {
        mainContent.classList.add('overflow-hidden');
        clearTimeout(timerId);
      } else {
        timerId = setTimeout(() => {
          mainContent.classList.remove('overflow-hidden');
        }, 500);
      }
    }
  }

  const showSidebar = (e) => {
    e.preventDefault();
    document.querySelector('body').classList.add("sidebar-active");
  }

  const hideSidebar = () => {
    document.querySelector('body').classList.remove(`${type === "left" || type === "off-canvas" || type === "boxed" || type === "banner" ? "sidebar-active" : "right-sidebar-active"}`);
  }

  return (
    <aside className={`col-lg-3 shop-sidebar skeleton-body ${type === "off-canvas" ? '' : "sidebar-fixed sticky-sidebar-wrapper"} ${type === "off-canvas" || type === "boxed" ? '' : "sidebar-toggle-remain"} ${type === "left" || type === "off-canvas" || type === "boxed" || type === "banner" ? "sidebar" : "right-sidebar"}`}>
      <div className="sidebar-overlay" onClick={hideSidebar}></div>
      {
        type === "boxed" || type === "banner" ? <a href="#" className="sidebar-toggle" onClick={showSidebar}><i className="fas fa-chevron-right"></i></a> : ''
      }
      <ALink className="sidebar-close" href="#" onClick={hideSidebar}><i className="d-icon-times"></i></ALink>

      <div className="sidebar-content">
        {
          !loading && filters ?
            <div className="sticky-sidebar">
              {
                type === "boxed" || type === "banner" ? '' :
                  <div className="filter-actions mb-4">
                    <a href="#" className="sidebar-toggle-btn toggle-remain btn btn-outline btn-primary btn-icon-right btn-rounded" onClick={toggleSidebar}>
                      Filter
                      {
                        type === "left" || type === "off-canvas" ?
                          <i className="d-icon-arrow-left"></i> : <i className="d-icon-arrow-right"></i>
                      }
                    </a>
                    <ALink href={{ pathname: router.pathname, query: { grid: query.grid, type: router.query.type ? router.query.type : null } }} scroll={false} className="filter-clean">Clean All</ALink>
                  </div>
              }

              <div className="widget widget-collapsible">
                <Card title="<h3 class='widget-title'>Цена<span class='toggle-btn p-0 parse-content'></span></h3>" type="parse" expanded={true}>
                  <div className="widget-body">
                    <form action="#">
                      <div className="widget-body filter-items">
                        <div className="row">
                          <div className="col-xs-6">
                            <label>От</label>
                            <div datapostfix="BYN" className="widget-input-number"><input className="form-control" type="number" /></div>
                          </div>
                          <div className="col-xs-6">
                            <label>До</label>
                            <div datapostfix="BYN" className="widget-input-number"><input className="form-control" type="number" /></div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>

              {(filters || []).map((item, index) => (
                ['CHECKBOX'].includes(item.type) ?

                  <div key={index} className="widget widget-box-checkbox widget-collapsible">
                    <Card type="parse" expanded={true}>
                      <ul className="filter-items">
                        <li
                          className={containsAttrInUrl(item._id, 'true') ? 'active' : ''}
                          key={index}
                        >
                          <ALink className="font-weight-bold" scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, [item._id]: !containsAttrInUrl(item._id, 'true') ? true : undefined } }}>{item.name}</ALink>
                        </li>
                      </ul>
                    </Card>
                  </div>

                  :

                  <div key={index} className="widget widget-collapsible">
                  <Card title={`<h3 class='widget-title'>${item.name}<span class='toggle-btn p-0 parse-content'></span></h3>`} type="parse" expanded={false}>
                    { item.type === 'NUMBER_SELECT' && <ul className="widget-body filter-items">
                      {
                        (item.options || []).map((option, index) => (
                            <li
                              className={containsAttrInUrl(item._id, option) ? 'active' : ''}
                              key={index}
                            >
                              <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, [item._id]: getUrlForAttrs(item._id, option) } }}>{option} {item.units}</ALink>
                            </li>
                          )

                        )
                      }
                    </ul> }

                    {  ['STRING_SELECT', 'STRING_MULTI_SELECT'].includes(item.type) && <ul className="widget-body filter-items">
                      {
                        (item.options || []).map((option, index) => (
                            <li
                              className={containsAttrInUrl(item._id, option) ? 'active' : ''}
                              key={index}
                            >
                              <ALink scroll={false} href={{ pathname: router.pathname, query: { ...query, page: 1, [item._id]: getUrlForAttrs(item._id, option) } }}>{option}</ALink>
                            </li>
                          )

                        )
                      }
                    </ul> }

                    {  ['NUMBER_INPUT'].includes(item.type) && <div className="widget-body filter-items">
                      <div className="row">
                        <div className="col-xs-6">
                          <label>От</label>
                          <div datapostfix={item.units} className="widget-input-number"><input className="form-control" type="number" /></div>
                        </div>
                        <div className="col-xs-6">
                          <label>До</label>
                          <div datapostfix={item.units} className="widget-input-number"><input className="form-control" type="number" /></div>
                        </div>
                      </div>
                    </div> }
                  </Card>
                </div>
              ))}
            </div>
            : <div className="widget-2 mt-10 pt-5"></div>
        }
      </div>
    </aside >
  )
}