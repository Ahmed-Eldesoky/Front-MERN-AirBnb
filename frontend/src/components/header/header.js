import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Navbar from "../navbar";

export default function Header() {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const history = useHistory();

  function handleSearch(e) {
    e.preventDefault();

    if (!location) return;
    history.push(
      `/reservations?location=${location}${guests ? "&gutests=" + guests : ""}`
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container d-flex align-items-center justify-content-center">
        <form
          onSubmit={handleSearch}
          className="mt-5 py-2 px-5 d-flex align-items-center justify-content-between bg-white rounded-pill shadow"
        >
          {/* Location */}
          <div className="form-group mb-0">
            <label for="location" className="mb-0 font-weight-bold">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Where are you going?"
              className="form-control border-0 p-0 m-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div
            className="ml-4 mr-5"
            style={{ backgroundColor: "gray", height: "2rem", width: 1 }}
          ></div>

          {/* Guests */}
          <div className="form-group mb-0">
            <label for="guests" className="mb-0 font-weight-bold">
              Guests
            </label>
            <input
              id="guests"
              type="text"
              placeholder="Add guests"
              className="form-control border-0 p-0 m-0"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn bg-red rounded-circle d-flex align-items-center justify-content-center text-white p-3 mr-n4"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
}
