import React from "react";
import Link from "next/link";
import { Container, Row, Col, Card, CardText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faFlask, faGraduationCap } from "@fortawesome/free-solid-svg-icons";



const Newsletter = () => {
  return (
    <>
      <div className="news">
        <Container>
          <Row>
            <Col>
              {/* <img src={imagenews} alt="imagenews" width="500px" height="700px" /> */}
              <div className="imagenews"></div>
            </Col>
            <Col style={{ marginLeft: "5%" }}>
              
            </Col>
          </Row>
        </Container>
      </div>

      {/* container for routing cards */}
      <Container>
        <Row>
          <Col xs="12" sm="4">
            <Link href="/knowledge-base">
              <a>
                <Card className="newsletter-card">
                  <CardText>
                    <FontAwesomeIcon
                      icon={faChartBar}
                      style={{
                        width: "23px",
                        color: "#E84791",
                        marginLeft: "45%",
                        marginTop: "7%",
                      }}
                    />
                    <h6 style={{ textAlign: "center", marginTop: "3%" }}>
                      Business
                    </h6>
                    <p style={{ textAlign: "center", padding: "3%" }}>
                      Get daily update and information about Business ideas and
                      processes
                    </p>
                  </CardText>
                </Card>
              </a>
            </Link>
          </Col>
          <Col xs="12" sm="4">
            <Link href="/knowledge-base">
              <a>
                <Card className="newsletter-card">
                  <CardText>
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      style={{
                        width: "30px",
                        color: "#E84791",
                        marginLeft: "45%",
                        marginTop: "7%",
                      }}
                    />
                    <h6 style={{ textAlign: "center", marginTop: "3%" }}>
                      Education
                    </h6>
                    <p style={{ textAlign: "center", padding: "3%" }}>
                      Keep in touch with the world through Education and
                      constant learning
                    </p>
                  </CardText>
                </Card>
              </a>
            </Link>
          </Col>
          <Col xs="12" sm="4">
            <Link href="/knowledge-base">
              <a>
                <Card className="newsletter-card">
                  <CardText>
                    <FontAwesomeIcon
                      icon={faFlask}
                      style={{
                        width: "23px",
                        color: "#E84791",
                        marginLeft: "45%",
                        marginTop: "7%",
                      }}
                    />
                    <h6 style={{ textAlign: "center", marginTop: "3%" }}>
                      Science
                    </h6>
                    <p style={{ textAlign: "center", padding: "3%" }}>
                      Get updated news about how rapidly the world is changing
                      with Science
                    </p>
                  </CardText>
                </Card>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
      {/* Container for iconsand writeup */}
      <Container>
        <h3 className="title-h3">
          Get a dose of enjoyable news about higher-education, tech, workforce,
          career, and jobs weekly. Stay informed and entertained, Discover for
          free:
        </h3>
        <Row>
          <Col xs="12" sm="4">
            <div className="col-div">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>How real Workschool creators are finding success</p>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <div className="col-div2">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>Helpful business tips geared toward online entrepreneurs</p>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <div className="col-div2">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>Upcoming Workschool events and promotions</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: "7%" }}>
          <Col xs="12" sm="4">
            <div className="col-div">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>The latest, most useful product releases at Workschool</p>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <div className="col-div2">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>
                  Insider strategies for building a profitable online business
                </p>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="4">
            <div className="col-div2">
              <div style={{ marginTop: "17px" }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ width: "23px", color: "#E84791" }}
                />
              </div>
              <div className="col-icon">
                <p>Exclusive discounts and partner perks</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Newsletter;
