import React, { useEffect, useState } from "react";
import "../styles/Recommendations.css";
import MovieCard from "./MovieCard";
import axios from "axios";

// Import styles
import Slider from "react-slick";
import "../styles/TestBanner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Recommendations = (props) => {
  const settings = {
    dots: false,
    lazyLoad: "ondemand",
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5.4,
    slidesToScroll: 3,
    mobileFirst: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slideToScroll: 2,
        }
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 3.4,
          slideToScroll: 1
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 448,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    function fetchRecommended() {
      axios.get("https://movie-stream-api.herokuapp.com/api/choice", {
        withCredentials: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Max-Age": -1,
          "Cache-Control": "no-cache",
          "Authorization": localStorage.getItem("token")
        }
      })
      // fetch("https://movie-stream-api.herokuapp.com/api/choice")
        .then(res => {
          console.log(res);
          // setMovies(res.data.data);
        })
        .catch(err => console.log("Coundn't fetch choices, sorry", err));
    }
    fetchRecommended();
  }, []);

  return (
    <div className="recommendations" style={{"display": movies.length <= 0 ? "none" : "block"}}>
      <div className="top">
          <div className="title">Recommendations</div>
          <div className="filter">
            <p>Filba</p>
            <p className="active">Friends</p>
          </div>
      </div>
      <div className="top1">
        <p>Recommendations</p>
        <div className="filter">
            <p>Filba</p>
            <p className="active">Friends</p>
        </div>
      </div>

      {/* <button {...props} onClick={() => Slider.slickPrev()}>Prev</button> */}
      <Slider {...settings}>
        {/* <MovieCard title="Old Guard" like={false} viewed={true} adPic={Joker} />
        <MovieCard title="Old Guard" like={true} viewed={false} adPic={Joker} />
        <MovieCard title="Old Guard" like={true} viewed={true} adPic={Joker} />
        <MovieCard title="Old Guard" like={true} viewed={false} adPic={Joker} />
        <MovieCard title="Old Guard" like={true} viewed={true} adPic={Joker} />
        <MovieCard title="Old Guard" like={true} viewed={false} adPic={Joker} /> */}
        {movies.map((i, idx) => <MovieCard title={i.name} like={true} viewed={true} /> )}
      </Slider>
    </div>
  );
}

export default Recommendations;