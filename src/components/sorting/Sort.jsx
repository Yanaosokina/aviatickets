import React from 'react';
import './sorts.scss';

export function Sort({ flights, setFlights,setFilters }) {
  
  const sortOptions = {
    asc: (a, b) => a.flight.price.total.amount - b.flight.price.total.amount,
    desc: (a, b) => b.flight.price.total.amount - a.flight.price.total.amount,
    duration: (a, b) => a.flight.legs[0].duration - b.flight.legs[0].duration,
  };

  const handleChangeSort = (e) => {
    sortFlights(e.target.value);
  };

  const handleChangeFilter = (e) => {
    const isNoTransferOn = e.target.checked;
    setFilters((prev) => ({ ...prev, noTransfers: isNoTransferOn }));
  };

  const handleChangePriceMin = (e) => {
    const minPrice = e.target.value === '' ? null : Number(e.target.value);
    setFilters((prev) => ({ ...prev, minPrice }));
  };
  const handleChangePriceMax = (e) => {
    const maxPrice = e.target.value === '' ? null : Number(e.target.value);
    setFilters((prev) => ({ ...prev, maxPrice }));
  };

  const sortFlights = (sortType) => {
    const sorted = [...flights].sort((a, b) => {
      return sortOptions[sortType](a, b);
    });
    setFlights(sorted);
  };


  return (
    <div className='sort'>
      <fieldset className="sort__sorting">
      <legend className="sort__title">Сортировать</legend>
          <ul className="sort__list">
            <li className="sort__sorting-item">
              <label className="sort-label" htmlFor="ascending-price">
                <input
                  className="sort__radio"
                  type="radio"
                  name="sort-radio"
                  id="ascending-price"
                  value="asc"
                  onChange={handleChangeSort}
                  defaultChecked
                />
                 - по возрастанию
              </label>
            </li>
            <li className="sort__sorting-item">
              <label className="sort-label" htmlFor="descending-price">
                <input
                  className="sort__radio"
                  type="radio"
                  name="sort-radio"
                  id="descending-price"
                  value="desc"
                  onChange={handleChangeSort}
                />
                - по убыванию
              </label>
            </li>
            <li className="sort__sorting-item">
              <label className="sort-label" htmlFor="duration-sort">
                <input
                  className="sort__radio"
                  type="radio"
                  name="sort-radio"
                  id="duration-sort"
                  value="duration"
                  onChange={handleChangeSort}
                />
                - по времени в пути
              </label>
            </li>
          </ul>
      </fieldset>
      <fieldset className="sort__filter">
          <legend className="sort__title">Фильтровать</legend>
          <ul className="sort__list">
            <li className="sort__filter-item">
              <label className="sort__filter-label" htmlFor="no-transfer">
                <input
                  className="sort__checkbox"
                  type="checkbox"
                  name="filter-no-transfers"
                  id="no-transfer"
                  onChange={handleChangeFilter}
                />
                - без пересадки
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset className="sort__price">
          <legend className="sort__title"> Цена</legend>
          <ul className="sort__list">
            <li className="sort__price-item">
              <label className="sort__price-label" htmlFor="price-filter-min">
                <span>От</span>
                <input
                  className="sort__price-input"
                  type="number"
                  name="filter-price-min"
                  id="price-filter-min"
                  onChange={handleChangePriceMin}
                />
              </label>
            </li>
            <li className="sort__price-item">
              <label className="sort__price-label" htmlFor="price-filter-max">
                <span>До</span>
                <input
                  className="sort__price-input"
                  type="number"
                  name="filter-price-max"
                  id="price-filter-max"
                  onChange={handleChangePriceMax}
                />
              </label>
            </li>
          </ul>
        </fieldset>
    </div>
  )
}
