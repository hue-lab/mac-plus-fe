import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import withApollo from '~/server/apollo';

import { toDecimal } from '~/utils';
import { autocomplete } from '~/utils/endpoints/autocomplete';

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //const [timer, setTimer] = useState(null);

  let searchProducts = async () => {
    let res = await autocomplete(search);
    console.log(res);
    if (Array.isArray(res)) setSearchResult(res);
  }


  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return (() => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    })
  }, [])

  useEffect(() => {
    searchProducts();
  }, [search])

  // useEffect(() => {
  //   if (search.length > 2) {
  //     if (timer) clearTimeout(timer);
  //     let timerId = setTimeout(() => {
  //       // searchProducts( { variables: { search: search } } );
  //       setTimer(null);
  //     }, 500);

  //     setTimer(timerId);
  //   }
  // }, [search])

  useEffect(() => {
    document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
  }, [router.pathname])

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html
    }
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(
      regExp,
      (match) => "<strong>" + match + "</strong>"
    );
  }

  function showSearchBox(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.closest('.header-search').classList.toggle('show');
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search')) return e.target.closest('.header-search').classList.contains('show-results') || e.target.closest('.header-search').classList.add('show-results');

    document.querySelector('.header-search.show') && document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: {
        search: search
      }
    });
  }

  return (
    <div className="header-search hs-simple">
      <form action="#" method="get" onSubmit={onSubmitSearchForm} className="input-wrapper">
        <input type="text" className="form-control" name="search" autoComplete="off" onChange={e => onSearchChange(e)}
          placeholder="Поиск..." required onClick={showSearchBox} />

        <button className="btn btn-search" type="submit">
          <i className="d-icon-search"></i>
        </button>

        <div className="live-search-list scrollable bg-white">
          {searchResult && searchResult.map((product, index) => (
            <ALink href={`/product/default/${product._id}`} className="autocomplete-suggestion" key={`search-result-${index}`}>
              <div className="search-name" dangerouslySetInnerHTML={removeXSSAttacks(matchEmphasize(product.name))}></div>
            </ALink>
          ))
          }
        </div>
      </form>
    </div>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(SearchForm);