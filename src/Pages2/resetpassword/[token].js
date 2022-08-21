import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from "reactstrap";1
import AuthenticationService from "../../services/AuthenticationService";
import Header from "../../components/Header";
import AnalyticsService from '../../services/AnalyticsService';

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const {token} = router.query;
    
    useEffect(() => {
      AnalyticsService.logPageView(window.location.pathname + window.location.search);
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const userData = {email, password, confirmPassword, token};

        const resp = await AuthenticationService.resetPassword(userData);
        if (resp) {
            router.push("/");
            AnalyticsService.setEvent("User", "Successful Submission", "Reset Password");
          } else {
            AnalyticsService.setEvent("User", "Failed Submission", "Reset Password Error");
        }
    };

    return (
        <Container fluid className="px-0" style={{ marginTop: "74px" }}>
          <Header />
          <Row className="min-vh-100 mx-0 overflow-hidden">
            <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
              <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                <div className="mb-4">
                  <img
                    src="/content/svg/ws-icon.svg"
                    alt="WorkSchool Icon"
                    className="img-fluid mb-3"
                  />
                  <h2>Reset Password</h2>
                  <p className="text-muted">
                    Enter your email and new password then confirm
                    your passoword.
                  </p>
                </div>
                <Form className="form-validate" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="email" className="form-label">
                      Email Address
                    </Label>
                    <Input
                      namee="email"
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
                  <FormGroup className="mb-4">
                    <Label for="password" className="form-label">
                      Confirm Password
                    </Label>
                    <Input
                      name="confirm password"
                      id="password"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button size="lg" color="primary" block>
                    Reset Password
                  </Button>
                  <hr className="my-4" />
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
        </Container>
      );
};
