import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import ListingForm from '../components/ListingForm';
import data from '../data/course-guide.json';
import { useRouter } from 'next/router';
import courseGuideTwo from '../../public/content/img/course-guide/course-guide-2-2.jpg';

export async function getStaticProps() {

    return {
        props: {
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            loggedUser: true,
            title: "Course Guide - step two",
            listingForm: true
        },
    }
}

export default () => {
    const router = useRouter();
    const [costStructure, setCostStructure] = useState("");
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
      if (router.query.searchKey) {
        setSearchKey(router.query.searchKey);
      }
    });

    return (
        <React.Fragment>
          <ProgressBar progress={60} />
          <section className="py-5">
            <Container>
              <p className="subtitle text-primary">
                  {data[2].subtitle}
              </p>
              <h1 className="h2 mb-5">
                <div style={{ width: '65%' }}>
                    {data[2].title}
                </div>
                <span className="text-muted float-right">Step 2/3</span>
              </h1>
              <Row>
                <Col lg="6">
                  <h1 className="h2 mb-5 text-primary" style={{ marginTop: '35%' }}>
                    {data[2].paragraph}
                    <text className="text-muted" style={{ fontWeight: 400 }}>
                      {" " + data[2]["paragraph-2"]}
                    </text>
                  </h1>
                </Col>
                <Col>
                  <img
                    src={courseGuideTwo}
                    className="img-fluid embed-responsive-item"
                    style={{ borderRadius: 5, marginBottom: '15%', marginLeft: '15%' }}
                  />
                </Col>
              </Row>
                <ListingForm
                    data={data[2]}
                    nextStep={`/course-guide-step-three?searchKey=${searchKey}&costStructure=${costStructure}`}
                    costStructure={costStructure}
                    setCostStructure={setCostStructure}
                />
            </Container>
          </section>
        </React.Fragment>
    );
}
