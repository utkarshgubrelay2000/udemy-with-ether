import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import AuthenticationService from "../../services/AuthenticationService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AnalyticsService from "../../services/AnalyticsService";
import Axios from "axios";
import API_URL from "../../utils/API_URL";

// export async function getStaticProps() {
//   return {
//     props: {
//       title: "Sign up",
//       hideHeader: true,
//       hideFooter: true,
//       noPaddingTop: true,
//     },
//   };
// }

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [courseRedirectError, setCourseRedirectError] = useState(false);
  const [jobRedirectError, setJobRedirectError] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    import("react-facebook-pixel")
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init("300655751489647");
        ReactPixel.pageView();
      });
  }, []);

  useEffect(() => {
    if (router.query.courseRedirect) {
      setCourseRedirectError(true);
    } else if (router.query.jobRedirect) {
      setJobRedirectError(true);
    }
  }, [router]);

  useEffect(() => {
    AnalyticsService.logPageView(
      window.location.pathname + window.location.search
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { fname: name, lname: "", email, password, mobile };
    if (name) userData["name"] = name;

    try {
      const res = await Axios.post(`${API_URL}/signup`, userData);
      alert("sucessfully signed up");
      router.push(`/login-course/${id}`);
    } catch (error) {
      alert(error);
    }
    // const resp = await AuthenticationService.registerUser(userData);
    // if (resp) {
    //   import("react-facebook-pixel")
    //     .then((module) => module.default)
    //     .then((ReactPixel) => {
    //       ReactPixel.init("300655751489647");
    //       ReactPixel.trackCustom("Signup", { Name: name, Email: email });
    //     });
    //   AnalyticsService.setEvent("User", "Successful Signup", "Signup");
    //   router.push("/");
    // } else {
    //   AnalyticsService.setEvent("User", "Failed Signup", "Signup Error");
    // }
  };

  return (
    <Container fluid className="px-0" style={{ marginTop: "74px" }}>
      <Header />
      <Row className="min-vh-100 mx-0 overflow-hidden">
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            {courseRedirectError && (
              <div
                style={{
                  marginBottom: "5%",
                  marginLeft: "1%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
                <i
                  className="fas fa-exclamation-circle text-danger"
                  style={{ fontSize: 50 }}
                ></i>
                <text
                  className="text-danger"
                  style={{ marginLeft: "3%", fontWeight: 900 }}
                >
                  It looks like you've ran out of the amount of courses you can
                  view. Sign up to view all the courses you want now!
                </text>
              </div>
            )}
            {jobRedirectError && (
              <div
                style={{
                  marginBottom: "5%",
                  marginLeft: "1%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
                <i
                  className="fas fa-exclamation-circle text-danger"
                  style={{ fontSize: 50 }}
                ></i>
                <text
                  className="text-danger"
                  style={{ marginLeft: "3%", fontWeight: 900 }}
                >
                  It looks like you've ran out of the amount of jobs you can
                  view. Sign up for FREE to view as many jobs as you want now!
                </text>
              </div>
            )}
            <div className="mb-4">
              <img
                src="/content/svg/ws-icon.svg"
                alt="WorkSchool Icon"
                style={{ maxWidth: "4rem" }}
                className="img-fluid mb-3"
              />
              <h2>Sign up</h2>
              <p className="text-primary" style={{ fontWeight: 600 }}>
                We're excited to have you join our community of workschoolers.
                <text className="text-primary" style={{ fontWeight: 400 }}>
                  {" "}
                  To help you get started on your journey, we just need some
                  basic info.
                </text>
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="badge bg-primary"
                  style={{
                    height: "80%",
                    alignSelf: "center",
                    marginRight: "2%",
                  }}
                >
                  <i class="fas fa-binoculars" style={{ color: "white" }}></i>
                </span>
                <text className="text-muted" style={{ display: "block" }}>
                  Discover over <strong>15,000</strong> courses from leading
                  course providers like Treehouse, SkillShare, and more.
                </text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="badge bg-primary"
                  style={{
                    height: "80%",
                    alignSelf: "center",
                    marginRight: "2%",
                  }}
                >
                  <i class="far fa-bookmark" style={{ color: "white" }}></i>
                </span>
                <text
                  className="text-muted"
                  style={{ display: "block", marginTop: "2%" }}
                >
                  Use our search engine and bookmark courses that you want to
                  save for later.
                </text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="badge bg-primary"
                  style={{
                    height: "80%",
                    alignSelf: "center",
                    marginRight: "2%",
                  }}
                >
                  <i className="fas fa-suitcase" style={{ color: "white" }}></i>
                </span>
                <text
                  className="text-muted"
                  style={{ display: "block", marginTop: "2%" }}
                >
                  Search, compare, and apply to your dream job all in one place
                  with our new Job Portal
                </text>
              </div>
            </div>
            <Form className="form-validate" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name" className="form-label">
                  Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="your name"
                  autoComplete="off"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="mobile" className="form-label">
                  Mobile
                </Label>
                <Input
                  name="mobile"
                  id="mobile"
                  type="mobile"
                  placeholder="Mobile"
                  required
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email" className="form-label">
                  Email Address
                </Label>
                <Input
                  name="username"
                  id="email"
                  type="email"
                  placeholder="name@address.com"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="password" className="form-label">
                  Password
                </Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button size="lg" color="secondary" block>
                Sign up
              </Button>
              <hr className="my-4" />
              <p className="text-center">
                <small className="text-muted text-center">
                  Already have an account?&nbsp;
                  <Link href={`/login-course/${id}`}>
                    <a>Login</a>
                  </Link>
                </small>
              </p>
            </Form>
            <Link href="/">
              <a className="close-absolute mr-md-5 mr-xl-6 pt-5">
                <svg class="svg-icon w-3rem h-3rem">
                  <use xlinkHref="/content/svg/orion-svg-sprite.svg#close-1" />
                </svg>
              </a>
            </Link>
          </div>
        </Col>
        <Col md="4" lg="6" xl="7" className="d-none d-md-block">
          <div
            style={{
              backgroundImage:
                "url(/content/img/illustration/undraw_trip_dv9f.svg)",
            }}
            className="bg-cover h-100 mr-n3"
          />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};
