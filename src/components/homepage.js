import React from "react";
import "../App.css";

export default function HomePage() {
  const github = "https://github.com/GaburaisuVGC";
  return (
    <section>
      <div className="homepage">
          <div className="hometext">
        <h1 className="welcome">Bienvenue dans TMDB React</h1>
        <p className="welcome-p">
          TMDB React est un projet réalisé dans le cadre d'un test technique. À
          l'aide de l'API The Movie Database, vous pouvez rechercher un film et
          accéder à ses informations sur une seule page.
        </p>
        <a className="github" href={github}>Voir mon GitHub</a>
        </div>
      </div>
    </section>
  );
}
