import React, { useState, useEffect } from "react";
import "../styles/Watch.css";
import AppNavBar from "./AppNavBar";
import SubcribeLayout from "./SubscribeLayout";
import Footer from "./Footer";
// import Joker from "../joker_movie.jpg";
import MovieCard from "./MovieCard";
// import ReactPlayer from "react-player";
import { FaEye, FaHeart, FaPlus, FaStar } from "react-icons/fa";
// import { MdPlaylistAdd } from "react-icons/md";


import axios from "axios";
// import { GoPrimitiveDot } from "react-icons/go";
// import urls from "../apiEndPoints";

/* Some small components */
// const Cast = ({ pic, actorName, name }) => {
//   return (
//     <div className="cast-item">
//       <img src={pic} alt="." />
//       <div>
//         <p>{actorName}</p>
//         <p>{name}</p>
//       </div>
//     </div>
//   );
// };

// const Friend = ({ pic, name, address }) => {
//   return (
//     <div className="friend">
//       <img src={pic} alt="." />
//       <div className="detail">
//         <h3>{name}</h3>
//         <p>{address}</p>
//       </div>
//     </div>
//   );
// };

<<<<<<< HEAD
const SimilarMovies = ({ u_id }) => {
  // fetch data from api using u_id
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const GetSimilarMovies = async (u_id) => {
      let similarMovies = [];
      console.log(u_id);
      try {
        const res = await axios.get(
          `https://movie-stream-api.herokuapp.com/api/similar/movie/${u_id}`
        );
        console.log(res);
        // set the value of similarMovies variable to the response
        setMovies(similarMovies);
      } catch (err) {
        console.log("Sorry can't fetch similar movies now", err);
      }
    };
    GetSimilarMovies(u_id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="recommended">
      <p className="title">You might also like</p>
      <div className="show">
        {/* <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        />
        <MovieCard
          title="The Lord"
          liked={false}
          viewed={false}
          adPic={Joker}
        /> */}
        {movies.map((i, idx) => <MovieCard title={i.title} liked={i.liked} viewed={i.viewed} />)}
      </div>
    </div>
  );
};

const Watch = ({ match }) => {
  // console.log(match.params.movie_id);
  const u_id = match.params.movie_id;
  const [data, setData] = useState({});
  useEffect(() => {
    function fetchDetail() {
      axios.get(`https://movie-stream-api.herokuapp.com/api/get/movie/${u_id}/`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.log("Sorry, can't fetch movie detail!"));
    }
    fetchDetail();
    // eslint-disable-next-line
  }, []);
=======
const Watch = (props) => {
  const { match, location } = props;
  console.log("This is the movie_id: ", match.params.movie_id);
  const u_id = match.params.movie_id;
  // debugger;
  const [movie_name, setMovieName] = useState("");
  const [movie_id, setMovieId] = useState("");
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  // const [data, setData] = useState({});
  useEffect(() => {
    function fetchDetail() {
      axios.post(`https://movie-stream-api.herokuapp.com/api/get/movie/${u_id}/`, {
        "token": localStorage.getItem("token"),
      })
        .then(res => {
          console.log(res.data);
          setMovieName(res.data.data.name);
          setMovieId(res.data.data.public_id);
          setLikes(res.data.data.thumbs_up);
          setViews(res.data.data.popular);
        })
        .catch(err => console.log("Sorry, can't fetch movie detail!", err));
    }
    fetchDetail();
  }, []);

  const SimilarMovies = () => {
    // fetch data from api using u_id
    // console.log("Props Id: " + props.id);
    const [movies, setMovies] = useState([]);
    const [movie_length, setMoviesLength] = useState(0);
    useEffect(() => {
      const GetSimilarMovies = async () => {
        try {
          const res = await axios.get("https://movie-stream-api.herokuapp.com/api/similar/movie/"+ movie_id);
          console.log("Similar Movies: ", res);
          // set the value of similarMovies variable to the response
          setMovies(res.data.data);
          setMoviesLength(res.data.data.length);
        } catch (err) {
          console.log(err);
        }
      };
      GetSimilarMovies();
    }, []);
  
    return <div className="recommended">
            {/* <p className="title">{ movies.length != 0 ? "You might also like" : null }</p> */}
            <div className="show">
              {/* {movies.map((i, idx) => <MovieCard title={i.title} liked={i.liked} key={idx} viewed={i.viewed} />)} */}
            </div>
          </div>
  };

>>>>>>> c6fb155287c03fa2a9bf8bf1ba54c9263150f328
  return (
    <div className="watch">
      <AppNavBar />
      <div className="watch-body">
        <div className="movieShow">
          <div className="vid">
            <div className="main">
              {/* <ReactPlayer 
                // url="http://filba.com/vid.mp4"
                url="http://192.168.43.157/vid.mp4"
                lazy="true"
                
                controls
                className="theShow"
              /> */}
              <video 
<<<<<<< HEAD
                // poster={`https://res.cloudinary.com/du05mneox/video/upload/${movie_name}.jpg`}
=======
                poster={`https://res.cloudinary.com/dymhlpm8a/video/upload/${movie_name}.jpg`}
>>>>>>> c6fb155287c03fa2a9bf8bf1ba54c9263150f328
                autoPlay={true}
                controls={true}
                className="theShow"
              >
<<<<<<< HEAD
                {/* <source src={`https://res.cloudinary.com/du05mneox/video/upload/${movie_name}`} type="video/webm"/>
                <source src={`https://res.cloudinary.com/du05mneox/video/upload/${movie_name}`} type="video/mp4"/>
                <source src={`https://res.cloudinary.com/du05mneox/video/upload/${movie_name}`} type="video/ogg"/> */}
=======
                <source src={`https://res.cloudinary.com/dymhlpm8a/video/upload/${movie_name}`} type="video/webm"/>
                <source src={`https://res.cloudinary.com/dymhlpm8a/video/upload/${movie_name}`} type="video/mp4"/>
                <source src={`https://res.cloudinary.com/dymhlpm8a/video/upload/${movie_name}`} type="video/ogg"/>
>>>>>>> c6fb155287c03fa2a9bf8bf1ba54c9263150f328
              </video>
            </div>
            <div className="actions">
              {/* <p className="title">{movie_name}</p> */}
              <div className="btns">
                <div>
                  <FaHeart className="icons" /> <br />
                  <span>{likes}</span>
                </div>
                <div>
                  <FaEye className="icons" /> <br />
                  <span>{views}</span>
                </div>
                <div>
                  <FaPlus className="icons" /> <br />
                  <span>Add to list</span>
                </div>
              </div>
            </div>
            <div className="ratings">
                <p>Rating</p>
                <div className="stars">
                  <FaStar color="yellow"/>
                  <FaStar color="yellow"/>
                  <FaStar color="yellow"/>
                  <FaStar />
                  <FaStar />
                </div>
              </div>
          </div>
          <div>
            Hello world
          </div>
        </div>
        <div className="others">
          {/* <div className="cast">
            <h3 className="title">Cast</h3>
            <div className="display">
              <Cast pic={Joker} actorName="Elizabeth Debicki" name="Kat" />
              <Cast pic={Joker} actorName="Elizabeth Debicki" name="Kat" />
              <Cast pic={Joker} actorName="Elizabeth Debicki" name="Kat" />
              <Cast pic={Joker} actorName="Elizabeth Debicki" name="Kat" />
            </div>
            <p>See More...</p>
          </div> */}
          {/* <div className="friends">
            <p className="title">Friends</p>
              <div className="show">
                <Friend pic={Joker} name="Justin Tik" address="@justti" />
                <Friend pic={Joker} name="Justin Tik" address="@justti" />
                <Friend pic={Joker} name="Justin Tik" address="@justti" />
                <Friend pic={Joker} name="Justin Tik" address="@justti" />
                <p>See More..</p>
              </div>
          </div> */}
        </div>
        <SimilarMovies />
      </div>
      <SubcribeLayout />
      <Footer />
    </div>
  );
};

export default Watch;
