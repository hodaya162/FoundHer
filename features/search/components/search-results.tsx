import type { SearchResults as SearchResultsModel } from "../types/search-result";
import { SearchBrandResult } from "./search-brand-result";
import { SearchLookResult } from "./search-look-result";
import { SearchProductResult } from "./search-product-result";
import { SearchResultSection } from "./search-result-section";

export function SearchResults({ results }: { results: SearchResultsModel }) {
  return (
    <div className="space-y-10">
      {results.looks.length ? (
        <SearchResultSection id="search-looks" title="לוקים" count={results.looks.length}>
          <div className="grid gap-4 lg:grid-cols-2">{results.looks.map((result, index) => <SearchLookResult key={result.id} result={result} priority={index === 0} />)}</div>
        </SearchResultSection>
      ) : null}
      {results.products.length ? (
        <SearchResultSection id="search-products" title="פריטים לרכישה" count={results.products.length}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{results.products.map((result, index) => <SearchProductResult key={result.id} result={result} priority={index === 0 && results.looks.length === 0} />)}</div>
        </SearchResultSection>
      ) : null}
      {results.rentals.length ? (
        <SearchResultSection id="search-rentals" title="פריטים להשכרה" count={results.rentals.length}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{results.rentals.map((result, index) => <SearchProductResult key={result.id} result={result} priority={index === 0 && results.looks.length === 0 && results.products.length === 0} />)}</div>
        </SearchResultSection>
      ) : null}
      {results.brands.length ? (
        <SearchResultSection id="search-brands" title="מותגים" count={results.brands.length}>
          <div className="grid gap-4 lg:grid-cols-2">{results.brands.map((result, index) => <SearchBrandResult key={result.id} result={result} priority={index === 0 && results.looks.length === 0 && results.products.length === 0 && results.rentals.length === 0} />)}</div>
        </SearchResultSection>
      ) : null}
      {results.rentalBusinesses.length ? (
        <SearchResultSection id="search-businesses" title="עסקי השכרה" count={results.rentalBusinesses.length}>
          <div className="grid gap-4 lg:grid-cols-2">{results.rentalBusinesses.map((result, index) => <SearchBrandResult key={result.id} result={result} priority={index === 0 && results.looks.length === 0 && results.products.length === 0 && results.rentals.length === 0 && results.brands.length === 0} />)}</div>
        </SearchResultSection>
      ) : null}
    </div>
  );
}
