import React from 'react';
import Helmet from 'react-helmet';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GoogleMapReact from 'google-map-react';

import ALink from '~/components/features/custom-link';
import { fadeIn } from '~/utils/data/keyframes';

import { getFieldsObject } from '~/utils/endpoints/fields';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

ContactUs.getInitialProps = async (context) => {
  const fields = await getFieldsObject('phone', 'email', 'address');
  return {
    fields: fields,
  }
}

export default function ContactUs({ fields }) {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  return (
    <main className="main contact-us">
      <Helmet>
        <title>Mac Plus | Контакты</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Контакты</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li>Контакты</li>
          </ul>
        </div>
      </nav>

      <div className="page-header" style={{ backgroundImage: 'url(./images/page-header/contact-us.png)', backgroundColor: "#92918f" }}>
        <h1 className="page-title font-weight-bold text-capitalize ls-l">Контакты</h1>
      </div>

      <div className="page-content mt-10 pt-7">
        <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
          <section className="contact-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6 ls-m mb-4">
                  <div className="grey-section d-flex align-items-center h-100">
                    <div>
                      <h4 className="mb-2 text-capitalize">Адрес</h4>
                      <p><a href={`http://maps.google.com/?q=${fields.address}`} target="_blank">{fields.address}</a></p>

                      <h4 className="mb-2 text-capitalize">Телефон</h4>
                      <p>
                        <ALink href={`tel:${fields.phone}`}>{fields.phone}</ALink>
                      </p>

                      <h4 className="mb-2 text-capitalize">Почта</h4>
                      <p className="mb-4">
                        <ALink href={`mailto:${fields.email}`}>{fields.email}</ALink>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-6 d-flex align-items-center mb-4">
                  <div className="w-100">
                    <form className="pl-lg-2" action="#">
                      <h4 className="ls-m font-weight-bold">Напишите нам</h4>
                      <p>Ваш электронный адрес не будет передан третьим лицам. Обязательные поля помечены *</p>
                      <div className="row mb-2">
                        <div className="col-12 mb-4">
                          <textarea className="form-control" required
                            placeholder="Комментарий *"></textarea>
                        </div>
                        <div className="col-md-6 mb-4">
                          <input className="form-control" type="text" placeholder="Имя *" required />
                        </div>
                        <div className="col-md-6 mb-4">
                          <input className="form-control" type="email" placeholder="Email *" required />
                        </div>
                      </div>
                      <button className="btn btn-dark btn-rounded">Отправить<i className="d-icon-arrow-right"></i></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  )

}

//export default React.memo(ContactUs);
