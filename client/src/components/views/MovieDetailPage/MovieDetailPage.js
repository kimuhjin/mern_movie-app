import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";
function MovieDetailPage(props) {
  const movieId = props.match.params.movieId; //page의 movieId
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false); // 토글을 온오프 할 때는 initialstate값을 false로 지정하고, true값이 오면 렌더링 되게 한다.
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(response => {
        setMovie(response);
        //Toggle Actor View에 들어가는 Actor 데이터를 위해 한번 더 fetch한다.
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then(response => response.json())
          .then(response => {
            setCrews(response.cast);
          });
      });
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* Main Image */}
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path &&
            Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          ></Favorite>
        </div>

        {/* Movie Info Table */}

        <Descriptions title="Movie Info" bordered>
          <Descriptions label="Title" span={4}>
            {Movie.original_title}
          </Descriptions>
          <Descriptions label="release_date" span={2}>
            {Movie.release_date}
          </Descriptions>
          <Descriptions label="revenue">{Movie.revenue}</Descriptions>
          <Descriptions label="runtime" span={2}>
            {Movie.runtime}
          </Descriptions>
          <Descriptions label="vote_average" span={2}>
            {Movie.vote_average}
          </Descriptions>
          <Descriptions label="vote_count">{Movie.vote_count}</Descriptions>
          <Descriptions label="status">{Movie.status}</Descriptions>
          <Descriptions label="popularity">{Movie.popularity}</Descriptions>
        </Descriptions>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> Toggle Actor View </Button>
        </div>

        {/* Grid Cards for Crews */}
        {ActorToggle && ( //위에 state로 설정된 ActorToggle이 True값인 경우에만 <Row>가 렌더링 된다.
          <React.Fragment>
            <br />
            <Row gutter={[16, 16]}>
              {Crews &&
                Crews.map((crew, index) => (
                  //  index로 key값을 넣어줘야 에러가 발생하지 않는다.
                  // movie로 파라미터값을 변경해 받아와야 불변성이 지켜진다.
                  <React.Fragment key={index}>
                    {crew.profile_path && ( // crew.profile_path가 있는 actor만 이미지를 받아오게 설정. (이미지가 없는경우 깨진 파일이 보이는 것을 방지)
                      <GridCard
                        actor
                        image={`${IMAGE_URL}w500${crew.profile_path}`}
                      ></GridCard>
                    )}
                  </React.Fragment>
                ))}
            </Row>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
