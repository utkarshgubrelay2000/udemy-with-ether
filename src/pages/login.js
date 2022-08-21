import React, { useState, useEffect } from "react";
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
  CustomInput,
} from "reactstrap";
import AuthenticationService from "../services/AuthenticationService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnalyticsService from "../services/AnalyticsService";

export async function getStaticProps() {
  return {
    props: {
      title: "Sign in",
      hideHeader: true,
      hideFooter: true,
      noPaddingTop: true,
    },
  };
}

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };
    if (name) userData["name"] = name;
    const resp = await AuthenticationService.loginUser(userData);
    if (resp) {
      AnalyticsService.setEvent("User", "Successful Login", "Login");
      router.push("/");
    } else {
      AnalyticsService.setEvent("User", "Failed Login", "Login Error");
    }
  };

  useEffect(() => {
    AnalyticsService.logPageView(window.location.pathname + window.location.search);
  });

  return (
    <Container fluid className="px-0" style={{ marginTop: "74px" }}>
      <Header />
      <Row className="min-vh-100 mx-0 overflow-hidden">
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-5">
              <img
                src="/content/svg/ws-icon.svg"
                alt="WorkSchool Icon"
                style={{ maxWidth: "4rem" }}
                className="img-fluid mb-3"
              />
              <h2>Welcome back</h2>
            </div>
            <Form className="form-validate" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email" className="form-label">
                  Email Address
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@address.com"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Row>
                  <Col>
                    <Label for="password" className="form-label">
                      Password
                    </Label>
                  </Col>
                  <Col xs="auto">
                    <Link href="/forgotPassword">
                      <a>Forgot Password</a>
                    </Link>
                  </Col>
                </Row>
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
                Log in
              </Button>
              <hr className="my-4" />
              <p className="text-center">
                <small className="text-muted text-center">
                  Don't have an account yet?&nbsp;
                  <Link href="/signup">
                    <a>JOIN FOR FREE</a>
                  </Link>
                </small>
              </p>
            </Form>
            <Link href="/">
              <a className="close-absolute mr-md-5 mr-xl-6 pt-5">
                <svg className="svg-icon w-3rem h-3rem">
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
