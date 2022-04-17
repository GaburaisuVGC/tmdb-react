import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "../App.css";
import moment from "moment";
import placeholder from "../assets/placeholder.jpg";

export default function FilmPage() {
  const [form, setForm] = useState({
    id: "",
    title: "",
    vote_count: "",
    vote_average: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    budget: "",
    homepage: "",
    overview: "",
    revenue: "",
    status: "",
    genres: [],
    production_companies: [],
    runtime: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w342";
  const backdrop_size = "original";
  let genresArray = form ? form.genres.map((item) => item.name) : null;
  let productionArray = form
    ? form.production_companies.map((item) => item.name)
    : null;

  const convertRuntime = (num) => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + " heures " + rminutes + " minutes";
  };

  const convertedRuntime = form ? convertRuntime(form.runtime) : null;

  const convertedReleaseDate = form
    ? moment(form.release_date, "YYYY-MM-DD")
    : null;

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e4dc3e3c2209090b65e0d7de0011ff20&language=fr`
      );

      const record = await response.json();
      if (!record) {
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  return (
    <section>
      <div
        className="filmpage"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("${baseImgUrl}/${backdrop_size}/${form.backdrop_path}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        {form.poster_path === null ? (
          <img className="placeholder" src={placeholder} alt={form.title} />
        ) : (
          <img
            src={`${baseImgUrl}/${size}/${form.poster_path}`}
            alt={form.title}
          />
        )}

        <div className="filmblock"></div>
        <div className="filmtext">
          <h2 className="filmtitle">{form.title}</h2>
          <p className="production">{productionArray.join(", ")}</p>
          <p className="vote">
            {form.vote_average > 8 && (
              <p className="gold">{form.vote_average}/10</p>
            )}
            {form.vote_average < 8 && (
              <p className="white">{form.vote_average}/10</p>
            )}
            ({form.vote_count} votes)
          </p>
          <p className="overview">{form.overview}</p>
          <p className="genres">Genres : {genresArray.join(", ")}</p>
          <p className="runtime">Durée : {convertedRuntime}</p>

          <p className="release">
            Sortie du film : {convertedReleaseDate.format("L")}
          </p>
          <div className="budgetdiv">
            <p className="budget">
              Budget :{" "}
              {form.budget === 0 ? (
                <p>Not Available</p>
              ) : (
                <p> {"$ " + form.budget.toLocaleString()}</p>
              )}
            </p>
            <p className="revenue">
              Revenu :
              {form.revenue === 0 ? (
                <p>Not Available</p>
              ) : (
                <p> {"$ " + form.revenue.toLocaleString()}</p>
              )}
            </p>
          </div>

          <p className="status">{form.status}</p>
        </div>
        <a className="site" href={form.homepage}>
          Site internet du film {form.title}
        </a>
      </div>
    </section>
  );
}
