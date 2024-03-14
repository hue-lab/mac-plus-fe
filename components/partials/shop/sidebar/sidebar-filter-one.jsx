import {useEffect} from 'react';
import {useRouter} from 'next/router';
import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import CustomPriceInput from "~/components/partials/shop/sidebar/custom-number-input";

export default function SidebarFilterOne({ type = "left", isFeatured = false, filters = [], filterObject }) {
  const router = useRouter();
  const { catalogue, ...query } = router.query;
  const catalogueUrl = catalogue.join('/');
  const data = null;
  const loading = false;
  let timerId;

  useEffect(() => {
    window.addEventListener('resize', hideSidebar);
    return () => {
      window.removeEventListener('resize', hideSidebar);
    }
  }, [])

  const getPathname = () => {
    return (typeof catalogueUrl === 'string' ? router.pathname.replace('[...catalogue]', catalogueUrl) : router.pathname)?.split('/page-is-')[0];
  }

  const advancedPathname = (key, value) => {
    const filterObjectClone = Object.assign({}, filterObject);
    if (filterObjectClone.hasOwnProperty(key)) {
      const keySet = new Set(filterObjectClone[key]);
      if (keySet.has(value)) {
        keySet.delete(value);
      } else {
        keySet.add(value);
      }
      if (keySet.size) {
        filterObjectClone[key] = Array.from(keySet);
      } else {
        delete filterObjectClone[key];
      }
    } else {
      filterObjectClone[key] = [value];
    }
    const filterArraySorted = Object.entries(filterObjectClone).sort((a, b) => {
      return a[0] > b[0] ? 1 : 0;
    });
    const basePath = getPathname().split('/filter')[0];
    const path = filterArraySorted.length ? `${basePath}/filter` : basePath;
    return filterArraySorted.reduce((acc, [key, value]) => {
      acc = acc.concat(`/${key}-is-${value.sort().join('-or-')}`);
      return acc;
    }, path);
  }

  const filterByPrice = (filterPrice) => {
    let url = getPathname();
    let arr = [];
    if (filterPrice?.min) {
      arr.push(`min_price=${filterPrice.min}`);
    }
    if (filterPrice?.max) {
      arr.push(`max_price=${filterPrice.max}`);
    }
    // for (let key in query) {
    //   if (key !== 'min_price' && key !== 'max_price' && key !== 'page' && key !== 'grid') arr.push(key + '=' + query[key]);
    // }
    url = url + (arr.length ? '?' : '') + arr.join('&');
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
                    <ALink href={{ pathname: getPathname(), query: { grid: query.grid, type: router.query.type ? router.query.type : null } }} scroll={false} className="filter-clean">Очистить</ALink>
                  </div>
              }

              <div className="widget widget-collapsible">
                <Card title={`<div style="color: #222;" class='widget-title'>Цена<span class='toggle-btn p-0 parse-content'></span></div>`} type="parse" expanded={true}>
                  <div className="widget-body">
                    <form action="#">
                      <div className="widget-body filter-items">
                        <CustomPriceInput postfix="BYN" min={query.min_price} max={query.max_price} onChange={filterByPrice}></CustomPriceInput>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>

              {filters && Array.isArray(filters) && filters.map((item, index) => (
                ['CHECKBOX'].includes(item.type) ?

                  <div key={index} className="widget widget-box-checkbox widget-collapsible">
                    <Card type="parse" expanded={true}>
                      <ul className="filter-items">
                        <li
                          className={filterObject[item.code || item._id]?.includes('true') ? 'active' : ''}
                          key={index}
                        >
                          <ALink className="font-weight-bold" scroll={false} href={{ pathname: advancedPathname(item.code || item._id, 'true'), query: { ...query } }}>{item.name}</ALink>
                        </li>
                      </ul>
                    </Card>
                  </div>

                  :

                  <div key={index} className="widget widget-collapsible">
                  <Card title={`<div style="color: #222;" class='widget-title'>${item.name}<span class='toggle-btn p-0 parse-content'></span></div>`} type="parse" expanded={false}>
                    { item.type === 'NUMBER_SELECT' && <ul className="widget-body filter-items">
                      {
                        (item.options || []).map((option, index) => (
                            <li
                              className={containsAttrInUrl(item.code || item._id, option) ? 'active' : ''}
                              key={index}
                            >
                              <ALink scroll={false} href={{ pathname: getPathname(), query: { ...query, [item.code || item._id]: getUrlForAttrs(item.code || item._id, option) } }}>{option} {item.units}</ALink>
                            </li>
                          )

                        )
                      }
                    </ul> }

                    {  ['STRING_SELECT', 'STRING_MULTI_SELECT'].includes(item.type) && <ul className="widget-body filter-items">
                      {
                        (item.options || []).map((option, index) => (
                            <li
                              className={filterObject[item.code || item._id]?.includes(option.key) ? 'active' : ''}
                              key={index}
                            >
                              <ALink scroll={false} href={{ pathname: advancedPathname(item.code || item._id, option.key), query: { ...query } }}>{option.value}</ALink>
                            </li>
                          )

                        )
                      }
                    </ul> }
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
