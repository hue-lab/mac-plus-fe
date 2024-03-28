import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import ALink from "~/components/features/custom-link";

import { modalActions } from "~/store/modal";

import { toDecimal } from "~/utils";
function DescOne(props) {
  const { product, isGuide = true, isDivider = true, openModal } = props;

  let colors = [],
    sizes = [];

  // if (product.variants.length > 0) {
  //   if (product.variants[0].size)
  //     product.variants.forEach(item => {
  //       if (sizes.findIndex(size => size.name === item.size.name) === -1) {
  //         sizes.push({ name: item.size.name, value: item.size.size });
  //       }
  //     });

  //   if (product.variants[0].color) {
  //     product.variants.forEach(item => {
  //       if (colors.findIndex(color => color.name === item.color.name) === -1)
  //         colors.push({ name: item.color.name, value: item.color.color });
  //     });
  //   }
  // }

  const setRating = (e) => {
    e.preventDefault();

    if (e.currentTarget.parentNode.querySelector(".active")) {
      e.currentTarget.parentNode.querySelector(".active").classList.remove("active");
    }

    e.currentTarget.classList.add("active");
  };

  const showVideoModalHandler = (e) => {
    e.preventDefault();
    let link = e.currentTarget.closest(".btn-play").getAttribute("data");
    openModal(link);
  };

  return (
    <Tabs className="tab tab-nav-simple product-tabs" selectedTabClassName="show" selectedTabPanelClassName="active" defaultIndex={ 0 } >
      <TabList className="nav nav-tabs justify-content-center" role="tablist">
        {
          product.content && (
            <Tab className="nav-item">
              <span className="nav-link">Описание</span>
            </Tab>
          )
        }
        <Tab className="nav-item">
          <span className="nav-link">Характеристики</span>
        </Tab>
      </TabList>

      <div className="tab-content">
        {
          product.content && (
            <TabPanel className="tab-pane">
              <div
                className="rendered-content"
                dangerouslySetInnerHTML={{__html: product.content || ''}}
              ></div>
            </TabPanel>
          )
        }
        <TabPanel className="tab-pane">
          <div className="row mt-6">
            <div className="mb-4">
              <span className="description-title mb-3 font-weight-semi-bold ls-m">Характеристики</span>
              <table className="table">
                <tbody className="products-table">
                {product.productProps.map((property) => (
                  <tr className="products-table__content" key={property.productTypePropertyId}>
                    <td className="font-weight-semi-bold text-dark pl-0">{property.name}</td>
                    <td className="pl-4">{`${property.value}${
                      property.units ? ` ${property.units}` : ""
                    }`}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
}

export default connect("", {openModal: modalActions.openModal})(DescOne);
