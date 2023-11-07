import React from 'react';
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { fadeIn, fadeInRightShorter, fadeInDownShorter, fadeInLeftShorter, fadeInUpShorter } from '~/utils/data/keyframes';
import {getImgPath} from "~/utils";

export default function CategorySection({ recProducts }) {
  return (
    !!recProducts.length && <Reveal keyframes={fadeIn} delay={200} duration={1200} triggerOnce>
      <section className="categories container mt-10">
        <h2 className="title title-line title-underline border-1 mb-4">Рекомендуем</h2>

        <div className="row">
          {recProducts.map((item, index) => (
            <ALink key={index} className="col-xl-4 col-md-6 mb-4" href={ `/${item.categoryHandle ? item.categoryHandle + '/' : ''}${item.seo?.seoUrl || '#'}` }>
              <div>
                <Reveal keyframes={fadeIn} delay={200} duration={1200} triggerOnce>
                  <div style={{ cursor: 'pointer' }} className="category category-group-image">
                    <figure className="category-media">
                      <LazyLoadImage
                        src={getImgPath(item.media[0])}
                        style={ { height: '150px', width: '100%', objectFit: 'contain', padding: '1rem' } }
                        alt="category banner"
                        effect="opacity;"
                        width="auto"
                        height={169}
                      />
                    </figure>
                    <div className="category-content">
                      <h4 className="category-name">{ item.name }</h4>
                      <ul className="category-list">
                        <li>Бренд: { item.brand.name }</li>
                        { item.isStock
                          ? <li style={{ color: 'var(--toastify-color-success)' }}>В наличии</li>
                          : <li style={{ color: 'var(--toastify-color-error)' }}>Под заказ</li>
                        }
                        <li>
                          { item.discount > 0
                            ? <span>
                                <s>{ item.price } BYN</s><br/>
                                <span style={{ fontSize: '1.6rem', color: 'black', fontWeight: '500' }}> { item.totalPrice } BYN</span>
                              </span>
                            : <span>
                                <span style={{ fontSize: '1.6rem', color: 'black', fontWeight: '500' }}> { item.totalPrice } BYN</span><br/>
                                <br/>
                              </span>
                          }
                        </li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </ALink>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
