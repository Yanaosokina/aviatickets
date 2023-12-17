import React from 'react';
import { format } from 'date-fns';
import './card.scss';


export const Card = ({ flights, filters, activeLang }) => {


  const renderCards = (filteredFlights) => {
    if (filteredFlights.length === 0) {
      return <div className="empty-results">Не найдено</div>;
    }
    return (
      <ul className="cards">
        {filteredFlights.map(({ flight }) => {
          const { segments, duration } = flight.legs[0];
          const lastSegmentIndex = segments.length - 1;
          const departureCity = segments[0].departureCity.caption;
          const departureAirport = segments[0].departureAirport.caption;
          const departureAirportCode = segments[0].departureAirport.uid;
          const arrivalCity = segments[lastSegmentIndex].arrivalCity ? segments[lastSegmentIndex].arrivalCity.caption : 'err' ;

          
          const arrivalAirport =
            segments[lastSegmentIndex].arrivalAirport.caption;
          const arrivalAirportCode =
            segments[lastSegmentIndex].arrivalAirport.uid;

          const { departureDate } = segments[0];
          const { arrivalDate } = segments[lastSegmentIndex];


          return (
            <li  className="card">
              <div>
                <div className="card__header">
                  <div className="card__logo">
                    <img
                      src='#'
                      alt="airline company logo"
                    />
                  </div>
                  <div className="card__price">
                    <b className="price">{`${flight.price.total.amount} ₽`}</b>
                    <p className="price-info">Стоимость одного взрослого пасажира</p>
                  </div>
                </div>
                <div className="card__body">
                  <div className="card__flight">
                    <p className="card__info">
                      {`${departureCity}, ${departureAirport} (${departureAirportCode})`}
                    </p>
                    <span className="card__arrow">⟶</span>
                    <p className="card__info">{`${arrivalCity}, ${arrivalAirport} (${arrivalAirportCode})`}</p>
                  </div>
                  <hr />
                  <div className="card__dates">
                    <div>
                      <span className="card__time">
                        {format(new Date(departureDate), 'HH:mm')}
                      </span>
                      {format(
                        new Date(departureDate),
                        'dd LLLL EEE',
                      )}
                    </div>
                    <div className="card__time arrival-time">
                      {`🕑 ${Math.floor(duration / 60)} часов ${duration%60} минут` } 
                    </div>
                    <div >
                      {format(new Date(arrivalDate), 'dd LLLL EEE')}
                      <span className="card__time">
                        {format(new Date(arrivalDate), 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="card__carier">
                    <p className="card__carier-info">
                      {`Рейс выполняет: ${flight.carrier.caption}`}
                    </p>
                  </div>
                  <button type="button" className="card__button">
                    Выбрать
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const applyFilters = () => {
    let filteredFlights = Object.assign(flights, {});

    if (filters.noTransfers) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.legs[0].segments.length === 1,
      );
    }
    if (filters.minPrice) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.price.total.amount >= filters.minPrice,
      );
    }
    if (filters.maxPrice) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.price.total.amount <= filters.maxPrice,
      );
    }
    return renderCards(filteredFlights);
  };

  return <div className="cards-wraper">{applyFilters()}</div>;
};


