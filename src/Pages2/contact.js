import React from "react"

import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap"

import data from "../data/contact.json"
import Image from "../components/CustomImage"
import Icon from "../components/Icon"
import Map from "../components/Map"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Contact",
    },
  }
}

const Contact = () => {
  return (
    <React.Fragment>
      <section className="hero py-6 py-lg-7 text-white dark-overlay">
        {data.img && (
          <Image
            src={`/content/img/photo/${data.img}`}
            alt={data.title}
            className="bg-image"
            loading="eager"
            layout="fill"
          />
        )}
        <Container className="overlay-content">
          <Breadcrumb listClassName="text-white justify-content-center no-border mb-0">
            <BreadcrumbItem>
              <Link href="/">
                <a>Home</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{data.subtitle}</BreadcrumbItem>
          </Breadcrumb>

          <h1 className="hero-heading">{data.title}</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            {data.address && (
              <Col md="4" className="text-center text-md-left mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon
                    icon="map-location-1"
                    className="w-2rem h-2rem text-primary"
                  />
                </div>
                <h3 className="h5">{data.address.title}</h3>
                <p className="text-muted">
                  {data.address.row1}
                  <br />
                  {data.address.row2}
                  <br />
                  <span
                    dangerouslySetInnerHTML={{ __html: data.address.row3 }}
                  />
                </p>
              </Col>
            )}
            {data.callcenter && (
              <Col md="4" className="text-center text-md-left mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon icon="mail-1" className="w-2rem h-2rem text-primary" />
                </div>
                <h3 className="h5">{data.callcenter.title}</h3>
                <p className="text-muted">{data.callcenter.content}</p>
                <p className="text-muted">
                  <strong>{data.callcenter.phone}</strong>
                </p>
              </Col>
            )}
            {data.electronicsupport && (
              <Col md="4" className="text-center text-md-left mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon
                    icon="map-location-1"
                    className="w-2rem h-2rem text-primary"
                  />
                </div>
                <h3 className="h5">{data.electronicsupport.title}</h3>
                <p className="text-muted">{data.electronicsupport.content}</p>
                <ul className="list-unstyled text-muted">
                  {data.electronicsupport.emails.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <section className="py-6 bg-gray-100">
        <Container>
          <h2 className="h4 mb-5">Contact form</h2>
          <Row>
            <Col md="7" className="mb-5 mb-md-0">
              <Form>
                <div className="controls">
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="name" className="form-label">
                          Your First Name *
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your first name"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="surname" className="form-label">
                          Your Last Name *
                        </Label>
                        <Input
                          type="text"
                          name="surname"
                          id="surname"
                          placeholder="Enter your last name"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="email" className="form-label">
                      Your email *
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="message" className="form-label">
                      Your message for us *
                    </Label>
                    <Input
                      type="textarea"
                      rows="4"
                      name="message"
                      id="message"
                      placeholder="Enter your message"
                      required
                    />
                  </FormGroup>
                  <Button type="submit" color="outline-primary">
                    Send message
                  </Button>
                </div>
              </Form>
            </Col>
            <Col md="5">
              <div className="pl-lg-4">
                {data.content && (
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                )}
                {data.social && (
                  <div className="social">
                    <ul className="list-inline">
                      {data.social.map((icon) => (
                        <li key={icon.icon} className="list-inline-item">
                          <a href={icon.link} target="_blank">
                            <i className={`fab fa-${icon.icon}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="map-wrapper-300">
        <Map
          className="h-100"
          center={[40.732346, -74.0014247]}
          markerPosition={[40.732346, -74.0014247]}
          zoom={16}
        />
      </div>
    </React.Fragment>
  )
}

export default Contact
