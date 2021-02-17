import React from "react";
import { Link } from "react-router-dom";

export default function SearchResultItem({ reservation }) {
  const { name, description, image, nOfGuests,price, type, _id} = reservation;
  console.log(_id)
  return (
    <div
      className=" overflow-hidden rounded mb-3"
      style={{ maxWidth: '90%'}}
    >
      <Link
        to={`/reservations/${_id}`}
        className="row no-gutters p-0 text-decoration-none"
      >
        <div className="col-md-6">
          <img
            width="80%"
            height="90%px"
            className='rounded'
            src={`http://localhost:4000/reservation/${_id}/image`}
            alt="apartment"
          />
        </div>
        <div className='DivDesc col-12 col-xl-6 col-md-6'>
          <div className='col-8'>
              <p>{type}</p>
              <h4 className="">{name}</h4>
              <hr style={{width:"50px"}}/>
              <p>{nOfGuests} Guests</p>
              <p>{description}</p>
              <p className="P_Price" style={{color:"#2F4F4F"}}><strong>{price}EGP </strong>/ night</p>
          </div>
      </div>
        {/* <div className="col-md-6">
          <div className="text-dark">
            <p>{type}</p>
            <h4 className="">{name}</h4>
            <hr style={{width:"60px"}}/>
            <p className="">{description}</p>
            <p className="">
              <div className="" style={{marginLeft:"180px"}}>
                <strong>$ {price} EGP</strong>/Night
              </div>
            </p>
          </div>
        </div> */}
      </Link>
      <hr></hr>
    </div>
  );
}
