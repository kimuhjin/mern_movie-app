import React, { useEffect, useState } from "react";
import "./favorite.css";
import axios from "axios";
import { Button } from "antd";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config.js";

function FavoritePage() {
  const variables = { userFrom: localStorage.getItem("userId") };
  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  useEffect(() => {
    fetchFavoritedMovies();
  }, []);

  const fetchFavoritedMovies = () => {
    axios.post("/api/favorite/getFavoritedMovie", variables).then(response => {
      if (response.data.success) {
        setFavoritedMovies(response.data.favorites);
        console.log(response.data.favorites);
      } else {
        alert("Failed to get favorited Videos");
      }
    });
  };

  const onClickRemove = movieId => {
    const variable = {
      movieId: movieId,
      userFrom: localStorage.getItem("userId")
    };

    axios.post("/api/favorite/removeFromFavorite", variable).then(response => {
      if (response.data.success) {
        fetchFavoritedMovies();
      } else {
        alert("Failed to remove from Favorites");
      }
    });
  };

  const renderTableBody = FavoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.movieImage ? (
          <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="moviePost" />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}mins</td>
        <td>
          <Button onClick={() => onClickRemove(movie.movieId)}>
            Remove from the favorites
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>Favorite Movies</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove From Favorite </th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
