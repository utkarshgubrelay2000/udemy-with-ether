import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import API_URL from "../../utils/API_URL";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// import { Col, Container, Row } from 'reactstrap';
// import LastMinute from '../../components/LastMinute'
// import lastMinute from "../../data/lastminute.json";
// import data from "../../data/index.json";
// import { geoJSON } from 'leaflet';
function CourseDetail() {
  const router = useRouter();
  const { titleKey } = router.query;
  const [isOpenModal, setOpenModal] = useState(false);

  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [EmbedId, setEmbedId] = useState("");
  const classes = useStyles();
  const [tabState, setTabState] = useState(1);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [demoLink, setDemoLink] = useState("");
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  const getCourseDetails = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/get-course-by-classId?courseId=${titleKey}`
      );
      // console.log(res?.data);
      setCourse(res?.data);
      setDemoLink(res?.data?.topics[0]?.SubTopic[0]?.previewLink);
      setInstructor(res.data?.instructor);
      getReviews(res?.data?._id);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const getReviews = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/get-review/${id}`);
      // console.log(res?.data);
      setReviews(res?.data?.data);
      setReviewsCount(res?.data?.ReviewsCount);
    } catch (e) {
      alert(e);
    }
  };

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
                  onClick={() => {
                    setEmbedId(sub.previewLink);
                    setOpenModal(true);
                  }}
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
    <div className="new-course-detail">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpenModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenModal}>
          <div className={classes.paper}>
            <div className="video-responsive">
              <iframe
                width="853"
                height="480"
                src={EmbedId}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
        </Fade>
      </Modal>

      {/* Page header */}
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div>
                <h1 className="text-white display-4 fw-semi-bold">
                  {/* Getting Started with JavaScript  */}
                  {course?.courseName}
                </h1>
                <p className="text-white mb-6 lead">
                  {/* JavaScript is the popular programming language which powers
                  web pages and web applications. This course will get you
                  started coding in JavaScript. */}
                  <div
                    style={{ fontSize: "15px" }}
                    dangerouslySetInnerHTML={{
                      __html: course?.short_description,
                    }}
                  />
                </p>
                <div className="d-flex align-items-center">
                  <a
                    href="#"
                    className="bookmark text-white text-decoration-none"
                  >
                    <i className="fe fe-bookmark text-white-50 me-2" />
                    Bookmark
                  </a>
                  <span className="text-white ms-3">
                    <i className="fe fe-user text-white-50" /> 1200 Enrolled{" "}
                  </span>
                  <span className="ms-4">
                    <i className="mdi mdi-star me-n1 text-warning" />
                    <i className="mdi mdi-star me-n1 text-warning" />
                    <i className="mdi mdi-star me-n1 text-warning" />
                    <i className="mdi mdi-star me-n1 text-warning" />
                    <i className="mdi mdi-star me-n1-half text-warning" />
                    <span className="text-white">(140)</span>
                  </span>
                  <span className="text-white ms-4 d-none d-md-block">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16
                              16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x={3}
                        y={8}
                        width={2}
                        height={6}
                        rx={1}
                        fill="#DBD8E9"
                      />
                      <rect
                        x={7}
                        y={5}
                        width={2}
                        height={9}
                        rx={1}
                        fill="#DBD8E9"
                      />
                      <rect
                        x={11}
                        y={2}
                        width={2}
                        height={12}
                        rx={1}
                        fill="#DBD8E9"
                      />
                    </svg>
                    <span className="align-middle">Intermediate</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page content */}
      <div className="pb-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 mt-n8 mb-4 mb-lg-0">
              {/* Card */}
              <div className="card rounded-3">
                {/* Card header */}
                <div className="card-header border-bottom-0 p-0">
                  <div>
                    {/* Nav */}
                    <ul className="nav nav-lb-tab" id="tab" role="tablist">
                      <li className="nav-item" onClick={() => setTabState(1)}>
                        <a
                          className={
                            tabState === 1 ? "nav-link active" : "nav-link"
                          }
                          id="table-tab"
                          data-bs-toggle="pill"
                          // href="#table"
                          role="tab"
                          aria-controls="table"
                          aria-selected="true"
                        >
                          Contents
                        </a>
                      </li>
                      <li className="nav-item" onClick={() => setTabState(2)}>
                        <a
                          className={
                            tabState === 2 ? "nav-link active" : "nav-link"
                          }
                          id="description-tab"
                          data-bs-toggle="pill"
                          // href="#description"
                          role="tab"
                          aria-controls="description"
                          aria-selected="false"
                        >
                          Description
                        </a>
                      </li>
                      <li className="nav-item" onClick={() => setTabState(3)}>
                        <a
                          className={
                            tabState === 3 ? "nav-link active" : "nav-link"
                          }
                          id="review-tab"
                          data-bs-toggle="pill"
                          // href="#review"
                          role="tab"
                          aria-controls="review"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </li>
                      {/* <li className="nav-item" onClick={() => setTabState(4)}>
                        <a
                          className="nav-link"
                          id="transcript-tab"
                          data-bs-toggle="pill"
                          href="#transcript"
                          role="tab"
                          aria-controls="transcript"
                          aria-selected="false"
                        >
                          Transcript
                        </a>
                      </li>
                      <li className="nav-item" onClick={() => setTabState(5)}>
                        <a
                          className="nav-link"
                          id="faq-tab"
                          data-bs-toggle="pill"
                          href="#faq"
                          role="tab"
                          aria-controls="faq"
                          aria-selected="false"
                        >
                          FAQ
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
                {/* Card Body */}
                <div className="card-body">
                  <div className="tab-content" id="tabContent">
                    <div
                      className={
                        tabState === 1
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="table"
                      role="tabpanel"
                      aria-labelledby="table-tab"
                    >
                      {/* Card */}
                      <div className="accordion" id="courseAccordion">
                        <div>
                          {/* List group */}
                          <ul className="list-group list-group-flush">
                            {course?.topics?.map((item, index) => {
                              return <Row item={item} key={index} />;
                            })}

                            {/* List group item */}

                            {/* List group item */}

                            {/* List group item */}

                            {/* List group item */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tabState === 2
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="description"
                      role="tabpanel"
                      aria-labelledby="description-tab"
                    >
                      {/* Description */}
                      <div className="mb-4">
                        <h3 className="mb-2">Course Descriptions</h3>
                        <p>
                          <div
                            // style={{ fontSize: "15px" }}
                            dangerouslySetInnerHTML={{
                              __html: course?.description,
                            }}
                          />
                        </p>
                        {/* <p>
                          Next, you’ll explore the basics of the language,
                          giving plenty of examples. Lastly, you’ll put your
                          JavaScript knowledge to work and modify a modern,
                          responsive web page. When you’re finished with this
                          course, you’ll have the skills and knowledge in
                          JavaScript to create simple programs, create simple
                          web applications, and modify web pages.
                        </p> */}
                      </div>
                      {/* <h4 className="mb-3">What you’ll learn</h4>
                      <div className="row mb-3">
                        <div className="col-12 col-md-6">
                          <ul className="list-unstyled">
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Recognize the importance of understanding your
                                objectives when addressing an audience.
                              </span>
                            </li>
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Identify the fundaments of composing a
                                successful close.
                              </span>
                            </li>
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Explore how to connect with your audience
                                through crafting compelling stories.
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-12 col-md-6">
                          <ul className="list-unstyled">
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Examine ways to connect with your audience by
                                personalizing your content.
                              </span>
                            </li>
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Break down the best ways to exude executive
                                presence.
                              </span>
                            </li>
                            <li className="d-flex mb-2">
                              <i className="far fa-check-circle text-success me-2 mt-2" />
                              <span>
                                Explore how to communicate the unknown in an
                                impromptu communication.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p>
                        Maecenas viverra condimentum nulla molestie condimentum.
                        Nunc ex libero, feugiat quis lectus vel, ornare euismod
                        ligula. Aenean sit amet arcu nulla.
                      </p> */}
                      {/* <p>
                        Duis facilisis ex a urna blandit ultricies. Nullam
                        sagittis ligula non eros semper, nec mattis odio
                        ullamcorper. Phasellus feugiat sit amet leo eget
                        consectetur.
                      </p> */}
                    </div>
                    <div
                      className={
                        tabState === 3
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="review"
                      role="tabpanel"
                      aria-labelledby="review-tab"
                    >
                      {/* Reviews */}
                      <div className="mb-3">
                        <h3 className="mb-4">
                          How students rated this courses
                        </h3>
                        <div className="row align-items-center">
                          <div className="col-auto text-center">
                            <h3 className="display-2 fw-bold">4.8</h3>
                            <i className="mdi mdi-star me-n1 text-warning" />
                            <i className="mdi mdi-star me-n1 text-warning" />
                            <i className="mdi mdi-star me-n1 text-warning" />
                            <i className="mdi mdi-star me-n1 text-warning" />
                            <i className="mdi mdi-star me-n1-half text-warning" />
                            <p className="mb-0 fs-6">
                              (Based on {reviewsCount} reviews)
                            </p>
                          </div>
                          {/* Progress bar */}
                          <div className="col pt-3 order-3 order-md-2">
                            <div
                              className="progress mb-3"
                              style={{ height: "6px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "90%" }}
                                aria-valuenow={90}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div
                              className="progress mb-3"
                              style={{ height: "6px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow={80}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div
                              className="progress mb-3"
                              style={{ height: "6px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "70%" }}
                                aria-valuenow={70}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div
                              className="progress mb-3"
                              style={{ height: "6px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "60%" }}
                                aria-valuenow={60}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div
                              className="progress mb-0"
                              style={{ height: "6px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="col-md-auto col-6 order-2 order-md-3">
                            {/* Rating */}
                            <div>
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <span className="ms-1">53%</span>
                            </div>
                            <div>
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <span className="ms-1">36%</span>
                            </div>
                            <div>
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <span className="ms-1">9%</span>
                            </div>
                            <div>
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <span className="ms-1">3%</span>
                            </div>
                            <div>
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <i className="mdi mdi-star me-n1 text-light" />
                              <span className="ms-1">2%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* hr */}
                      <hr className="my-5" />
                      <div className="mb-3">
                        <div className="d-lg-flex align-items-center justify-content-between mb-5">
                          {/* Reviews */}
                          <div className="mb-3 mb-lg-0">
                            <h3 className="mb-0">Reviews</h3>
                          </div>
                          <div>
                            {/* Form */}
                            {/* <form className="form-inline">
                              <div className="d-flex align-items-center me-2">
                                <span className="position-absolute ps-3">
                                  <i className="fe fe-search" />
                                </span>
                                <input
                                  type="search"
                                  className="form-control ps-6"
                                  placeholder="Search Review"
                                />
                              </div>
                            </form> */}
                          </div>
                        </div>
                        {/* Rating */}
                        {reviews.map((rev, idx) => {
                          return (
                            <div
                              className="d-flex border-bottom pb-4 mb-4"
                              key={idx}
                            >
                              {/* <img
                                src="/content/img/avatar/avatar-0.jpg"
                                alt=""
                                className="rounded-circle avatar-lg"
                              /> */}
                              <div className=" ms-3">
                                <h4 className="mb-1">{rev?.name}</h4>
                                <div className="fs-6 mb-2">
                                  {[...Array(parseInt(rev?.rating))].map(
                                    (x, i) => (
                                      <span class="fa fa-star checked"></span>
                                    )
                                  )}
                                </div>
                                <p>{rev?.content}</p>
                                {/* <div className="d-lg-flex">
                                  <p className="mb-0">
                                    Was this review helpful?
                                  </p>
                                  <a
                                    href="#"
                                    className="btn btn-xs btn-primary ms-lg-3"
                                  >
                                    Yes
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-xs btn-outline-white ms-1"
                                  >
                                    No
                                  </a>
                                </div> */}
                              </div>
                            </div>
                          );
                        })}

                        {/* Rating */}
                        {/* <div className="d-flex border-bottom pb-4 mb-4">
                          <img
                            src="../assets/images/avatar/avatar-3.jpg"
                            alt=""
                            className="rounded-circle avatar-lg"
                          />
                          <div className=" ms-3">
                            <h4 className="mb-1">
                              Arthur Williamson{" "}
                              <span className="ms-1 fs-6 text-muted">
                                3 Days ago
                              </span>
                            </h4>
                            <div className="fs-6 mb-2">
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                            </div>
                            <p>
                              Its pretty good.Just a reminder that there are
                              also students with Windows, meaning Figma its a
                              bit different of yours. Thank you!
                            </p>
                            <div className="d-lg-flex">
                              <p className="mb-0">Was this review helpful?</p>
                              <a
                                href="#"
                                className="btn btn-xs btn-primary ms-lg-3"
                              >
                                Yes
                              </a>
                              <a
                                href="#"
                                className="btn btn-xs btn-outline-white ms-1"
                              >
                                No
                              </a>
                            </div>
                          </div>
                        </div> */}
                        {/* Rating */}
                        {/* <div className="d-flex border-bottom pb-4 mb-4">
                          <img
                            src="../assets/images/avatar/avatar-4.jpg"
                            alt=""
                            className="rounded-circle avatar-lg"
                          />
                          <div className=" ms-3">
                            <h4 className="mb-1">
                              Claire Jones{" "}
                              <span className="ms-1 fs-6 text-muted">
                                4 Days ago
                              </span>
                            </h4>
                            <div className="fs-6 mb-2">
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                            </div>
                            <p>
                              Great course for learning Figma, the only bad
                              detail would be that some icons are not included
                              in the assets. But 90% of the icons needed are
                              included, and the voice of the instructor was very
                              clear and easy to understood.
                            </p>
                            <div className="d-lg-flex">
                              <p className="mb-0">Was this review helpful?</p>
                              <a
                                href="#"
                                className="btn btn-xs btn-primary ms-lg-3"
                              >
                                Yes
                              </a>
                              <a
                                href="#"
                                className="btn btn-xs btn-outline-white ms-1"
                              >
                                No
                              </a>
                            </div>
                          </div>
                        </div> */}
                        {/* Rating */}
                        {/* <div className="d-flex">
                          <img
                            src="../assets/images/avatar/avatar-5.jpg"
                            alt=""
                            className="rounded-circle avatar-lg"
                          />
                          <div className=" ms-3">
                            <h4 className="mb-1">
                              Bessie Pena
                              <span className="ms-1 fs-6 text-muted">
                                5 Days ago
                              </span>
                            </h4>
                            <div className="fs-6 mb-2">
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                              <i className="mdi mdi-star me-n1 text-warning" />
                            </div>
                            <p>
                              I have really enjoyed this class and learned a
                              lot, found it very inspiring and helpful, thank
                              you!
                              <i className="em em-heart_eyes ms-2 fs-6" />
                            </p>
                            <div className="d-lg-flex">
                              <p className="mb-0">Was this review helpful?</p>
                              <a
                                href="#"
                                className="btn btn-xs btn-primary ms-lg-3"
                              >
                                Yes
                              </a>
                              <a
                                href="#"
                                className="btn btn-xs btn-outline-white ms-1"
                              >
                                No
                              </a>
                            </div>
                          </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="transcript"
                      role="tabpanel"
                      aria-labelledby="transcript-tab"
                    >
                      {/* Description */}
                      <div>
                        <h3 className="mb-3">
                          Transcript from the "Introduction" Lesson
                        </h3>
                        <div className="mb-4">
                          <h4>
                            Course Overview{" "}
                            <a href="#" className="text-primary ms-2 h4">
                              [00:00:00]
                            </a>
                          </h4>
                          <p className="mb-0">
                            My name is John Deo and I work as human duct tape at
                            Gatsby, that means that I do a lot of different
                            things. Everything from dev roll to writing content
                            to writing code. And I used to work as an architect
                            at IBM. I live in Portland, Oregon.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>
                            Introduction{" "}
                            <a href="#" className="text-primary ms-2 h4">
                              [00:00:16]
                            </a>
                          </h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>
                            Why Take This Course?{" "}
                            <a href="#" className="text-primary ms-2 h4">
                              [00:00:37]
                            </a>
                          </h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>
                            A Look at the Demo Application{" "}
                            <a href="#" className="text-primary ms-2 h4">
                              [00:00:54]
                            </a>
                          </h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>
                            Summary{" "}
                            <a href="#" className="text-primary ms-2 h4">
                              [00:01:31]
                            </a>
                          </h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Tab pane */}
                    <div
                      className="tab-pane fade"
                      id="faq"
                      role="tabpanel"
                      aria-labelledby="faq-tab"
                    >
                      {/* FAQ */}
                      <div>
                        <h3 className="mb-3">
                          Course - Frequently Asked Questions
                        </h3>
                        <div className="mb-4">
                          <h4>How this course help me to design layout?</h4>
                          <p>
                            My name is Jason Woo and I work as human duct tape
                            at Gatsby, that means that I do a lot of different
                            things. Everything from dev roll to writing content
                            to writing code. And I used to work as an architect
                            at IBM. I live in Portland, Oregon.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>What is important of this course?</h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>Why Take This Course?</h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4>
                            Is able to create application after this course?
                          </h4>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                          <p>
                            We'll dive into GraphQL, the fundamentals of
                            GraphQL. We're only gonna use the pieces of it that
                            we need to build in Gatsby. We're not gonna be doing
                            a deep dive into what GraphQL is or the language
                            specifics. We're also gonna get into MDX. MDX is a
                            way to write React components in your markdown.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12 mt-lg-n22">
              {/* Card */}
              <div className="card mb-3 mb-4">
                <div className="p-1">
                  <div
                    className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
                    style={{
                      backgroundImage:
                        "url(/content/img/datacamp_images/datacamp12.jpg",
                    }}
                  >
                    <a className="popup-youtube icon-shape rounded-circle btn-play icon-xl text-decoration-none">
                      <i className="fe fe-play" />
                    </a>
                  </div>
                </div>
                {/* Card body */}
                <div className="card-body">
                  {/* Price single page */}
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2">
                      ${course?.price}
                    </span>
                    <del className="fs-4 text-muted">
                      ${course?.price + 100}
                    </del>
                    <span
                      onClick={() => {
                        setEmbedId(demoLink);
                        setOpenModal(true);
                      }}
                      className="btn btn-outline-primary"
                    >
                      Preview Course
                    </span>
                  </div>
                  <div className="d-grid">
                    <a
                      onClick={() => {
                        if (
                          JSON.parse(localStorage.getItem("userInfo")) === null
                        ) {
                          alert("Please login to purchase course");
                          window.location.pathname = `/login-course/${course?.courseId}`;
                        } else {
                          window.location.pathname = `/checkout/${course?.courseId}`;
                        }
                      }}
                      className="btn btn-primary mb-2  "
                    >
                      Buy Now
                    </a>
                    <a
                      onClick={() =>
                        (window.location.pathname = `/login-course/${course?.courseId}`)
                      }
                      className="btn btn-outline-primary"
                    >
                      Join Our Community
                    </a>
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className="card mb-4">
                <div>
                  {/* Card header */}
                  <div className="card-header">
                    <h4 className="mb-0">What’s included</h4>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent">
                      <i className="fe fe-play-circle align-middle me-2 text-primary" />
                      {course?.courseDuration} hours video
                    </li>
                    {/* <li className="list-group-item bg-transparent">
                      <i className="fe fe-award me-2 align-middle text-success" />
                      Certificate
                    </li>
                    <li className="list-group-item bg-transparent">
                      <i className="fe fe-calendar align-middle me-2 text-info" />
                      12 Article
                    </li>
                    <li className="list-group-item bg-transparent">
                      <i className="fe fe-video align-middle me-2 text-secondary" />
                      Watch Offline
                    </li> */}
                    <li className="list-group-item bg-transparent border-bottom-0">
                      <i className="fe fe-clock align-middle me-2 text-warning" />
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
              {/* Card */}
              <div className="card">
                {/* Card body */}
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <img
                        src={instructor?.imageUrl}
                        alt=""
                        className="rounded-circle avatar-xl"
                      />
                      <a
                        href="#"
                        className="position-absolute mt-2 ms-n3"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title="Verifed"
                      >
                        <img
                          src="/content/svg/checked-mark.svg"
                          alt=""
                          height={30}
                          width={30}
                        />
                      </a>
                    </div>
                    <div className="ms-4">
                      <h4 className="mb-0">
                        {instructor?.firstName + " "}
                        {instructor?.lastName}
                      </h4>
                      <p className="mb-1 fs-6">{instructor?.email}</p>
                      {/* <span className="fs-6">
                        <span className="text-warning">4.5</span>
                        <span className="mdi mdi-star text-warning me-2" />
                        Instructor Rating
                      </span> */}
                    </div>
                  </div>
                  <div className="border-top row mt-3 border-bottom mb-3 g-0">
                    {/* <div className="col">
                      <div className="pe-1 ps-2 py-3">
                        <h5 className="mb-0">11,604</h5>
                        <span>Students</span>
                      </div>
                    </div>
                    <div className="col border-start">
                      <div className="pe-1 ps-3 py-3">
                        <h5 className="mb-0">32</h5>
                        <span>Courses</span>
                      </div>
                    </div>
                    <div className="col border-start">
                      <div className="pe-1 ps-3 py-3">
                        <h5 className="mb-0">12,230</h5>
                        <span>Reviews</span>
                      </div>
                    </div> */}
                  </div>
                  <p>
                    <div
                      style={{ fontSize: "15px" }}
                      dangerouslySetInnerHTML={{ __html: instructor?.bio }}
                    />
                  </p>
                  {/* <a
                    href="instructor-profile.html"
                    className="btn btn-outline-white btn-sm"
                  >
                    View Details
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="pt-12 pb-3">
            {/* <div className="row d-md-flex align-items-center mb-4">
              <div className="col-12">
                <h2 className="mb-0">Related Courses</h2>
              </div>
            </div> */}
            {/* {data.topBlocks && (
                            <section className="py-6 bg-gray-100">
                                <Container>
                                    <div className="text-center pb-lg-4">
                                        <p className="subtitle text-secondary">
                                            {data.topBlocks.subTitle}
                                        </p>
                                        <h2 className="mb-5">{data.topBlocks.title}</h2>
                                    </div>
                                    <Row>
                                        {data.topBlocks.blocks.map((block) => (
                                            <Col
                                                key={block.title}
                                                lg="4"
                                                className="mb-3 mb-lg-0 text-center"
                                            >
                                                <div className="px-0 px-lg-3">
                                                    <div className="icon-rounded bg-primary-light mb-3">
                                                        <svg className="svg-icon text-primary w-2rem h-2rem">
                                                            <use
                                                                xlinkHref={`content/svg/orion-svg-sprite.svg${block.icon}`}
                                                            >
                                                                {" "}
                                                            </use>
                                                        </svg>
                                                    </div>
                                                    <h3 className="h5">{block.title}</h3>
                                                    <p className="text-muted">{block.content}</p>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </section>
                        )}
                        {lastMinute.map((data, index) => (
                            <LastMinute
                                key={index}
                                greyBackground
                                data={data}
                                geoJSON={geoJSON[index]}
                            />
                        ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
