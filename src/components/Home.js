import React from "react";

import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

import Swiper from "../components/Swiper";
import SearchBar from "../components/SearchBar";
import LastMinute from "../components/LastMinute";
import Jobs from "../components/Jobs";
import ProgressBar from "../components/ProgressBar";
import RichSwiper from "../components/RichSwiper";
import Partners from "../components/Partners";

import data from "../data/index.json";
import partnersData from "../data/partners.json";
import dataListing from "../data/user-add.json";
import dataCoursePacks from "../data/course-packs.json";

import lastMinute from "../data/lastminute.json";
import geoJSON from "../data/rooms-geojson.json";

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Homepage",
    },
  };
}
const Home = () => {
  return (
    <React.Fragment>
      <section
        className="hero-home"
        style={{
          backgroundImage: `url(content/img/photo/${data.swiperPoster})`,
        }}
      >
        <Swiper
          className="hero-slider"
          wrapperClasses="dark-overlay"
          data={data.swiperImages}
          simple={true}
          effect="fade"
          speed={2000}
          allowTouchMove={false}
          pagination={false}
          autoplay={true}
          delay={10000}
          darken
        />
        <Container className="py-6 py-md-7 text-white z-index-20">
          <Row>
            <Col xl="10">
              {data.hero && (
                <div className="text-center text-lg-left">
                  <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">
                    {data.hero.subTitle}
                  </p>
                  <h1 className="display-3 font-weight-bold text-shadow">
                    {data.hero.title}
                    <br />
                    {data.hero.title2}
                  </h1>
                </div>
              )}
              <SearchBar
                options={data.searchOptions}
                className="mt-5 p-3 p-lg-1 pl-lg-4"
                btnClassName="rounded-xl"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {data.topBlocks && (
        <section className="py-6 bg-gray-100">
          <Container>
            <div className="text-center pb-lg-4">
              <p className="subtitle text-secondary">
                {data.topBlocks.subTitle}
              </p>
              <h2 className="mb-5">{data.topBlocks.title}</h2>
            </div>
            <Row>
              {data.topBlocks.blocks.map((block) => (
                <Col
                  key={block.title}
                  lg="4"
                  className="mb-3 mb-lg-0 text-center"
                >
                  <div className="px-0 px-lg-3">
                    <div className="icon-rounded bg-primary-light mb-3">
                      <svg className="svg-icon text-primary w-2rem h-2rem">
                        <use
                          xlinkHref={`content/svg/orion-svg-sprite.svg${block.icon}`}
                        >
                          {" "}
                        </use>
                      </svg>
                    </div>
                    <h3 className="h5">{block.title}</h3>
                    <p className="text-muted">{block.content}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      {lastMinute.map((data, index) => (
        <LastMinute
          key={index}
          greyBackground
          data={data}
          geoJSON={geoJSON[index]}
        />
      ))}
      {/* <LastMinute greyBackground data={lastMinute[1]} geoJSON={geoJSON[1]} />
      <LastMinute greyBackground data={lastMinute[0]} geoJSON={geoJSON[0]} /> */}
      {dataCoursePacks.popular && (
        <section className="pt-6" style={{ marginBottom: "110px" }}>
          <Container className="my-auto">
            <Row className="mb-6" style={{ justifyContent: "center" }}>
              <Col lg="8" className="text-center">
                <h2 className="text-center">{dataCoursePacks.popular.title}</h2>
                <p className="text-muted mb-0">
                  {dataCoursePacks.popular.content}
                </p>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              {dataCoursePacks.popular.places.map((place, index) => (
                <Col
                  xs="6"
                  lg="4"
                  xl="3"
                  className={`px-0 ${
                    index === dataCoursePacks.popular.places.length - 1
                      ? "d-none d-lg-block d-xl-none"
                      : ""
                  }`}
                  key={index}
                >
                  <div
                    style={{ minHeight: "350px", maxHeight: "400px" }}
                    className="d-flex align-items-center dark-overlay hover-scale-bg-image"
                  >
                    <img
                      src={place.img}
                      alt={place.title}
                      className="bg-image"
                    />
                    <div
                      className="p-5 p-sm-5 text-white z-index-20"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,0.5))",
                        maxHeight: "250px",
                      }}
                    >
                      <h2
                        className="h6"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "2",
                          height: "2.5em",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {place.title}
                      </h2>
                      <p
                        className="mb-4"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "3",
                          height: "4.5em",
                          textOverflow: "ellipsis",
                          fontSize: 14,
                        }}
                      >
                        {place.subTitle}
                      </p>
                      <Link href={place.link}>
                        <Button
                          href={place.link}
                          color="link"
                          className="text-reset pl-0 stretched-link text-decoration-none"
                        >
                          {dataCoursePacks.popular.button}
                          <i className="fa fa-chevron-right ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      <Jobs />
      {data.forStudents && (
        <RichSwiper
          className="multi-slider"
          data={data.forStudents.images}
          perView={1}
          spaceBetween={0}
          centeredSlides
          loop
          speed={1500}
          paginationClass="swiper-pagination-white"
        />
      )}
      {partnersData.partners && (
        <Partners
          title={partnersData.partners.title}
          partners={partnersData.partners.partners}
        />
      )}
      {dataListing && (
        <React.Fragment>
          <section className="py-5 py-lg-7">
            <Container>
              <Row>
                <Col lg="5">
                  <p className="subtitle text-primary">
                    {dataListing[0].subtitle}
                  </p>
                  <h1 className="h2 mb-5">{dataListing[0].title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataListing[0].content,
                    }}
                    style={{ marginTop: "-5%" }} 
                  />
                  <p className="mb-5 mb-lg-0">
                    <Link href="/signup" passHref>
                      <Button color="primary">{dataListing[0].button}</Button>
                    </Link>
                  </p>
                </Col>
                <Col lg="5" className="ml-auto d-flex align-items-center">
                  <img
                    src="/content/img/illustration/undraw_celebration_0jvk.svg"
                    alt=""
                    style={{ width: "400px" }}
                    className="img-fluid"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
