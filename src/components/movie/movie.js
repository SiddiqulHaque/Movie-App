import React from "react";
import "./movie.css";
const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <div className="movie" onClick={()=>props.onMovieselect(imdbID)}>
      <img
      onClick={()=>window.scrollTo(0,0)}  
      src={Poster} alt="Movie-Poster" />
      <span>{Title}</span>
      <div className="info-column">
        <span>Year : {Year}</span>
        <span>Type : {Type}</span>
      </div>
    </div>
  );
};

export default Movie;
