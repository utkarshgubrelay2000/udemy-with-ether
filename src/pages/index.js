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
import Axios from "axios";
import { web3Helper } from "../services/webHelper";
import Migration from "../contracts/Faucet.json";
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
  // const {
  //   isAuthenticated,
  //   user: { email, name },
  // } = useSelector((state) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOnboarding, setOnboarding] = useState(true);
  const cookies = new Cookies();
  const router = useRouter();
  const [Data, setData] = useState([]);
  const [Category, setCateogry] = useState([]);
const [dataCoursePacks,setdataCoursePacks] = useState([]);
  // useEffect(() => {
  //   // console.log(JSON.parse(localStorage.getItem("userInfo")));
  //   if (JSON.parse(localStorage.getItem("userInfo")) !== null) {
  //     const token = JSON.parse(localStorage.getItem("userInfo")).token;
  //     // console.log(token);
  //     const getUserInfo = async () => {
  //       try {
  //         const res = await Axios.get(`${API_URL}/getMyProfile`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "json",
  //           },
  //         });
  //         // console.log(res.data);
  //         setIsAuthenticated(true);
  //         setName(res.data.fname);
  //         setEmail(res.data.email);

  //         // alert(res.data);
  //       } catch (e) {
  //         alert(e);
  //       }
  //     };
  //     getUserInfo();
  //   }
  //   const hasOnboarded = cookies.get("hasOnboarded");
  //   if (router.query.onboarded) {
  //     setOnboarding(false);
  //   }

  //   if (hasOnboarded) {
  //     setOnboarding(false);
  //   }
  // }, [router]);
const [provider, setProvider] = useState({});
const [web3, setWeb3] = useState({});

  useEffect(()=>{
     getEth()
  },[0])
  const getEth = async () => {
   try {
    console.log("getEth",Migration,Migration.networks[Object.keys(Migration.networks)[0]].address);
     let {web3,provider} = await web3Helper()
     setWeb3(web3);
     setProvider(provider);
     let accounts = await web3.eth.getAccounts();
     //deploy contract
      let contract = new web3.eth.Contract(Migration.abi,Migration.networks[Object.keys(Migration.networks)[0]].address);
      console.log(contract);
    } catch (error) {
     console.log(error);
    }
   
  }
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
    try {
      const res = await axios.get(`${API_URL}/get-all-courses`);
      // console.log(res.data);
      // console.log(res.data.data);
      setData(res.data.data);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }

    try {
      const res = await axios.get(`${API_URL}/get-all-courses-by-all-category`);
      // console.log(res.data);
      // console.log(res.data.data);
      setCateogry(res.data.data);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>
          WorkSchool: Browse 16,000+ online courses from around the globe and
          find a job
        </title>
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
          <Row>
            <MediaQuery minDeviceWidth={1401}>
              <Col xl="3">
                <div style={{ height: "13%" }}></div>
                <Image
                  src={rightImageBanner}
                  style={{
                    position: "absolute",
                    height: 500,
                    width: "100%",
                    left: "15%",
                  }}
                />
              </Col>
              <Col
                xl="6"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {data.hero && (
                  <div className="text-center">
                    {isAuthenticated ? (
                      <>
                        <p className="subtitle letter-spacing-4 mb-2 text-secondary">
                          Continue Browsing Our Latest Courses
                        </p>
                        <h1
                          className="display-3 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          Welcome Back, <br></br>
                          <text className="text-secondary">{`${name}`}</text>
                          <br />
                        </h1>
                      </>
                    ) : (
                      <>
                        <p className="subtitle letter-spacing-4 mb-2 text-primary">
                          {data.hero.subTitle}
                        </p>
                        <h1
                          className="display-3 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          Learn for the job
                          <br />
                          Learn on the job
                        </h1>
                      </>
                    )}
                  </div>
                )}
                <SearchBar
                  options={data.searchOptions}
                  className="mt-5 p-3 p-lg-1 pl-lg-4"
                  btnClassName="rounded-xl"
                />
              </Col>
              <Col xl="3">
                <div style={{ height: "13%" }}></div>
                <Image
                  src={leftImageBanner}
                  style={{
                    position: "absolute",
                    left: "-4%",
                    height: 500,
                    width: "100%",
                  }}
                />
              </Col>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1400}>
              <Col
                xl="12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {data.hero && (
                  <div className="text-center">
                    {isAuthenticated ? (
                      <>
                        <p className="subtitle letter-spacing-4 mb-2 text-primary">
                          Continue Browsing Our Latest Courses
                        </p>
                        <h1
                          className="display-3 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          Welcome Back, <br></br>
                          <text className="text-primary">{`${name}`}</text>
                          <br />
                        </h1>
                      </>
                    ) : (
                      <>
                        <p className="subtitle letter-spacing-4 mb-2 text-primary">
                          {data.hero.subTitle}
                        </p>
                        <h1
                          className="display-3 font-weight-bold"
                          style={{ color: "black" }}
                        >
                          Learn FOR the job
                          <br />
                          Learn ON the job
                        </h1>
                      </>
                    )}
                  </div>
                )}
                <SearchBar
                  options={data.searchOptions}
                  className="mt-5 p-3 p-lg-1 pl-lg-4"
                  btnClassName="rounded-xl"
                />
              </Col>
            </MediaQuery>
          </Row>
        </Container>
        <Container style={{ textAlign: "center" }}>
          <a href="https://play.google.com/store/apps/details?id=co.workschool&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <img
              width="200"
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
        </Container>
      </section>
      {renderLandingPageOnboarding()}
      {isAuthenticated ? (
        <UserDashboard user={{ name, email }} />
      ) : (
        <section
          className="py-6"
          style={{ backgroundColor: showOnboarding ? "#F8F9FA" : "white" }}
        >
          <Container>
            <div className="text-center pb-lg-4">
              <p className="subtitle text-primary">{data.topBlocks.subTitle}</p>
              <h2 className="mb-4">{data.topBlocks.title}</h2>
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
            <div class="text-center">
              <Link href="/signup" passHref>
                <Button className="btn btn-primary" color="secondary">
                  Join for free
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      )}
      <br></br>
      {Category.map((data, index) => (
        <>
          <Container>
            <Row className="mb-4">
              <Col md="8">
                <p className="subtitle text-secondary">{data?.subtitle} </p>
                <h2>{data.categoryName}</h2>
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
              xl={5}
              // data={geoJSON[index].features}
              data={data?.coursesCategoryWise}
              cards
            />
          </Container>
          <br></br>
        </>
      ))}
      {
        <h2 className="mb-4" style={{ textAlign: "center" }}>
          Course Packs
        </h2>
      }
      {dataCoursePacks?.map((data, index) => (
        <>
          <Container>
            <Row className="mb-3">
              <Col md="8">
                <h5 className="subtitle text-secondary">
                  {data.popular.title}
                </h5>
                <p className="text-muted mb-0">{data.popular.content}</p>
              </Col>
              <Col
                md="4"
                className="d-lg-flex align-items-center justify-content-end"
              >
                {data.popular.buttonLink && (
                  <Link href={data.popular.buttonLink}>
                    <a className="text-muted text-sm">
                      {data.popular.button}
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
              data={dataCoursePacks[index].popular.places}
              packs
            />
          </Container>
          <br></br>
        </>
      ))}
      <Jobs />
      {!isAuthenticated && data.forStudents && (
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
      {!isAuthenticated && partnersData.partners && (
        <Partners
          title={partnersData.partners.title}
          partners={partnersData.partners.partners}
        />
      )}
      {!isAuthenticated && dataListing && (
        <React.Fragment>
          <ProgressBar progress={0} />
          <section className="py-5 py-lg-5">
            <Container>
              <Row>
                <Col lg="5">
                  <img
                    src="/content/img/brand/aws_start.png"
                    alt=""
                    style={{ width: "1000px" }}
                    className="img-fluid"
                  />
                </Col>
                <Col lg="5">
                  <h1
                    className="h2 mt-5 mb-4 text-primary"
                    style={{ textAlign: "center" }}
                  >
                    {dataListing[1].title}
                  </h1>
                  <div style={{ verticalAlign: "center" }}>
                    <p>{dataListing[1].content}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      )}
      {!isAuthenticated && dataListing && (
        <React.Fragment>
          <section className="py-5 py-lg-7">
            <Container>
              <Row>
                <Col lg="5">
                  <p className="subtitle text-primary">
                    {dataListing[0].subtitle}
                  </p>
                  <h1 className="h2 mb-5">{dataListing[0].title}</h1>
                  <div style={{ marginTop: "-5%" }}>
                    <p>{dataListing[0].content}</p>
                  </div>
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
      {
        <script type="text/javascript">
          window.localStorage.setItem('lastVisited', '1');
        </script>
      }
    </React.Fragment>
  );
};
