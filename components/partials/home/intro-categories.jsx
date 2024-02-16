import ALink from "~/components/features/custom-link";
import React from "react";

function IntroCategories ({ categories }) {

  return (
    <section className="mt-5 intro_categories-wrapper">
      <div className="intro_categories">
        {(categories || []).map((category, index) => (
          <ALink key={index} href={`/${category.handle}`} className="container intro_categories__item">
            <div className="intro_categories__icon-wrapper">
              <div className="intro_categories__icon">
                <i style={{fontSize: `${category.icon.split('||')[1] || '1.8'}rem`}} className={category.icon.split('||')[0] || 'd-icon-arrow-right'}></i>
              </div>
              <span className="intro_categories__name">{category.name}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="intro_categories__arrow" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"
                    d="M184 112l144 144-144 144"/>
            </svg>
          </ALink>
        ))}
      </div>
    </section>
  )
}

export default React.memo(IntroCategories);