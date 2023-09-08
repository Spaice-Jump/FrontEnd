export default function Filters(
    filterAdvert,
    query,
    priceMax,
    priceMin,
  ) {
    filterAdvert = filterAdvert.filter(advert =>
      (advert.name ?? '').toUpperCase().startsWith(query.toLocaleUpperCase()),
    );
  
  
    filterAdvert = filterAdvert.filter(
      advert => advert.price >= priceMin && advert.price <= priceMax,
    );
  
    
  
    return filterAdvert;
  }