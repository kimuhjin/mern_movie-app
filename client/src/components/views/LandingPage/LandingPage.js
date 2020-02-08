import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Row, Button } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook.
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint); //fetchMovies에 주소를 전달.
  }, []);

  const fetchMovies = path => {
    fetch(path) // endpoint를 path로 받아온다.
      .then(response => response.json()) //json 형식으로 데이터를 fetch 한다.
      .then(response => {
        console.log(response);
        // setMovies(response.results); //state값을 fetch 한 데이터중 results값으로 저장한다
        // response.results값만 변경이 되면 onClick을 해도 새로운 데이터가 뒤에 붙는것이 아닌 새롭게 렌더링 된다.
        setMovies([...Movies, ...response.results]); // 'spread...'로 데이터를 뒤에 붙여줘 기존데이터 뒤에 새로운 데이터가 보이게 한다.
        setCurrentPage(response.page); //현재 page값을 state값에 저장한다.
      });
  };

  const handleClick = () => {
    //onClick이 실행되면 endpoint의 page값이 1씩 증가하여 다음 page의 데이터를 렌더링한다.
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage +
      1}`; // endpoint에 값을 currentPage로 받아온 값에 1을 더해서 전달한다. (기본값은 0)
    fetchMovies(endpoint); //변조된 endpoint값을 fetchMovies에 전달한다.
  };

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {/* Movie Main Image */}
      {Movies[0] && ( //렌더링하는 속도가 데이터를 fetch해오는 속도보다 빠르기 때문에 {Moive[0]&& }로 감싸준다.
        <MainImage
          //props로 넘겨준다.
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path &&
            Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <Title level={2}>movies by latest</Title>
        <hr />
        {/* Grid Card */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              //  index로 key값을 넣어줘야 에러가 발생하지 않는다.
              // movie로 파라미터값을 변경해 받아와야 불변성이 지켜진다.
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                ></GridCard>
              </React.Fragment>
            ))}
        </Row>
        {/* Load More Button */}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}> Load More </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
