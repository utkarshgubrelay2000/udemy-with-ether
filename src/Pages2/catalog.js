import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import { useRouter } from "next/router";
import Select from "react-select";
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
import ResultsTopBar from "../components/ResultsTopBar";
import CardCourse from "../components/CardCourse";
import LoadingCard from "../components/LoadingCard";
import Pagination from "@material-ui/lab/Pagination";
import CourseManagerService from "../services/CourseManagerService";
import AnalyticsService from "../services/AnalyticsService";
import Head from 'next/head';

import {
  subjectDropdownOptions,
  lengthDropdownOptions,
  providerDropdownOptions,
  costStructureDropdownOptions
} from "../constants/options";

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Catalog",
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
  const [postsPerPage] = useState(12);
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

  const lastVisited = (typeof window !== "undefined") ? 
    Number(window.localStorage.getItem('lastVisited')) : 1; 

  /**Pagination parameters */
  const pagesCount = Math.ceil(courses.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
		loading && setCurrentPage(lastVisited);
	}, [loading, setCurrentPage, lastVisited]);

  useEffect(() => {
    AnalyticsService.logPageView(window.location.pathname + window.location.search);
  });

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
    getCourses();
  };

  useEffect(() => {
    setLoading(true);
    let routerSearchKey = null;
    let routerProvider = null;
    let routerSubject = null;
    let routerCostStructure = null;

    if (router.query.searchKey) {
      routerSearchKey = router.query.searchKey;
      setSearchKey(routerSearchKey);
    }

    if (router.query.provider) {
      routerProvider = router.query.provider;
      setProvider(providerDropdownOptions.find((el) => el.value === routerProvider));
    }

    if (router.query.guided) {
      setGuided(true);
    }

    if (router.query.maxHours) {
      setMaxHours(router.query.maxHours);
    }

    if (router.query.minHours) {
      setMinHours(router.query.minHours);
    }

    if (router.query.costStructure &&
      router.query.costStructure === "free" ||
      router.query.costStructure === "subscription" ||
      router.query.costStructure === "certificate") {
      routerCostStructure = router.query.costStructure;
      setCostStructure(router.query.costStructure);
    }

    if (router.query.interests && router.query.costStructure) {
      (async () => {
        let interests = router.query.interests;
        let costStructure = router.query.costStructure;

        try {
          let params = {};
          let coursesFound = [];
    
          params["limit"] = 10;

          if (costStructure !== "") {
            params["costStructure"] = costStructure;
          }
    
          if (interests.length > 0) {
            for (let i = 0; i < interests.length; i++) {
              params["searchKey"] = interests[i];
              const courses = await CourseManagerService.getCourses(params);
              if (courses.length > 0) {
                coursesFound = coursesFound.concat(courses);
              }
            }  
          }

          if (coursesFound.length > 0) {
            setCourses(coursesFound)
          } else {
            setCourses([]);
          }
        } catch (error) {
          // console.log(error);
        } finally {
          setLoading(false);
          return;
        }
      })();
      return;
    }

    if (router.query.subject) {
      routerSubject = router.query.subject;
      setSubject(subjectDropdownOptions.find((el) => el.value === routerSubject));
    }

    resetDropdowns();

    if (routerSearchKey || routerProvider || routerSubject || routerCostStructure) {
      getCourses(false, routerSearchKey, routerProvider, routerSubject, routerCostStructure);
    } else if (router.query.all && Boolean(router.query.all) || router.query.guided) {
      setSearchKey("");
      setResultSearchKey("");
      getCourses(true);
    }
  }, [router]);

  const getCourses = async (all = false, routerSearchKey, routerProvider, routerSubject, routerCostStructure) => {
    try {
      const params = {};
      if (minHours && minHours !== "All") params["minHours"] = minHours;
      if (maxHours && maxHours !== "All") params["maxHours"] = maxHours;
      if (routerSearchKey && all === false) {
        params["searchKey"] = routerSearchKey;
        setResultSearchKey(routerSearchKey);
      } else if (searchKey && all === false) {
        params["searchKey"] = searchKey;
        setResultSearchKey(searchKey);
      } else if (searchKey === "" && all === false) {
        setResultSearchKey("");
      }

      if (routerProvider) {
        params["provider"] = routerProvider;
      } else if (provider && provider.value !== "All") {
        params["provider"] = provider.value;
      }

      if (routerSubject) {
        params["subject"] = routerSubject;
      } else if (subject && subject.value !== "All") {
        params["subject"] = subject.value;
      }

      if (routerCostStructure) {
        params["costStructure"] = routerCostStructure;
      } else if (costStructure && costStructure.value !== "All") {
        params["costStructure"] = costStructure.value;
      }

      // console.log(params);

      const courses = await CourseManagerService.getCourses(params);

      // console.log("courses received: ", courses);

      if (!courses) {
        setCourses([]);
        return;
      }

      setCourses(courses);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const resetDropdowns = () => {
    setSubject(subjectDropdownOptions[0]);
    setMinHours(lengthDropdownOptions[0].value);
    setMaxHours(lengthDropdownOptions[0].value);
    setLength(lengthDropdownOptions[0]);
    setProvider(providerDropdownOptions[0]);
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    window.localStorage.setItem('lastVisited', index);
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

  return (
    <React.Fragment>
      <Head>
        <title>Course Catalog: Search, compare, and take among 16,000+ online courses!</title>
        <meta name="description" content="Course Catalog"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta property="og:title" content="Course catalog: Search, compare, and take courses to have a competitive edge!" />
        <meta property="og:description" content="Search and compare 16,000+ online courses from different course providers in one place" />
        <meta property="og:image" content="https://open-graph-images.s3.amazonaws.com/courses.png" />
      </Head>
      <Container fluid className="py-5 px-lg-5">
        <Row>
          <Col lg="3" className="pt-3">
            <Form className="pr-xl-3" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label for="form_search" className="form-label">
                  Keyword <text style={{ fontSize: 10 }}>(search by universities, topics, skills, etc.)</text>
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
              <div className="mb-4">
                <Label for="form_subject" className="form-label">
                  Subject
                </Label>
                <Select
                  name="subject"
                  id="form_subject"
                  options={subjectDropdownOptions}
                  value={subject}
                  isSearchable
                  className="form-control dropdown bootstrap-select"
                  classNamePrefix="selectpicker"
                  onChange={(e) => handleChange(e, setSubject)}
                />
              </div>
              <div className="mb-4">
                <Label for="form_subject" className="form-label">
                  Cost structure
                </Label>
                <Select
                  name="subject"
                  id="form_subject"
                  options={costStructureDropdownOptions}
                  value={costStructure}
                  isSearchable
                  className="form-control dropdown bootstrap-select"
                  classNamePrefix="selectpicker"
                  onChange={(e) => handleCostStructureChange(e, setCostStructure)}
                />
              </div>
              <div className="mb-4">
                <Label for="form_length" className="form-label">
                  Length
                </Label>
                <div>
                  <Select
                    name="length"
                    id="form_length"
                    options={lengthDropdownOptions}
                    value={length}
                    isSearchable
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                    onChange={(e) => handleChangeLengthOptions(e)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label for="form_length" className="form-label">
                  Provider
                </Label>
                <div>
                  <Select
                    name="provider"
                    id="form_length"
                    options={providerDropdownOptions}
                    value={provider}
                    isSearchable
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                    onChange={(e) => handleProviderChange(e, setProvider)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Button type="submit" color="primary">
                  <i className="fas fa-search mr-1" />
                  Search
                </Button>
              </div>
            </Form>
          </Col>
          <Col lg="9">
            <ResultsTopBar
              searchKey={resultSearchKey}
              subject={subjectResult}
              provider={providerResult}
              length={lengthResult}
              costStructure={costStructureResults}
              results={
                errorMessage
                  ? 0
                  : filteredCourses.length
                  ? filteredCourses.length
                  : courses.length
              }
            />
            <Row>
              {loading ? (
                [...Array(postsPerPage)].map((el, index) => (
                  <Col key={index} sm="6" xl="4" className="mb-5 hover-animate">
                    <LoadingCard />
                  </Col>
                ))
              ) : errorMessage ? (
                <p>{errorMessage}</p>
              ) : filteredCourses.length ? (
                filteredCourses
                  ?.slice(indexOfFirstPost, indexOfLastPost)
                  .map((course) => (
                    <Col key={course.id} className="mb-5 hover-animate">
                      <CardCourse course={course} handleError={handleError} />
                    </Col>
                  ))
              ) : (
                courses
                  ?.slice(indexOfFirstPost, indexOfLastPost)
                  .map((course) => (
                    <Col
                      key={course.id}
                      sm="6"
                      xl="4"
                      className="mb-5 hover-animate"
                    >
                      <CardCourse course={course} handleError={handleError} />
                    </Col>
                  ))
              )}
            </Row>
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
