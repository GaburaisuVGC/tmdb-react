import React from "react";
import "../App.css";
import FilmList from "../components/filmlist";
import FilmPage from "../components/filmpage";

export default function Film() {
  return (
    <section>
      <FilmList />
      <FilmPage />
    </section>
  );
}
