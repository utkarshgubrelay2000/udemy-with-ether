import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import JobResultsBar from "../components/JobResultsBar";
import Pagination from "@material-ui/lab/Pagination";
import AnalyticsService from "../services/AnalyticsService";
import { JobsData } from '../data/mock-jobs';
import {
  subjectDropdownOptions,
  lengthDropdownOptions,
  providerDropdownOptions,
  costStructureDropdownOptions
} from "../constants/options";
import JobCard from '../components/JobCard';
import Head from 'next/head';
import { Cookies } from 'react-cookie';
import HTMLParser from 'html-react-parser';

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Job Portal",
    },
  };
}

export default () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [resultSearchKey, setResultSearchKey] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [subject, setSubject] = useState(subjectDropdownOptions[0]);
  const [minHours, setMinHours] = useState("All");
  const [maxHours, setMaxHours] = useState("All");
  const [length, setLength] = useState(lengthDropdownOptions[0]);
  const [errorMessage, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(providerDropdownOptions[0]);
  const [guided, setGuided] = useState(false);
  const [costStructure, setCostStructure] = useState(costStructureDropdownOptions[0]);
  const [subjectResult, setSubjectResult] = useState("");
  const [providerResult, setProviderResult] = useState("");
  const [lengthResult, setLengthResult] = useState("");
  const [costStructureResults, setCostStructureResults] = useState("");
  const [selectedJob, setSelectedJob] = useState(JobsData[0]);
  const [jobs, setJobs] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cookies = new Cookies();

  useEffect(() => {
    document.getElementsByTagName('body')[0].style = 'overflow: hidden';
    return () => {
      document.getElementsByTagName('body')[0].style = 'overflow: visible !important';
    }
  }, []);

  useEffect(() => {
    AnalyticsService.logPageView(window.location.pathname + window.location.search);
  });

  /**Pagination parameters */
  const pagesCount = Math.ceil(courses.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handleChange = (e, useStateHook) => {
    useStateHook(subjectDropdownOptions.find((el) => el.value === e.value));
  };

  const handleProviderChange = (e, useStateHook) => {
    useStateHook(providerDropdownOptions.find((el) => el.value === e.value));
  };

  const handleCostStructureChange = (e, useStateHook) => {
    useStateHook(costStructureDropdownOptions.find((el) => el.value === e.value));
  };

  const handleChangeLengthOptions = (e) => {
    setMinHours(e.value.minHours ? e.value.minHours : e.value);
    setMaxHours(e.value.maxHours ? e.value.maxHours : e.value);
    const lengthOption = lengthDropdownOptions.find((el) => {
      if (e.value.minHours && e.value.maxHours) {
        return (
          el.value.minHours === e.value.minHours &&
          el.value.maxHours === e.value.maxHours
        );
      } else {
        return el.value === e.value && el.value === e.value;
      }
    });
    setLength(
      lengthOption !== undefined ? lengthOption : lengthDropdownOptions[0]
    );
  };

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubjectResult(subject);
    setProviderResult(provider);
    setLengthResult(length);
    setCostStructureResults(costStructure);
  };

  useEffect(() => {
    setJobs(JobsData);
  }, []);

  const resetDropdowns = () => {
    setSubject(subjectDropdownOptions[0]);
    setMinHours(lengthDropdownOptions[0].value);
    setMaxHours(lengthDropdownOptions[0].value);
    setLength(lengthDropdownOptions[0]);
    setProvider(providerDropdownOptions[0]);
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
    AnalyticsService.setEvent("User", "Pagination page click", 
    "Pagination Navigation Catalog Page");
  };

  const dismissError = () => {
    setError("");
    setErrorVisible(false);
  };

  const handleError = (msg) => {
    setError(msg);
    setErrorVisible(true);
  };

  const handleMouseEnterCard = (setCard) => {
    setCard(true);
  }

  const handleMouseLeaveCard = (setCard) => {
    setCard(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    let filteredJobs = JobsData.filter(job => job.title.toLowerCase().includes(searchKey));
    filteredJobs = filteredJobs.map(job => <JobCard job={job} setSelectedJob={setSelectedJob} />)
    setJobs(filteredJobs);
  }

  useEffect(() => {
    if (router.query.searchKey) {
      setSearchKey(router.query.searchKey);
      let filteredJobs = JobsData.filter(job => job.title.toLowerCase().includes(router.query.searchKey));
      filteredJobs = filteredJobs.map(job => <JobCard job={job} setSelectedJob={setSelectedJob} />)
      setJobs(filteredJobs);
    }
  }, []);

  const handleApplyNowButtonAction = (jobLink) => {
    let visitedCount = cookies.get("__shibaInuDogi");

    if (typeof visitedCount === "undefined") {
      cookies.set("__shibaInuDogi", 1);
      window.open(jobLink, '_blank')
      return;
    }

    if (isAuthenticated || visitedCount < 3) {
      if (visitedCount) {
        visitedCount++;
        cookies.set("__shibaInuDogi", visitedCount);
      }
      window.open(jobLink, '_blank')
    } else {
      router.push({
        pathname: '/signup',
        query: {
          jobRedirect: true,
        }
      })
    }
  }

  return (
    <React.Fragment>
       <Head>
          <title>Jobs Portal: Search, compare, and apply to get hired!</title>
          <meta name="description" content="homepage"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta property="og:title" content="Jobs Portal: Search, compare, and apply to jobs to get hired!" />
          <meta property="og:description" content="Browse jobs online across different industries and land a job today." />
          <meta property="og:image" content="https://open-graph-images.s3.amazonaws.com/job-portal-image.png" />
        </Head>
      <Container fluid className="pt-5" style={{ maxHeight: '100vh'}}>
        <Row style={{ maxHeight: '100vh' }}>
          <Col lg="1">
          </Col>
          <Col lg="4" style={{ marginLeft: '5%'}}>
            <div>
                <Label for="form_search" className="form-label">
                  Keyword <text style={{ fontSize: 10 }}>(search by job title, company, etc.)</text>
                </Label>
                <div className="input-label-absolute input-label-absolute-right">
                  <div className="label-absolute">
                    <i className="fa fa-search" />
                  </div>
                  <Input
                    type="search"
                    name="search"
                    placeholder="Keywords"
                    id="form_search"
                    className="pr-4"
                    value={searchKey}
                    onChange={handleSearchKeyChange}
                  />
                </div>
              </div>
              <div className="mb-4" style={{ margin: '0 auto', marginTop: '4%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Button type="submit" color="primary" onClick={handleSearchSubmit} style={{ height: '80%' }}>
                  <i className="fas fa-search mr-1" />
                  Search
                </Button>
                <JobResultsBar
                  searchKey={resultSearchKey}
                  subject={subjectResult}
                  provider={providerResult}
                  length={lengthResult}
                  costStructure={costStructureResults}
                  results={
                    errorMessage
                      ? 0
                      : jobs.length
                      ? jobs.length
                      : jobs.length
                  }
                />
              </div>
            <Form className="pr-xl-3" style={{ overflowY: 'scroll', maxHeight: '100vh', height: '58%', paddinRight: '10%', }}>
              {
                jobs && jobs.map((job, index) => {
                  return (
                    <JobCard key={index} job={job} setSelectedJob={setSelectedJob} />
                  );
                }) 
              }
              {
                !jobs && JobsData.map((job, index) => {
                  return (
                    <JobCard key={index} job={job} setSelectedJob={setSelectedJob} />
                  );
                })
              }
              <Pagination
                className="my-3"
                count={pagesCount}
                page={currentPage}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                showFirstButton="true"
                showLastButton="true"
                color="primary"
                size="large"
                onChange={handlePageClick}
              />
            </Form>
          </Col>
          <Col lg="5">
            <div style={{ overflowY: 'scroll', maxHeight: '85vh', height: '100%', }}>
              <h2>{selectedJob.title}</h2>
              <div>
                <span>{selectedJob.company} </span>
                <span>&#183;</span>
                <span> {selectedJob.location} </span>
                <Button
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      onClick={() => handleApplyNowButtonAction(selectedJob.link)}
                      style={{
                        marginLeft: 50,
                      }}
                    >
                      Apply now
                  </Button>
                {
                  selectedJob.payRange &&
                    <div>
                      <span>{selectedJob.payRange}</span>
                    </div>
                }
                {
                  selectedJob.postDate &&
                  <div>
                    <span>{selectedJob.postDate}</span>
                  </div>
                      
                }
             
                 
              </div>
              <br />
              <p className="text-muted font-weight-light">
                {HTMLParser(selectedJob.description)}
              </p>
              </div>
            {courses.length > 0 && (
              <Pagination
                className="my-3"
                count={pagesCount}
                page={currentPage}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                showFirstButton="true"
                showLastButton="true"
                color="primary"
                size="large"
                onChange={handlePageClick}
              />
            )}
          </Col>
          {/* <Col lg="3">
          </Col> */}
        </Row>
        <Modal
          isOpen={errorVisible}
          toggle={dismissError}
          className="text-center"
        >
          <ModalHeader className="border-0" toggle={dismissError}></ModalHeader>
          <ModalBody className="border-0">{error}</ModalBody>
          <ModalFooter className="border-0">
            <Button color="primary" onClick={dismissError}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </React.Fragment>
  );
};


/**

<Col lg="3">
            <div
                style={{ top: "100px" }}
                className="p-4 shadow ml-lg-4 rounded sticky-top"
              >
                <div className="text-muted">     
                  <div className="d-flex justify-content-between">
                    <span>Price: </span>
                    <span className="text-primary h4">
                   
                      </span>
                      </div>             
                    </div>
                    <hr className="my-4" />
                  </div>
              </Col>


*/
