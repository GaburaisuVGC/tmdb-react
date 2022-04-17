import React, { useState, useEffect } from "react";
import "../App.css";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export default function FilmList() {
  let [state, setState] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#20252b",
    padding: "20px",
    margin: "4px",
    textAlign: "center",
    color: "white",
  }));

  const getRecipes = async (e) => {
    let search = "";
    let ifSearch = "";
    if (e === undefined || !e.target.value) {
      ifSearch = "discover";
    } else if (e !== undefined || e.target.value) {
      ifSearch = "search";
      search = e.target.value;
      search = search.replace(" ", "+");
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/${ifSearch}/movie?api_key=e4dc3e3c2209090b65e0d7de0011ff20&sort_by=popularity.desc&query=${search}&language=fr`
    );
    const data = await response.json();
    setState(data.results);
  };

  const displayMovies = (posts) => {
    return posts.map((post, index) => (
      <Stack key={index}>
        <Item>
          <a href={post.id}>{post.title}</a>
        </Item>
      </Stack>
    ));
  };

  return (
    <div className="filmlist">
      <div className="searchbar">
        <a href="/" className="title">
          TMDB
        </a>
        <input
          type="search"
          className="searchInput"
          onChange={getRecipes}
          placeholder="Rechercher..."
        />
      </div>
      {displayMovies(state)}
    </div>
  );
}
