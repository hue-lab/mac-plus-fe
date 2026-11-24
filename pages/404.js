import React, { useEffect } from 'react';
import ALink from '~/components/features/custom-link';
import { parallaxHandler } from '~/utils';
import Head from 'next/head';

function Error404({ categoryTree = [], layoutFields = {} }) {
  const categories = categoryTree.filter((category) => category.handle).slice(0, 6);
  const popular = categories.flatMap((category) => (category.children || []).filter((child) => child.handle).slice(0, 1));
  useEffect(() => {
    window.addEventListener('scroll', parallaxHandler, true);

    return () => {
      window.removeEventListener('scroll', parallaxHandler, true);
    };
  }, []);

  return (
    <main className="main">
      <Head>
        <title>Mac Plus | 404</title>
      </Head>

      <div className="page-content">
        <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
          <h1 className="mb-2 ls-m">Ошибка 404</h1>
          <img src="/images/subpages/404.png" alt="" width="609" height="131" />
          <h4 className="mt-7 mb-0 ls-m text-uppercase">Ой! Запрашиваемая страница не найдена.</h4>
          <p className="text-grey font-primary ls-m">Похоже, здесь ничего нет.</p>
          <form action="/shop/" method="get" className="d-flex mb-4">
            <label htmlFor="missing-page-search" className="sr-only">Поиск по каталогу</label>
            <input id="missing-page-search" type="search" name="search" placeholder="Поиск по каталогу" required />
            <button type="submit" className="btn btn-primary">Найти</button>
          </form>
          {categories.length > 0 && <nav aria-label="Разделы каталога" className="d-flex flex-wrap justify-content-center mb-4">
            {categories.map((category) => <ALink className="mr-3" key={category.handle} href={`/${category.handle}/`}>{category.name}</ALink>)}
          </nav>}
          {popular.length > 0 && <nav aria-label="Популярные модели" className="d-flex flex-wrap justify-content-center mb-4">
            {popular.map((category) => <ALink className="mr-3" key={category.handle} href={`/${category.handle}/`}>{category.name}</ALink>)}
          </nav>}
          <div className="mb-4">
            {layoutFields.phone && <a className="mr-3" href={`tel:${layoutFields.phone.replace(/[^+\d]/g, '')}`}>{layoutFields.phone}</a>}
            {['telegram', 'viber', 'whatsapp'].map((name) => layoutFields[name] &&
              <a className="mr-3 text-capitalize" key={name}
                href={name === 'viber' ? `viber://chat?number=${layoutFields[name]}` : layoutFields[name]}>{name}</a>)}
          </div>
          <ALink href="/" className="btn btn-primary btn-rounded mb-4">
            На главную
          </ALink>
        </section>
      </div>
    </main>
  );
}

export default React.memo(Error404);
