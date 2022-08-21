import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";

import Swiper from "./Swiper";

export default (props) => {
  const { geoJSON, data, greyBackground } = props;
  // console.log(data.target);
  return (
    <section className={`py-6 ${greyBackground ? "bg-gray-100" : ""}`}>
      <Container>
        <Row className="mb-5">
          <Col md="8">
            {data.subtitle && (
              <p className="subtitle text-secondary">{data.subtitle}</p>
            )}
            <h2>{data.title}</h2>
          </Col>
          <Col
            md="4"
            className="d-lg-flex align-items-center justify-content-end"
          >
            {data.buttonLink &&
              (data.target ? (
                <a
                  className="text-muted text-sm"
                  href={data.buttonLink}
                  target="_blank"
                >
                  {data.button}
                  <i className="fas fa-angle-double-right ml-2" />
                </a>
              ) : (
                <Link href={data.buttonLink}>
                  <a className="text-muted text-sm">
                    {data.button}
                    <i className="fas fa-angle-double-right ml-2" />
                  </a>
                </Link>
              ))}
          </Col>
        </Row>
        <Swiper
          className="swiper-container-mx-negative pt-3 pb-5"
          perView={1}
          spaceBetween={20}
          roundLengths
          md={2}
          lg={3}
          xl={4}
          data={geoJSON.features}
          cards
        />
      </Container>
    </section>
  );
};
