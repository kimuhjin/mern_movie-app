import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
    moviePost: props.movieInfo.backdrop_path
  };
  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variable).then(response => {
      if (response.data.success) {
        console.log(response.data.FavoriteNumber);
        setFavoriteNumber(response.data.FavoriteNumber);
      } else {
        alert("Failed to get favoriteNumber");
      }
    });

    axios.post("/api/favorite/favorited", variable).then(response => {
      if (response.data.success) {
        setFavorited(response.data.Favorited);
      } else {
        alert("Failed to get favorite Info");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      // 이미 추가 했을 때.
      axios
        .post("/api/favorite/removeFromFavorite", variable)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to remove from Favorites");
          }
        });
    } else {
      //아직 추가하지 않았을 때.
      axios.post("/api/favorite/addToFavorite", variable).then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to add to Favorites");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? "remove from Favorite" : "Add to Favorite"}
      </Button>
    </div>
  );
}

export default Favorite;
