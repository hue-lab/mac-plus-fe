import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { debounceTime, Subject } from "rxjs";

import ALink from "~/components/features/custom-link";
import { autocomplete } from "~/utils/endpoints/autocomplete";

export default function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const onSearch = new Subject();

  onSearch.pipe(debounceTime(400)).subscribe((res) => {
    searchProducts(res).then((searchRes) => {
      setSearchResult(searchRes);
      setSearch(res);
    });
  });

  async function searchProducts(text) {
    if (!text?.length) {
      return;
    }
    return await autocomplete(text);
  }

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document.querySelector(".header-search.show-results").classList.remove("show-results");
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<span class='search-bar-bold'>" + match + "</span>");
  }

  function showSearchBox(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.closest(".header-search").classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document.querySelector(".header-search.show-results").classList.remove("show-results");
  }

  function onSearchChange(e) {
    onSearch.next(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        search: search,
      },
    });
  }

  return (
    <div className="header-search hs-simple">
      <form action="#" method="get" onSubmit={onSubmitSearchForm} className="input-wrapper">
        <input
          type="text"
          className="form-control"
          name="search"
          autoComplete="off"
          onChange={(e) => onSearchChange(e)}
          placeholder="Поиск..."
          required
          onClick={showSearchBox}
        />

        <button className="btn btn-search" type="submit">
          <i className="d-icon-search"></i>
        </button>

        {!!searchResult?.length && (
          <div className="live-search-list scrollable bg-white">
            {searchResult &&
              searchResult.map((product, index) => (
                <ALink
                  href={`/${product.category.handle ? product.category.handle + "/" : ""}${
                    product.seoUrl || "#"
                  }`}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <div
                    className="search-name"
                    dangerouslySetInnerHTML={removeXSSAttacks(matchEmphasize(product.name))}
                  ></div>
                </ALink>
              ))}
          </div>
        )}
      </form>
    </div>
  );
}
