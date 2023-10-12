import ALink from '~/components/features/custom-link';

export default function Footer({ fields, categoryTree }) {
  const categories = [
    {
      name: 'Mac',
      href: '/shop/mac/',
    },
    {
      name: 'iPhone',
      href: '/shop/iphone/',
    },
    {
      name: 'iPad',
      href: '/shop/ipad/',
    },
    {
      name: 'Watch',
      href: '/shop/watch/',
    },
    {
      name: 'AirPods',
      href: '/shop/airpods/',
    },
  ];
  const YEAR = new Date().getFullYear();

  console.log(categoryTree);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <ALink href="/" className="logo-footer">
                <img src="./images/home/logo-footer.png" alt="logo-footer" width="154" height="43" />
              </ALink>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-info">
                <h4 className="widget-title">Контакты</h4>

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
                    <a href={`http://maps.google.com/?q=${fields.address}`} target="_blank">{fields.address}</a>
                  </li>
                  <li>
                    <label>Рабочее время: </label>
                  </li>
                  <li>
                    <ALink href="#">{fields.work_time}</ALink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget ml-lg-4">
                <h4 className="widget-title">Навигация</h4>
                <ul className="widget-body">
                  <li>
                    <ALink href="/">Главная</ALink>
                  </li>
                  <li>
                    <ALink href="/shop">Каталог</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/cart">Корзина</ALink>
                  </li>
                  <li>
                    <ALink href="/blog">Блог</ALink>
                  </li>
                  <li>
                    <ALink href="/pages/contact-us">Контакты</ALink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="widget ml-lg-4">
                <h4 className="widget-title">Категории</h4>
                <ul className="widget-body">{
                  categoryTree.map((item, index) => {
                    return (
                      <li key={item._id}>
                        <ALink href={`/shop/?category=${item._id}`}>{item.name}</ALink>
                      </li>
                    )
                  })
                }
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <figure className="payment">
              <img src="./images/payment.png" alt="payment" width="159" height="29" />
            </figure>
          </div>
          <div className="footer-center">
            <p className="copyright">Mac Plus &copy; 2023{YEAR > 2023 ? ` - ${YEAR}` : ''}. Все права защищены.</p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <ALink href="#" className="social-link social-facebook fab fa-facebook-f"></ALink>
              <ALink href="#" className="social-link social-twitter fab fa-twitter"></ALink>
              <ALink href="#" className="social-link social-linkedin fab fa-linkedin-in"></ALink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}