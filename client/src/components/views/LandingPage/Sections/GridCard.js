import React from "react";
import { Col } from "antd";

function GridCard(props) {
  //파라미터 값으로 props를 써줘야 상위 디렉토리에서 지정한 props값을 사용할 수 있다.

  if (props.actor) {
    // props값이 actor로 들어오면 아래 코드 실행.(MovieDetailPage의 Toggle Actor View 때문에 따로 설정)
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt="img"
            src={props.image}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt="img"
              src={props.image}
            />
          </a>
        </div>
      </Col>
    );
  }
}
export default GridCard;
