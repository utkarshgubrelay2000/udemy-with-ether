import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProgressBar from '../components/ProgressBar';
import ListingForm from '../components/ListingForm';
import data from '../data/course-guide.json';
import { useRouter } from 'next/router';
import courseGuideThree from '../../public/content/img/course-guide/course-guide-step-3-2.jpg';
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
            title: "Course Guide - step three",
            listingForm: true
        },
    }
}

export default () => {
  const router = useRouter();
  const [maxHours, setMaxHours] = useState("any");
  const [minHours, setMinHours] = useState("any");
  const [searchKey, setSearchKey] = useState("");
  const [costStructure, setCostStructure] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  useEffect(() => {
    if (router.query.searchKey) {
      setSearchKey(router.query.searchKey);
    }

    if (router.query.costStructure) {
      setCostStructure(router.query.costStructure);
    }
  }, []);

  useEffect(() => {
    AnalyticsService.logPageView(window.location.pathname + window.location.search);
  });

  const courseDurationMapping = {
    "<1": [4],
    '1-3': [4, 12],
    "3-6": [12, 24],
    "6>": [24]
  }  

  const calculateMaxHours = (courseDuration, maxHours) => {
    if (courseDuration === "") {
      return;
    }
    if (courseDurationMapping[courseDuration].length == 1) {
      return maxHours * courseDurationMapping[courseDuration][0];
    } else {
      return maxHours * courseDurationMapping[courseDuration][1];
    }
  };
  
  const calculateMinHours = (courseDuration, minHours) => {
    if (courseDuration === "") {
      return;
    }
    return minHours * courseDurationMapping[courseDuration][0];
  }

    return (
      <React.Fragment>
        <ProgressBar progress={90} />
        <section className="py-5">
          <Container>
            <p className="subtitle text-primary">
                {data[3].subtitle}
            </p>
            <h1 className="h2 mb-5">
              <div style={{ width: '70%' }}>
                  {data[3].title}
              </div>
              <span className="text-muted float-right">Step 3/3</span>
            </h1>
            <br></br>
            <br></br>
            <Row>
              <Col lg="6">
                <h1 className="h2 mb-5 text-primary" style={{ marginTop: '10%' }}>
                  {data[3].paragraph}
                  <text className="text-muted" style={{ marginTop: '15%', fontWeight: 400 }}>
                    {" " + data[3]["paragraph-2"]}
                  </text>
                </h1>
              </Col>
              <Col lg="5">
                <img
                  src={courseGuideThree}
                  className="img-fluid embed-responsive-item"
                  style={{ borderRadius: 15, marginTop: '10%', marginBottom: '15%', marginLeft: '21%' }}
                />
              </Col>
            </Row>
            <ListingForm
                data={data[3]}
                nextStep={`/catalog?guided=true&${maxHours !== "any" ? "maxHours=" + calculateMaxHours(courseDuration, maxHours) : ""}&${minHours !== "any" ? "minHours=" + calculateMinHours(courseDuration, minHours) : ""}&costStructure=${costStructure}&searchKey=${searchKey}`}
                maxHours={maxHours}
                minHours={minHours}
                setMaxHours={setMaxHours}
                setMinHours={setMinHours}
                courseDuration={courseDuration}
                setCourseDuration={setCourseDuration}
                lastStep={true}
            />
          </Container>
        </section>
      </React.Fragment>
    )
}
