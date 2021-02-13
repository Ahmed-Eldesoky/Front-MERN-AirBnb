import { PinDropSharp } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar";
 import SearchResultItem from "./SearchResultItem ";

export default function Filtter(props) {
  const [reservations, setReservations] = useState([]);




  useEffect(() => {
    axios
      .post("http://localhost:4000/reservation/type", {
        type: props.match.params.type,
       
      })
     
      .then((data) => {
        setReservations(data.data);
        
      });
  }, []);

  return (
    <div>
      <Navbar lightBg />
     

      <div className="container mt-5">
        <header>
          <h4>
            Search result for: <strong>{props.match.params.type}</strong>
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
