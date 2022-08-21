import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../../utils/API_URL";

function view() {
  const router = useRouter();
  const { titleKey } = router.query;

  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);

  useEffect(async () => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await axios.get(
        `${API_URL}/getMyCourseById/61364e73d642fe00236c0526`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(res.data);
      setCourse(res.data.data);
      // setInstructor(res.data.instructor);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  }, []);

  const Row = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
      <li className="list-group-item px-0" onClick={() => setOpen(!open)}>
        {/* Toggle */}
        <a
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-controls="courseThree"
        >
          <div className="me-auto">
            {/* Title */}
            {item?.topicName}
          </div>
          {/* Chevron */}
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4" />
          </span>
        </a>
        {/* Row */}
        {/* Collapse */}
        <div
          className={open ? "collapse show" : "collapse"}
          id="courseThree"
          data-bs-parent="#courseAccordion"
        >
          <div className="pt-3 pb-2">
            {item?.SubTopic?.map((sub, idx) => {
              return (
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                  key={idx}
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-primary icon-sm rounded-circle me-2">
                      <i className="mdi mdi-play fs-4" />
                    </span>
                    <span>{sub.subTopicName}</span>
                  </div>
                  <div className="text-truncate">
                    <span>{sub.duration}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="new-course-detail watch-page">
      <div className="course-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Tab content */}
              <div className="tab-content content" id="course-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="course-intro"
                  role="tabpanel"
                  aria-labelledby="course-intro-tab"
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="mt-3">
                      <h3 className=" mb-0  text-truncate-line-2">
                        Introduction{" "}
                      </h3>
                    </div>
                    <div>
                      {/* Dropdown */}
                      <span className="dropdown">
                        <a
                          href="#"
                          className="ms-2 text-muted"
                          id="dropdownInfo"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fe fe-help-circle" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-lg p-3 dropdown-menu-end"
                          aria-labelledby="dropdownInfo"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. cupiditate consequatur rerum eius ad ut officiis
                        </span>
                      </span>
                      {/* Dropdown */}
                      <span className="dropdown">
                        <a
                          className="text-muted text-decoration-none"
                          href="#"
                          role="button"
                          id="shareDropdown1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fe fe-more-vertical" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="shareDropdown1"
                        >
                          <span className="dropdown-header">Share</span>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-facebook dropdown-item-icon" />
                            Facebook
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-twitter dropdown-item-icon" />
                            Twitter
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-linkedin dropdown-item-icon" />
                            Linked In
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-copy dropdown-item-icon" />
                            Copy Link
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Video */}
                  <div
                    className="embed-responsive  position-relative w-100 d-block overflow-hidden p-0"
                    style={{ height: "600px" }}
                  >
                    <iframe
                      className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
                      src="https://www.youtube.com/embed/PkZNo7MFNFg"
                    />
                  </div>
                </div>
                {/* Tab pane */}
                <div
                  className="tab-pane fade"
                  id="course-development"
                  role="tabpanel"
                  aria-labelledby="course-development-tab"
                >
                  <div className="d-lg-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h2 className="h3 mb-0">
                        Installing Development Software
                      </h2>
                    </div>
                    <div>
                      {/* Dropdown */}
                      <span className="dropdown">
                        <a
                          href="#"
                          className="ms-2 text-muted"
                          id="dropdownInfo2"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-help-circle" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-lg p-3"
                          aria-labelledby="dropdownInfo2"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. cupiditate consequatur rerum eius ad ut officiis
                        </span>
                      </span>
                      {/* Dropdown */}
                      <span className="dropdown ">
                        <a
                          className="text-muted text-decoration-none"
                          href="#"
                          role="button"
                          id="shareDropdown2"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-more-vertical" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="shareDropdown2"
                        >
                          <span className="dropdown-header">Share</span>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-facebook dropdown-item-icon" />
                            Facebook
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-twitter dropdown-item-icon" />
                            Twitter
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-linkedin dropdown-item-icon" />
                            Linked In
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-copy dropdown-item-icon" />
                            Copy Link
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Video */}
                  <div
                    className="embed-responsive  position-relative w-100 d-block overflow-hidden p-0"
                    style={{ height: "600px" }}
                  >
                    <iframe
                      className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
                      src="https://www.youtube.com/embed/PkZNo7MFNFg"
                    />
                  </div>
                </div>
                {/* Tab pane */}
                <div
                  className="tab-pane fade"
                  id="course-project"
                  role="tabpanel"
                  aria-labelledby="course-project-tab"
                >
                  <div className="d-lg-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h2 className="h3 mb-0">
                        Hello World Project from GitHub
                      </h2>
                    </div>
                    <div>
                      {/* Dropdown */}
                      <span className="dropdown">
                        <a
                          href="#"
                          className="ms-2 text-muted"
                          id="dropdownInfo3"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-help-circle" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-lg p-3"
                          aria-labelledby="dropdownInfo3"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. cupiditate consequatur rerum eius ad ut officiis
                        </span>
                      </span>
                      {/* Dropdown */}
                      <span className="dropdown ">
                        <a
                          className="text-muted text-decoration-none"
                          href="#"
                          role="button"
                          id="shareDropdown3"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-more-vertical" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="shareDropdown3"
                        >
                          <span className="dropdown-header">Share</span>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-facebook dropdown-item-icon" />
                            Facebook
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-twitter dropdown-item-icon" />
                            Twitter
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-linkedin dropdown-item-icon" />
                            Linked In
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-copy dropdown-item-icon" />
                            Copy Link
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Video */}
                  <div
                    className="embed-responsive  position-relative w-100 d-block overflow-hidden p-0"
                    style={{ height: "600px" }}
                  >
                    <iframe
                      className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
                      src="https://www.youtube.com/embed/PkZNo7MFNFg"
                    />
                  </div>
                </div>
                {/* Tab pane */}
                <div
                  className="tab-pane fade"
                  id="course-website"
                  role="tabpanel"
                  aria-labelledby="course-website-tab"
                >
                  <div className="d-lg-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h2 className="h3 mb-0">Our Sample Website</h2>
                    </div>
                    <div>
                      {/* Dropdown */}
                      <span className="dropdown">
                        <a
                          href="#"
                          className="ms-2 text-muted"
                          id="dropdownInfo4"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-help-circle" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-lg p-3"
                          aria-labelledby="dropdownInfo4"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. cupiditate consequatur rerum eius ad ut officiis
                        </span>
                      </span>
                      {/* Dropdown */}
                      <span className="dropdown ">
                        <a
                          className="text-muted text-decoration-none"
                          href="#"
                          role="button"
                          id="shareDropdown4"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fe fe-more-vertical" />
                        </a>
                        <span
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="shareDropdown4"
                        >
                          <span className="dropdown-header">Share</span>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-facebook dropdown-item-icon" />
                            Facebook
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-twitter dropdown-item-icon" />
                            Twitter
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fab fa-linkedin dropdown-item-icon" />
                            Linked In
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="fas fa-copy dropdown-item-icon" />
                            Copy Link
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Video */}
                  <div
                    className="embed-responsive  position-relative w-100 d-block overflow-hidden p-0"
                    style={{ height: "600px" }}
                  >
                    <iframe
                      className="position-absolute top-0 end-0 start-0 end-0 bottom-0 h-100 w-100"
                      src="https://www.youtube.com/embed/PkZNo7MFNFg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card */}
      <div className="card course-sidebar " id="courseAccordion">
        {/* List group */}
        <ul className="list-group list-group-flush course-list">
          <li className="list-group-item">
            <h4 className="mb-0">Table of Content</h4>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {" "}
            {course?.topics?.map((item, index) => {
              return <Row item={item} key={index} />;
            })}
          </li>

          <li className="list-group-item">
            {/* Toggle */}

            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseTwo"
              role="button"
              aria-expanded="false"
              aria-controls="courseTwo"
            >
              <div className="me-auto">Introduction to JavaScript</div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse show"
              id="courseTwo"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabOne"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-decoration-none"
                  id="course-intro-tab"
                  data-bs-toggle="pill"
                  href="#course-intro"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="true"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-primary icon-sm  rounded-circle me-2">
                      <i className="fe fe-play  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 7s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                  id="course-development-tab"
                  data-bs-toggle="pill"
                  href="#course-development"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-primary icon-sm  rounded-circle me-2">
                      <i className="fe fe-play  fs-6" />
                    </span>
                    <span>Installing Development Software</span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 11s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                  id="course-project-tab"
                  data-bs-toggle="pill"
                  href="#course-project"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-primary icon-sm  rounded-circle me-2">
                      <i className="fe fe-play  fs-6" />
                    </span>
                    <span>Hello World Project from GitHub</span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 33s</span>
                  </div>
                </a>
                <a
                  className="d-flex justify-content-between align-items-center text-inherit text-decoration-none"
                  id="course-website-tab"
                  data-bs-toggle="pill"
                  href="#course-website"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-primary icon-sm  rounded-circle me-2">
                      <i className="fe fe-play  fs-6" />
                    </span>
                    <span>Our Sample Website</span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 15s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseThree"
              role="button"
              aria-expanded="false"
              aria-controls="courseThree"
            >
              <div className="me-auto">
                {/* Title */}
                JavaScript Beginning
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseThree"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabTwo"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab2"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="true"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 41s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab2"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Adding JavaScript Code to a Web Page</span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 39s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab2"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span> Working with JavaScript Files </span>
                  </div>
                  <div className="text-truncate">
                    <span>6m 18s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab2"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Formatting Code </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 18s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab3"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span> Detecting and Fixing Errors </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 14s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab3"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Case Sensitivity </span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 48s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab3"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Commenting Code </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 24s</span>
                  </div>
                </a>
                <a
                  className="mb-0 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab3"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary</span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 14s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseFour"
              role="button"
              aria-expanded="false"
              aria-controls="courseFour"
            >
              <div className="me-auto">
                {/* Title */}
                Variables and Constants
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseFour"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabThree"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab4"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 19s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab4"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>What Is a Variable?</span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 11s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab5"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Declaring Variables </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 30s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab4"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Using let to Declare Variables </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 28s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab5"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Naming Variables </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 14s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab6"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Common Errors Using Variables </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 30s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab4"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Changing Variable Values </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 4s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab19"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Constants </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 15s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab5"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>The var Keyword </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 20s</span>
                  </div>
                </a>
                <a
                  className="mb-0 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab7"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 49s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseSix"
              role="button"
              aria-expanded="false"
              aria-controls="courseSix"
            >
              <div className="me-auto">
                {/* Title */}
                Program Flow
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseSix"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabFour"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab8"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 52s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab6"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Clip Watched </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 27s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab5"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Conditionals Using if() </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 25s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab6"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Truthy and Falsy</span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 30s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab7"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>if ... else </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 30s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab9"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Comparing === and == </span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 52s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab7"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>The Ternary Operator </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 47s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab10"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Block Scope Using let </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 21s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab8"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Looping with for() </span>
                  </div>
                  <div className="text-truncate">
                    <span>5m 30s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab8"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Looping with do ... while() </span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 58s</span>
                  </div>
                </a>
                <a
                  className="mb-0 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab6"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 21s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseSeven"
              role="button"
              aria-expanded="false"
              aria-controls="courseSeven"
            >
              <div className="me-auto">
                {/* Title */}
                Functions
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseSeven"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabFive"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab11"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 52s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab11"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Function Basics </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 46s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab7"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Function Expressions </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 32s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab12"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Passing Information to Functions</span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 19s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab9"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Function Return Values </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 13s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab8"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Function Scope </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 20s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab12"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Using Functions to Modify Web Pages </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 42s</span>
                  </div>
                </a>
                <a
                  className="mb-0 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab10"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 3s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0 justify-content-between"
              data-bs-toggle="collapse"
              href="#courseEight"
              role="button"
              aria-expanded="false"
              aria-controls="courseEight"
            >
              <div className="me-auto">
                {/* Title */}
                Objects and the DOM
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseEight"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabSix"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab13"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 48s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab13"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Object Properties </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 28s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab11"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Object Methods </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 3s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab9"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Passing Objects to Functions</span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 27s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab14"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Standard Built-in Objects </span>
                  </div>
                  <div className="text-truncate">
                    <span>6m 55s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab12"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>The Document Object Model (DOM) </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 29s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab14"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Styling DOM Elements </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 42s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab10"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Detecting Button Clicks </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 3s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab13"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Showing and Hiding DOM Elements </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 37s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab15"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 47s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseNine"
              role="button"
              aria-expanded="false"
              aria-controls="courseNine"
            >
              <div className="me-auto">
                {/* Title */}
                Arrays
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseNine"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabSeven"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab16"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 48s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab14"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Creating and Initializing Arrays </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 7s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab15"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Accessing Array Items </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 4s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab11"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Manipulating Arrays </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 3s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab15"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>slice() and splice() </span>
                  </div>
                  <div className="text-truncate">
                    <span>5m 54s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab17"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Array Searching and Looping </span>
                  </div>
                  <div className="text-truncate">
                    <span>7m 32s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab16"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Arrays in the DOM </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 11s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab18"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 28s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0 "
              data-bs-toggle="collapse"
              href="#courseTen"
              role="button"
              aria-expanded="false"
              aria-controls="courseTen"
            >
              <div className="me-auto">
                {/* Title */}
                Scope and Hoisting
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* Row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseTen"
              data-bs-parent="#courseAccordion"
            >
              <div
                className="py-4 nav"
                id="course-tabEight"
                role="tablist"
                aria-orientation="vertical"
                style={{ display: "inherit" }}
              >
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-intro-tab19"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-intro"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Introduction</span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 20s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab16"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Global Scope </span>
                  </div>
                  <div className="text-truncate">
                    <span>4m 7s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab17"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Clip Watched </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 14s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-development-tab12"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-development"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Function Scope </span>
                  </div>
                  <div className="text-truncate">
                    <span>3m 45s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab17"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Var and Hoisting </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 21s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-website-tab18"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-website"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Undeclared Variables and Strict Mode </span>
                  </div>
                  <div className="text-truncate">
                    <span>2m 16s</span>
                  </div>
                </a>
                <a
                  className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none disableClick"
                  id="course-project-tab18"
                  data-bs-toggle="pill"
                  href="#"
                  role="tab"
                  aria-controls="course-project"
                  aria-selected="false"
                >
                  <div className="text-truncate">
                    <span className="icon-shape bg-light text-secondary icon-sm  rounded-circle me-2">
                      <i className="fe fe-lock  fs-6" />
                    </span>
                    <span>Summary </span>
                  </div>
                  <div className="text-truncate">
                    <span>1m 33s</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          {/* List group item */}
          <li className="list-group-item">
            {/* Toggle */}
            <a
              className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
              data-bs-toggle="collapse"
              href="#courseEleven"
              role="button"
              aria-expanded="false"
              aria-controls="courseEleven"
            >
              <div className="me-auto">
                {/* Title */}
                Summary
              </div>
              {/* Chevron */}
              <span className="chevron-arrow  ms-4">
                <i className="fe fe-chevron-down fs-4" />
              </span>
            </a>
            {/* / .row */}
            {/* Collapse */}
            <div
              className="collapse"
              id="courseEleven"
              data-bs-parent="#courseAccordion"
            >
              <div className="py-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae esse velit eos sunt ab inventore est tenetur
                  blanditiis? Voluptas eius molestiae ad itaque tempora nobis
                  minima eveniet aperiam molestias.{" "}
                </p>
                <p>
                  Maiores natus expedita dolores ea non possimus magnam corrupt
                  i quas rem unde quo enim porro culpa! Quaerat veritatis veniam
                  corrupti iusto.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default view;
