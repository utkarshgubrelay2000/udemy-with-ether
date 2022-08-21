import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import data from '../data/course-guide.json';
import courseGuide from '../../public/content/img/course-guide/course-guide.jpg';
import courseGuide2 from '../../public/content/img/course-guide/course-guide-2.jpg';
import AnalyticsService from '../services/AnalyticsService';

export async function getStaticProps() {
    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            loggedUser: true,
            title: "Course Guide"
        },
    }
}

export default () => {
    useEffect(() => {
      AnalyticsService.logPageView(window.location.pathname + window.location.search);
    });
    return (
        <React.Fragment>
            <ProgressBar progress={0} />
            <section className="py-5 py-lg-7">
                <Container>
                  <Row>
                    <Col lg="12">
                      <p className="h1 mb-5 mx-auto text-center">
                        Welcome to your Course-Guide!
                      </p>
                    </Col>
                  </Row>
                    <Row>
                        <Col lg="7">
                            <p className="text-secondary" style={{ marginTop: '15%', fontSize: 25, fontWeight: 600 }}>
                                {data[0].title}
                                <text className="text-muted" style={{ marginTop: '15%', fontSize: 25, fontWeight: 400 }}>
                                  {" " + data[0]["secondary-title"]}
                                </text>
                            </p>
                           
                            <br></br>
                            <div dangerouslySetInnerHTML={{
                                __html: data[0].content
                            }} />
                        </Col>
                        <Col lg="5" className="ml-auto align-items-center">
                            <img src={courseGuide} alt="" style={{ width: "400px", borderRadius: 5, marginTop: '5%', marginLeft: '12%' }}
                                className="img-fluid" />
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col lg="5">
                      <img src={courseGuide2} alt="" style={{ width: "400px", borderRadius: 5, marginBottom: 10, marginRight: '5%' }}
                                className="img-fluid" />
                      </Col>
                      <Col lg="7">
                        <p className="text-secondary" style={{ marginTop: '15%', fontSize: 25, fontWeight: 600 }}>
                            {data[0].paragraph}
                            <text className="text-secondary" style={{ marginTop: '15%', fontSize: 25, fontWeight: 600 }}>
                              {data[0]["paragraph-1"]}
                            </text>
                            <text className="text-secondary" style={{ marginTop: '15%', fontSize: 25, fontWeight: 600 }}>
                              {data[0]["paragraph-2"]}
                            </text>
                            <text  className="text-secondary" style={{ marginTop: '15%', fontSize: 25, fontWeight: 600 }}>
                              {data[0]["paragraph-3"]}
                            </text>
                            <text className="text-muted" style={{ fontWeight: 400 }}>
                              {data[0]["paragraph-4"]}
                            </text>
                        </p>
                        <br></br>
                        <p className="subtitle text-primary">
                                {data[0].subtitle}
                            </p>
                            <br></br>
                        <p className="mb-5 mb-lg-0">
                                <Link href="course-guide-step-one" passHref>
                                    <Button color="primary" style={{ width: 150 }}>
                                        {data[0].button}
                                    </Button>
                                </Link>
                            </p>
                      </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment >
    )
}
