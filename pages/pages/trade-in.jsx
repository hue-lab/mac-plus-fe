import {LazyLoadImage} from "react-lazy-load-image-component";
import React from "react";
import {getFieldsObject} from "~/utils/endpoints/fields";

TradeIn.getInitialProps = async (context) => {
  const fields = await getFieldsObject(
    'trade-in-title',
    'trade-in-subtitle',
    'trade-in-description',
    'trade-in-1',
    'trade-in-1-text',
    'trade-in-2',
    'Trade-in-2-text',
    'trade-in-3',
    'trade-in-3-text',
    'trade-in-date',
    'trade-in-conditions',
  );
  return { fields: fields };
}

export default function TradeIn ({ fields }) {
  return (
    <div className="trade">
      <div className="trade__hero">
        <div className="container trade__hero-container">
          <LazyLoadImage
            src="./images/recycle.png"
            alt="recycle"
            width="auto"
            height={ 60 }
            className="trade__hero-icon mb-4"
          />
          <h1>{fields['trade-in-title']}</h1>
          <h2>{fields['trade-in-subtitle']}</h2>
          <p>{fields['trade-in-description']}</p>
          <LazyLoadImage
            src="./images/trade-in-image.webp"
            alt="recycle"
            width="auto"
            height={ 400 }
            className="trade__hero-image"
          />
        </div>
      </div>
      <div className="container">
        <div className="trade__points">
          <div className="trade__points-item">
            <div className="trade-item__num">
              01
            </div>
            <div className="trade-item__title">
              {fields['trade-in-1'] || ''}
            </div>
            <div className="trade-item__text">
              {fields['trade-in-1-text'] || ''}
            </div>
          </div>
          <div className="trade__points-item">
            <div className="trade-item__num">
              02
            </div>
            <div className="trade-item__title">
              {fields['trade-in-2'] || ''}
            </div>
            <div className="trade-item__text">
              {fields['Trade-in-2-text'] || ''}
            </div>
          </div>
          <div className="trade__points-item">
            <div className="trade-item__num">
              03
            </div>
            <div className="trade-item__title">
              {fields['trade-in-3'] || ''}
            </div>
            <div className="trade-item__text">
              {fields['trade-in-3-text'] || ''}
            </div>
          </div>
        </div>
      </div>
      <div className="trade__text">
        <div className="container">
          <p>Условия акции:</p>
          <p>{fields['trade-in-date'] || ''}</p>
          <p>{fields['trade-in-conditions'] || ''}</p>
        </div>
      </div>
    </div>
  )
}
