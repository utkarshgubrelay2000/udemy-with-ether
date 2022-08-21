import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../../utils/API_URL";

function view() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  useEffect(async () => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await axios.get(`${API_URL}/getMyCourseById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
                    <span onClick={() => setVideoLink(sub.videoLink)}>
                      {sub.subTopicName}
                    </span>
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
                      //   src="https://www.youtube.com/embed/PkZNo7MFNFg"
                      src={videoLink}
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

          {/* List group item */}

          {/* List group item */}

          {/* List group item */}
        </ul>
      </div>
    </div>
  );
}

export default view;
