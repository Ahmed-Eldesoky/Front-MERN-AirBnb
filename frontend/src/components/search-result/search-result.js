import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyFancyComponent from "../map/map";
import Navbar from "../navbar";
import SearchResultItem from "./search-result-item";
import './searchResult.css'

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
        nOfGuests: query[7],
        startdate:query[3],
        enddata:query[5]
        
      })
      

     
      .then((data) => {
      
        setReservations(data.data);
      });
  }, []);
  console.log(query)

  return (
    <div>
      <Navbar  lightBg />
      
      <div className="row">
        <div className="col-md-12 col-lg-8">
        <div className=" mt-5">
        <header>
          <div className="ml-5">
            <h4>
              Search result for: <strong>{query[1]}</strong>
            </h4>
            <div className="d-flex">
              <p>
                <strong>{"#"}</strong> Stays
              </p>
              <br></br>
              <p className="">
                <strong>{"..."}</strong> Governorate
              </p>
            </div>
          </div>
        </header>

        <hr className="mt-n1 ml-4 w-75" />
        <div className="row">
        {/*  */}
          <div className="side-stays col-12 col-xl-12 col-md-12">
          <section className="mt-4 row justify-content-between">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div className="col-12 col-lg-12">
                <SearchResultItem reservation={reservation} />
              </div>
            ))
          ) : (
            <h3>No results found</h3>
          )}
        </section>
          </div>

         

        </div>

       
      </div>
        </div>
        <div className="col-md-12 col-lg-4">
        <div className="side-map   ">
               <div className="w-100">
               <MyFancyComponent   
                   location={`${query[1]}`} />
               </div>
           
          </div>
        </div>
      </div>

   
    </div>
  );
}
