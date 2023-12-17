import React, { useEffect, useState } from "react";
import { Sort } from "./components/sorting/Sort.jsx";
import { Card } from "./components/cards/Card.jsx";
import flightsResponse from "./flights.json";
import './app.scss';

function App() {
  const [flights, setFlights] = useState(flightsResponse.result.flights);

  const [filters, setFilters] = useState({
    noTransfers: false,
    minPrice: null,
    maxPrice: null,
  });

  return (
    <div className="app">
      <Sort flights={flights} setFlights={setFlights} setFilters={setFilters}/>
      <Card flights={flights} filters={filters} />
    </div>
  );
}

export default App;
