import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar";
import SearchResultItem from "./search-result-item";

export default function SearchResult() {
  const [reservations, setReservations] = useState([]);
  const location = useLocation();
  const query = location.search.split(/\?|&|=/).filter(Boolean);
  console.log(location)

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-light-gray");

    return () => {
      body.classList.remove("bg-light-gray");
    };
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/reservation", {
        location: query[1],
        nOfGuests: query[3],
        startdate:query[5],
        enddata:query[7]
        
      })
      

     
      .then((data) => {
      
        setReservations(data.data);
      });
  }, []);
  console.log(query)

  return (
    <div>
      <Navbar lightBg />

      <div className="container mt-5">
        <header>
          <h4>
            Search result for: <strong>{query[1]}</strong>
          </h4>

          <div className="d-flex">
            <p>
              <strong>{"#"}</strong> Stays
            </p>
            <p className="ml-2">
              <strong>{"..."}</strong> Governorate
            </p>
          </div>
        </header>

        <hr className="mt-n1" />

        <section className="mt-4 row justify-content-between">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div className="col-12 col-lg-6">
                <SearchResultItem reservation={reservation} />
              </div>
            ))
          ) : (
            <h3>No results found</h3>
          )}
        </section>
      </div>
    </div>
  );
}
