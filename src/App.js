import React, { useEffect, useState } from "react";
import "./app.css";
import icon from "./assets/icon.avif";
import Movie from "./components/movie/movie";
import Movieinfo from "./components/movieinfo/movieinfo";
import Axios from "axios";
export const API_KEY = "bd240564";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [timeoutid, setTimeoutid] = useState();
  const [movielist, updateMovielist] = useState([]);
  const [selectedmovie, onMovieselect] = useState();
  //Pagination
  const [totalResults, setTotalresults] = useState(0);
  const [numberofPages, setnumberofPages] = useState();
  const [currentPage, setcurrentPage] = useState();

  const getnumberofPages = () => {
    if (totalResults % 10 > 0) {
      const numberofPages = parseInt(totalResults / 10 + 1);
      setnumberofPages(numberofPages);
      return;
    }
    const numberofPages = parseInt(totalResults / 10);
    setnumberofPages(numberofPages);
  };
  const fetchData = async (pagenumber) => {
    if (pagenumber) {
      const response = await Axios.get(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}&page=${pagenumber}`
      );
      updateMovielist(response.data.Search);
      setTotalresults(response.data.totalResults);
      return;
    }
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}&page=1`
    );
    updateMovielist(response.data.Search);
    setcurrentPage(1);
    setTotalresults(response.data.totalResults);
  };
  useEffect(() => {
    getnumberofPages();
  });
  //******for debouncing following code  */
  // const setTextchange = (event) => {
  //   clearTimeout(timeoutid);
  //   setSearchQuery(event.target.value);
  //   const timeout = setTimeout(() => {
  //     fetchData(event.target.value);
  //   }, 500);
  //   setTimeoutid(timeout);
  // };
  // **********************

  const handleSubmit = (e) => {
    fetchData();
    // setSearchQuery("");
  };
  const pages = [];
  for (let i = 1; i <= numberofPages; i++) {
    pages.push(
      <p key={i} onClick={(e) => goto(i)}>
        {i}
      </p>
    );
  }
  const goto = (pagenumber) => {
    setcurrentPage(pagenumber);
    fetchData(pagenumber);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="header">
        <div className="appname">
          <span>Movie Hub</span>
        </div>
        <div className="searchbox">
          <input
            type="text"
            placeholder="Search Any Movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e.target.value);
              }
            }}
          />
          <img
            src={icon}
            alt=""
            onClick={(e) => {
              handleSubmit(e.target.value);
            }}
          />
        </div>
      </div>
      {selectedmovie && (
        <Movieinfo
          selectedmovie={selectedmovie}
          onMovieselect={onMovieselect}
        />
      )}
      <div className="movielist-container">
        {movielist
          ? movielist.map((movie, index) => (
              <Movie key={index} movie={movie} onMovieselect={onMovieselect} />
            ))
          : <span style={{fontWeight:"bold",fontSize:"30px"}}>Please Enter Any Movie</span>}
      </div>
      {numberofPages ? (
        <div className="pages">
          {currentPage - 1 === 0 ? null : (
            <button onClick={(e) => goto(currentPage - 1)}>Prev</button>
          )}
          <button>{currentPage}</button>
          {currentPage===numberofPages?null:<button onClick={(e) => goto(currentPage + 1)}>Next</button>}
          
        </div>
      ) : null}
    </>
  );
}

export default App;
