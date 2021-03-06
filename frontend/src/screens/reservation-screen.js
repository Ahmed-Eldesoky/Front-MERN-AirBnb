import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../auth";
import Navbar from "../components/navbar";

export default function ReservationScreen() {
  const [reservation, setReservation] = useState({});
  const params = useParams();
  const reservationId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/reservation/${reservationId}`)
      .then((res) => {
        setReservation(res.data);
      });
  }, []);

  async function handleReserve() {
    const ok = window.confirm(
      "Are you sure you want to reserve this appartment?"
    );

    if (ok) {
      axios
        .get(`http://localhost:4000/reservation/${reservationId}/reserve`, {
          headers: {
            "x-auth-token": await getAuthToken(),
          },
        })
        .then(() => {
          setReservation({ ...reservation, isReserved: true });
          window.alert("Successfully reserved!");
        });
    }
  }

  return (
    <div>
      <Navbar lightBg />
      <div className="container mt-5">
        <div className="row" style={{marginTop:"9%"}}>
          <div className="col-12 col-md-6 col-lg-4">
            <img
              width="100%"
              className="rounded"
              src={`http://localhost:4000${reservation.image}`}
              alt="reservation"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-8">
            <h3>{reservation.name}</h3>
            <p>{reservation.description}</p>
            <p className="mt-4">
              Price: <strong>{reservation.price}</strong>
            </p>

            <button
              disabled={reservation.isReserved}
              onClick={handleReserve}
              className="btn bg-primary text-white font-weight-bold btn-sm px-3 py-2 m-0"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
