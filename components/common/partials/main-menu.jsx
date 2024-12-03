import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import { getImgPath, orderCategories } from "~/utils";
import Image from "next/image";
import InlineSVG from "react-inlinesvg";
import {chevronDownOutlineIcon} from "~/icons/chevron-down-outline";

function MainMenu({ router, categoryTree, layoutFields }) {
  const { asPath, route } = useRouter();
  const treeLimit = layoutFields["nav-limit"] - 2; // -2 because of static "Главная" list item

  return (
    <nav className="main-nav ml-4">
      <ul className="menu">
        <li className={`${asPath === "/" ? "active" : ""}`}>
          <ALink href="/">Главная</ALink>
        </li>
        {categoryTree.sort(orderCategories).map((route, index) => {
          return (
            <li
              className={`${route.children?.length ? "submenu" : ""} ${
                asPath.includes(route._id) ? "active" : ""
              } ${index > treeLimit ? "d-none" : ""}`}
              key={route.name + index}
            >
              <ALink href={{ pathname: `/${route.handle}` }}>
                {route.name}
                <InlineSVG className="menu-arrow-down" src={chevronDownOutlineIcon} />
              </ALink>

              {route.children?.length ? (
                <div className="megamenu" style={{ marginLeft: index > 2 ? "-370px" : "-19px" }}>
                  <div style={{ flexDirection: index > 2 ? "row-reverse" : "row" }} className="row">
                    <div style={{ width: "calc(100% - 350px)" }}>
                      <ul>
                        {route.children.sort(orderCategories).map((item, index) => (
                          <li key={`shop-${item.name + index}`}>
                            <ALink href={{ pathname: `/${item.handle}` }}>
                              {item.name}
                              {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                            </ALink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{ minHeight: "520px", width: "350px" }}
                      className="menu-banner menu-banner1 banner banner-fixed"
                    >
                      <Image
                        style={{ objectFit: "cover", objectPosition: "left top" }}
                        src={getImgPath(layoutFields["nav-sale-image"])}
                        alt="Menu banner"
                        loading="lazy"
                        width={884}
                        height={1320}
                      />
                      <div className="banner-content y-50">
                        <ALink
                          href={layoutFields["nav-sale-link"] || "#"}
                          className="btn btn-link btn-underline"
                          style={{ fontWeight: "600", fontSize: "1.7rem" }}
                        >
                          {layoutFields["nav-sale-title"] || "Купить"}
                          <i className="d-icon-arrow-right"></i>
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MainMenu;
