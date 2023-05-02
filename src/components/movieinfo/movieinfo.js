import React, { useEffect, useState } from "react";
import "./movieinfo.css";
import Axios from "axios";
import { API_KEY } from "../../App";
const Movieinfo = (props) => {
  const { selectedmovie } = props;
  const [movieInfo, setmovieInfo] = useState();
  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedmovie}&apikey=${API_KEY}`
    ).then((response) => {
      setmovieInfo(response.data);
    });
  }, [selectedmovie]);
  return (
    <div className="main">
      {movieInfo ? (
        <div className="movie-info">
          <img src={movieInfo?.Poster} alt="" />
          <div className="info-column">
            <span className="movie-name">Movie : {movieInfo?.Title}</span>
            <span className="other-info">
              IMDB Rating : <span>{movieInfo?.imdbRating}</span>
            </span>
            <span className="other-info">
              Genre : <span>{movieInfo?.Genre}</span>
            </span>
            <span className="other-info">
              Type : <span>{movieInfo?.Type}</span>
            </span>
            <span className="other-info">
              Rated : <span>{movieInfo?.Rated}</span>
            </span>
            <span className="other-info">
              Year: <span>{movieInfo?.Year}</span>
            </span>
            <span className="other-info">
              Runtime: <span>{movieInfo?.Runtime}</span>
            </span>
            <span className="other-info">
              Director : <span>{movieInfo?.Director}</span>
            </span>
            <span className="other-info">
              Actors : <span>{movieInfo?.Actors}</span>
            </span>
            <span className="other-info">
              <p id="plot">
                Plot :<span>{movieInfo?.Plot}</span>
              </p>
            </span>
          </div>
          <div className="close" onClick={() => props.onMovieselect()}>
            <span>X</span>
          </div>
        </div>
      ) : (
        <span className="loading">Loading...</span>
      )}
    </div>
  );
};

export default Movieinfo;
