import React, { useState } from "react"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Alert,
} from "reactstrap"
import data from "../data/knowledge-base.json"
import datas from "../data/knowledge-base2.json"
import Link from "next/link"
import AuthenticationService from "../services/AuthenticationService";

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Knowledge base",
    },
  }
}



const KnowledgeBase = () => {
  const [email, setEmail] = useState("")
  const [modal, setModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState()

  const toggle = () => setModal(!modal);

  const dismissError = () => {
    setSuccessMessage("Enrolled – Stay tuned to your inbox for news and updates from us!");
    setMessageVisible(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userData = {};
    userData["name"] = "";
    if (email) userData["email"] = email;
    const resp = await AuthenticationService.saveUnregisteredUser(userData);
    if (resp) {
      Alert("")
    }
  }
  return (
    <React.Fragment>
      <section>
      <div className="news">
        <Container>
          <Row>
            <Col>
              {/* <img src={imagenews} alt="imagenews" width="500px" height="700px" /> */}
              <div className="imagenews"></div>
            </Col>
            <Col style={{ marginLeft: "5%" }}>
              <h1 className="title-heading">STAY IN THE KNOW</h1>
              <p className="title-ptag">
                Sign up for our weekly newsletter to get access to all the
                latest online business tips, events, creator inspiration, and
                more.
              </p>
              <form onSubmit={handleFormSubmit}>
                <div className="button-terms">
                  <div style={{ marginTop: "2.5%" }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email here"
                      className="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="newsletter-btn">
                      Submit
                    </button>
                  </div>
                </div>
                <p className="terms-ptag">
                  By submitting your email address, you agree to Workschool's{" "}
                  <a
                    href="#"
                    style={{ color: "white", textDecoration: "underline" }}
                  >
                    Terms of use
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    style={{ color: "white", textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      </section>
      <section>
        <Container>
          <h2 className=" pt-lg-0 mt-4 mb-5">Featured Stories</h2>
          <Row className=" pt-lg-0 mt-lg-n5 mb-5">
            {data.blocks.map((block, index) => (
              <Col key={index} lg="4" className="mb-3 mb-lg-0 text-center">
                <Card className="border-0 shadow-sm hover-animate h-100">
                  <CardBody className="p-4">
                    <img src={block.img} style={{width: "100%"}} />
                    <h3 className="h5 mt-3 text-secondary">{block.name}</h3>
                    <p className="text-muted text-sm mb-0">{block.text}</p>
                    <Link
                      href="/Newsletter-topic/[slug]"
                      as={`/Newsletter-topic/${block.slug}`}
                    >
                      <a className="stretched-link">
                        <span className="sr-only">See Topic</span>
                      </a>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col md="8">
              <p className="subtitle text-secondary">
                What do you need to know?
              </p>
              <h2>Choose Your Stories</h2>
            </Col>
            <Col
              md="4"
              className="d-lg-flex align-items-center justify-content-end"
            >
              <a className="text-muted text-sm" href="#">
                See all stories
                <i className="fas fa-angle-double-right ml-2" />
              </a>
            </Col>
          </Row>
          <Row>
          {datas.topics.map((topic, index) => (
            <Col key={index} lg="6">
              <Link
                href="/Newsletter-topics/[slug]"
                as={`/Newsletter-topics/${topic.slug}`}
              >
                <a style={{ textDecoration: 'none' }}>
                  <div className="topic-section border-3 mb-5">
                    <div style={{width: "50%"}}>
                      <img src={topic.img} style={{width: "100%", borderRadius: "5%"}} />
                    </div>
                    <div className="ml-4" style={{width: "50%"}}>
                      <h6 className="text-primary text-secondary">{topic.name} </h6>
                      <p style={{fontSize: "14px"}}>{topic.text}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </Col>
          ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default KnowledgeBase;
