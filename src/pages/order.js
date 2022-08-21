import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import Swiper from "../components/Swiper";
import SearchBar from "../components/SearchBar";
import Jobs from "../components/Jobs";
import ProgressBar from "../components/ProgressBar";
import RichSwiper from "../components/RichSwiper";
import Partners from "../components/Partners";
import UserDashboard from "../components/UserDashboard";
import data from "../data/index.json";
import partnersData from "../data/partners.json";
import dataListing from "../data/user-add.json";
import dataCoursePacks from "../data/course-packs.json";
import lastMinute from "../data/lastminute.json";
import geoJSON from "../data/rooms-geojson.json";
import { useSelector } from "react-redux";
import LandingPageOnboarding from "../components/LandingPageOnboarding";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import leftImageBanner from "../../public/content/img/photo/workschool-banner-3.png";
import rightImageBanner from "../../public/content/img/photo/workschool-banner-4.png";
import { Image } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import Head from "next/head";
import AnalyticsService from "../services/AnalyticsService";
import API_URL from "../utils/API_URL";
import axios from "axios";
import CourseCardBought from "../components/CourseCardBought";

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

export default () => {
  const {
    isAuthenticated,
    user: { email, name },
  } = useSelector((state) => state.auth);
  const [showOnboarding, setOnboarding] = useState(true);
  const cookies = new Cookies();
  const router = useRouter();
  const [Data, setData] = useState([]);

  useEffect(() => {
    const hasOnboarded = cookies.get("hasOnboarded");
    if (router.query.onboarded) {
      setOnboarding(false);
    }

    if (hasOnboarded) {
      setOnboarding(false);
    }
  }, [router]);

  const renderLandingPageOnboarding = () => {
    if (isAuthenticated) {
      return <div></div>;
    } else {
      return showOnboarding && <LandingPageOnboarding />;
    }
  };

  useEffect(async () => {
    AnalyticsService.logPageView(
      window.location.pathname + window.location.search
    );
  });

  useEffect(async () => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await axios.get(`${API_URL}/getMyCart`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "json" },
      });
      // console.log(res.data);
      // console.log(res);
      let demo = [];
      res.data.forEach((element) => {
        if (element.courseId !== null) {
          demo.push(element.courseId);
        }
      });
      setData(demo);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Orders</title>
        <meta name="description" content="homepage"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          property="og:title"
          content="WorkSchool: Browse 16,000+ online courses from around the globe in one single platform"
        />
        <meta
          property="og:description"
          content="Browse online courses from popular course providers and find a job in an all-in-one Netflix of Education"
        />
        <meta
          property="og:image"
          content="https://miro.medium.com/max/1400/1*-2cJ9uNUXBYnfbSVx5osDg.png"
        />
      </Head>
      <section
        style={{
          backgroundImage: `url(content/img/photo/${data.swiperPoster})`,
          backgroundColor: "#F8F9FA",
          overflow: "hidden",
        }}
      >
        <Container
          className="py-6 text-white z-index-20"
          style={{ maxWidth: "100%" }}
        >
          <Row></Row>
        </Container>
      </section>
      {
        <h2 className="mb-4" style={{ textAlign: "center" }}>
          Your Courses
        </h2>
      }
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {Data.map((item, idx) => {
          // console.log(item);
          return <CourseCardBought data={item} />;
        })}
      </div>

      {/* <Container>
        <Row className="mb-3">
          <Col md="8">
            <h5 className="subtitle text-secondary">Courses you bought</h5>
          </Col>
          <Col
            md="4"
            className="d-lg-flex align-items-center justify-content-end"
          >
            {data?.popular?.buttonLink && (
              <Link href={data?.popular?.buttonLink}>
                <a className="text-muted text-sm">
                  {data?.popular?.button}
                  <i className="fas fa-angle-double-right ml-2" />
                </a>
              </Link>
            )}
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
          xxl={4}
          data={Data}
          order={true}
          packs
        />
      </Container> */}
      <br></br>

      <br></br>

      {
        <script type="text/javascript">
          window.localStorage.setItem('lastVisited', '1');
        </script>
      }
    </React.Fragment>
  );
};
