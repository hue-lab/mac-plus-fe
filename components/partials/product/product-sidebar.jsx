import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import SmallProduct from "~/components/features/product/product-sm";
import { mainSlider7 } from "~/utils/data/carousel";

function ProductsSidebar(props) {
  const { adClass = "", type = "right", featured, deliveryMethods } = props;
  const loading = false;

  const toggleSidebarHandler = (e) => {
    if (type === "right") document.querySelector("body").classList.toggle("right-sidebar-active");
    else document.querySelector("body").classList.toggle("sidebar-active");
  };

  const hideSidebarhandler = (e) => {
    if (type === "right") document.querySelector("body").classList.remove("right-sidebar-active");
    else document.querySelector("body").classList.remove("sidebar-active");
  };

  return (
    <aside
      className={`col-lg-3 sidebar-fixed sticky-sidebar-wrapper ${adClass} ${
        type === "left" ? "sidebar" : "right-sidebar"
      }`}
    >
      <div className="sidebar-overlay" onClick={hideSidebarhandler}>
        <ALink className="sidebar-close" href="#">
          <i className="d-icon-times"></i>
        </ALink>
      </div>

      <div className="sidebar-toggle" onClick={toggleSidebarHandler}>
        {type === "right" ? (
          <i className="fas fa-chevron-left"></i>
        ) : (
          <i className="fas fa-chevron-right"></i>
        )}
      </div>

      <div className="sidebar-content">
        {loading ? (
          <div className="widget-2"></div>
        ) : (
          <div className="sticky-sidebar">
            <div className="service-list mb-4">
              {deliveryMethods.map((method) => (
                <div className="icon-box icon-box-side icon-box3" key={method._id}>
                  {/* <span className="icon-box-icon">
                        <i className="d-icon-secure"></i>
                      </span> */}
                  <div className="icon-box-content">
                    <span className="icon-box-title text-capitalize">{method.name}</span>
                    <p>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="widget widget-products widget-collapsible">
              <span className="widget-title mb-3 lh-1 text-capitalize d-block text-dark">
                Похожие товары
              </span>

              <ul className="widget-body mb-0">
                <OwlCarousel adClass="owl-nav-top" options={mainSlider7}>
                  <div className="products-col_gap">
                    {featured.slice(0, 3).map((product, index) => (
                      <SmallProduct product={product} key={"small-product-" + index} />
                    ))}
                  </div>

                  {featured.length > 3 ? (
                    <div className="products-col_gap">
                      {featured.slice(3).map((product, index) => (
                        <SmallProduct product={product} key={"small-product-" + index} />
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </OwlCarousel>
              </ul>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default ProductsSidebar;
