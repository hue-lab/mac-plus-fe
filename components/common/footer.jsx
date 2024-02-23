import ALink from "~/components/features/custom-link";
import { orderCategories } from "~/utils";

export default function Footer({ fields, categoryTree, footerNav }) {
  const YEAR = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <ALink href="/" className="logo-footer">
                <img
                  src="./images/home/logo-short.png"
                  alt="logo-footer"
                  width="100"
                  height="auto"
                />
              </ALink>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-info">
                <span className="widget-title">Контакты</span>

                <ul className="widget-body">
                  <li>
                    <label>Телефон: </label>
                    <ALink href={`tel:${fields.phone}`}>{fields.phone}</ALink>
                  </li>
                  <li>
                    <label>Email: </label>
                    <ALink href={`mailto:${fields.email}`}>{fields.email}</ALink>
                  </li>
                  <li>
                    <label>Адрес: </label>
                    <a href={`http://maps.google.com/?q=${fields.address}`} target="_blank">
                      {fields.address}
                    </a>
                  </li>
                  <li>
                    <label>Рабочее время: </label>
                  </li>
                  <li>
                    <ALink href="#">{fields.work_time}</ALink>
                  </li>
                  <li>
                    <label>Реквизиты компании: </label>
                  </li>
                  <li>
                    <div style={{ whiteSpace: "pre-wrap" }}>{fields.legal}</div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget ml-lg-4">
                <span className="widget-title">Информация</span>
                <ul className="widget-body">
                  {footerNav.children.length
                    ? footerNav.children.map((item) => (
                        <li key={item._id}>
                          <ALink href={item.handle}>{item.name}</ALink>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget ml-lg-4">
                <span className="widget-title">Категории</span>
                <ul className="widget-body">
                  {categoryTree.sort(orderCategories).map((item, index) => {
                    return (
                      <li key={item._id}>
                        <ALink href={`/shop/?category=${item._id}`}>{item.name}</ALink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <figure className="payment">
              <img src="./images/payment.png" alt="payment" width="auto" height="29" />
            </figure>
          </div>
          <div className="footer-center">
            <p className="copyright">
              Mac Plus &copy; 2023{YEAR > 2023 ? ` - ${YEAR}` : ""}. Все права защищены.
            </p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              {fields.telegram && (
                <ALink
                  href={fields.telegram}
                  className="social-link social-telegram fab fa-telegram-plane"
                ></ALink>
              )}
              {fields.viber && (
                <ALink
                  href={`viber://chat?number=${fields.viber}`}
                  className="social-link social-viber fab fa-viber"
                ></ALink>
              )}
              {fields.instagram && (
                <ALink
                  href={fields.instagram}
                  className="social-link social-instagram fab fa-instagram"
                ></ALink>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
