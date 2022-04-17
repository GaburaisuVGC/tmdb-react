import React from "react";
import "../App.css";
import FilmList from "../components/filmlist";
import Homepage from "../components/homepage";

export default function Home() {
  return (
    <section>
      <FilmList />
      <Homepage />
    </section>
  );
}
