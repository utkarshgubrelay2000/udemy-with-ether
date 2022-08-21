import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import ListingForm from '../components/ListingForm';
import data from '../data/course-guide.json';
import courseGuideStepOneTwo from '../../public/content/img/course-guide/course-guide-step-1-2.jpg';
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
            title: "Course Guide - step one",
            listingForm: true
        },
    }
}

export default () => {
    const [ searchKey, setSearchKey ] = useState("");
    useEffect(() => {
      AnalyticsService.logPageView(window.location.pathname + window.location.search);
    });

    return (
        <React.Fragment>
            <ProgressBar progress={30} />
            <section className="py-5">
              <Container>
                <Row>
                  <Col>
                    <p className="subtitle text-primary">
                        {data[1].subtitle}
                    </p>
                    <h1 className="h1 mb-5">
                        {data[1].title}
                        <span className="text-muted float-right">Step 1/3</span>
                    </h1>
                    <Row>
                      <Col lg="7">
                        <h1 className="h2 mb-5 text-primary" style={{ marginTop: '15%' }}>
                          {data[1].paragraph}
                          <text className="text-muted" style={{ fontWeight: 400 }}>
                            {" " +data[1]["paragraph-2"]}
                          </text>
                        </h1>
                      </Col>
                      <Col>
                        <img
                          src={courseGuideStepOneTwo}
                          className="img-fluid embed-responsive-item"
                          style={{ borderRadius: 5, marginBottom: '10%' }}
                        />
                      </Col>
                    </Row>
                    <ListingForm
                        data={data[1]}
                        nextStep={`/course-guide-step-two?searchKey=${searchKey}`}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                    />
                  </Col>
                </Row>
               
              </Container>
            </section>
        </React.Fragment>
    );
}
