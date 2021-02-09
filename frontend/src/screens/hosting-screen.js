import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthToken } from "../auth";
import Navbar from "../components/navbar";

export default function HostingScreen() {
  const [hostings, setHostings] = useState([]);

  async function getHostings() {
    axios
      .get(`http://localhost:4000/reservation/hosting`, {
        headers: {
          "x-auth-token": await getAuthToken(),
        },
      })
      .then((res) => {
        setHostings(res.data);
      });
  }

  useEffect(() => {
    getHostings();
  }, []);

  return (
    <div>
      <Navbar lightBg />
      <NewHosting updateHostings={getHostings} />
      <HostingList hostings={hostings} />
    </div>
  );
}

function NewHosting({ updateHostings }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [nOfGuests, setNOfGuests] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("location", location);
    data.append("nOfGuests", nOfGuests);
    data.append("type", type);
    data.append("description", description);
    data.append("price", price);

    axios
      .post(`http://localhost:4000/reservation/hosting`, data, {
        headers: {
          "x-auth-token": await getAuthToken(),
        },
      })
      .then(() => {
        updateHostings();
      });
  }

  return (
    <div className="container mt-5">
      <h3>New Hosting</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-light rounded p-4 border mt-3"
      >
        <div className="form-row">
          <div className="form-group col-md-6 col-lg-4">
            <label for="input_name">Title</label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="input_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6 col-lg-4">
            <label for="input_location">Location</label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="input_location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6 col-lg-4">
            <label for="guests_input">Number of guests</label>
            <input
              type="number"
              min="0"
              max="15"
              className="form-control shadow-sm"
              id="guests_input"
              value={nOfGuests}
              onChange={(e) => setNOfGuests(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6 col-lg-4">
            <label for="type_input">Type</label>
            <select
              id="type_input"
              className="custom-select shadow-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select a type --
              </option>
              <option value="ENTIRE_HOME">Entier home</option>
              <option value="UNIQUE_STAYES">Unique stays</option>
              <option value="CABINS_AND_COTTAGE">Cabins and Cottage</option>
              <option value="PETS_WELCOME">Pets welcome</option>
            </select>
          </div>
          <div className="form-group col-md-6 col-lg-4">
            <label for="guests_input">Price</label>
            <input
              type="number"
              min="0"
              className="form-control shadow-sm"
              id="guests_input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="form-group mt-n2">
          <label for="description_textarea">Description</label>
          <textarea
            class="form-control shadow-sm"
            id="description_textarea"
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group custom-file shadow-sm">
          <input
            type="file"
            class="custom-file-input"
            id="validatedInputGroupCustomFile"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
          />
          <label class="custom-file-label" for="validatedInputGroupCustomFile">
            {image.name || "Choose file..."}
          </label>
        </div>

        <button
          type="submit"
          className="btn bg-primary btn-sm m-0 py-1 px-2 text-white mt-2 d-block ml-auto"
        >
          Add hosting
        </button>
      </form>
    </div>
  );
}

function HostingList({ hostings }) {
  return (
    <div className="container mt-5">
      <div className="mt-5">
        <h3 className="mb-2">Your hostings</h3>
        <div className="row">
          {hostings.map((hosting) => (
            <div key={hosting._id} className="col-12 col-md-6">
              <div
                className="card overflow-hidden rounded-lg mb-3 ml-0"
                style={{ maxWidth: 540 }}
              >
                <div className="row no-gutters p-0 text-decoration-none">
                  <div className="card-img-top">
                    <img
                      className="img-fluid"
                      width="100%"
                      height="100%"
                      src={`http://localhost:4000/reservation/${hosting._id}/image`}
                      alt="apartment"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{hosting.name}</h5>
                    <p className="card-text">{hosting.description}</p>
                    <p className="card-text">
                      <div>
                        Type: <strong>{hosting.type}</strong>
                      </div>
                      <div className="mt-2">
                        Price: <strong>{hosting.price} EGP</strong>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
