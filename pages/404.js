import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';

import { parallaxHandler } from '~/utils';

function Error404() {
  useEffect(() => {
    window.addEventListener('scroll', parallaxHandler, true);

    return () => {
      window.removeEventListener('scroll', parallaxHandler, true);
    }
  }, [])

  return (
    <main className="main">
      <Helmet>
        <title>Mac Plus | 404</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - 404</h1>

      <div className="page-content">
        <section
          className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
          <h1 className="mb-2 ls-m">Ошибка 404</h1>
          <img src="./images/subpages/404.png" alt="error 404" width="609" height="131" />
          <h4 className="mt-7 mb-0 ls-m text-uppercase">Ой! Запрашиваемая страница не найдена.</h4>
          <p className="text-grey font-primary ls-m">Похоже, тут ничего нет.</p>
          <ALink href="/" className="btn btn-primary btn-rounded mb-4">На главную</ALink>
        </section>
      </div>
    </main >
  )
}

export default Error404;