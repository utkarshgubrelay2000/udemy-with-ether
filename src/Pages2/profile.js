import Axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../utils/API_URL";

const profile = () => {
  const [userDetail, setUserDetail] = useState({
    fname: "",
    lname: "",
    email: "",
    name: "",
    mobile: "",
    dob: "",
  });

  const [images, setProductPhotos] = useState([]);

  const [newImage, setnewImage] = useState(null);
  const [productFiles, setproductFiles] = useState([]);

  useEffect(async () => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await Axios.get(`${API_URL}/getMyProfile`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "json" },
      });
      // console.log(res.data);
      setUserDetail(res.data);
      let imageArray = [...images, res.data.profileImg];
      setProductPhotos(imageArray);
      // setName(res.data.name);
      // setUserProfile(res.data);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const date = new Date(userDetail.dob);
    const sendData = {
      fname: userDetail.fname,
      lname: userDetail.lname,
      email: userDetail.email,
      name: userDetail.name,
      mobile: userDetail.mobile,
      dob: date,
      profileImg: images[0],
    };
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await Axios.patch(`${API_URL}/update-profile`, sendData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data);
      alert("succesfully updated");
      getUserProfile();
      // setUserDetail(res.data);
      // setName(res.data.name);
      // setUserProfile(res.data);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const imageChange = async (images) => {
    let temp = [...productFiles, images];
    setproductFiles(temp);
    let urls = [];
    setnewImage(images[0]);
    // for (const image of images) {
    //   let url = URL.createObjectURL(image);
    //   urls.push(url);
    // }
    // let imageArray = [...productPhotos, ...urls];
    // setProductPhotos(imageArray);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("upl", newImage);
    // console.log(newImage);
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    try {
      const res = await Axios.post(`${API_URL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      let urls = [];

      const images = res.data.imageUrl;

      urls.push(images[0]);

      let imageArray = [...urls];
      setProductPhotos(imageArray);
      alert("Image Uploaded");
      // window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  const removeImage = (index) => {
    let temp = [...images];
    let tempFiles = [...productFiles];

    temp.splice(index, 1);
    tempFiles.splice(index, 1);

    setproductFiles(productFiles);
    setProductPhotos(temp);
  };

  return (
    <div>
      <div>
        {/* Mirrored from codescandy.com/geeks-bootstrap-5/pages/profile-edit.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 18 Aug 2021 15:06:37 GMT */}
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Favicon icon*/}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="../assets/images/favicon/favicon.ico"
        />
        {/* Libs CSS */}
        <link href="../assets/fonts/feather/feather.css" rel="stylesheet" />
        <link
          href="../assets/libs/bootstrap-icons/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/dragula/dist/dragula.min.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/%40mdi/font/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
        <link href="../assets/libs/prismjs/themes/prism.css" rel="stylesheet" />
        <link
          href="../assets/libs/dropzone/dist/dropzone.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/magnific-popup/dist/magnific-popup.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/bootstrap-select/dist/css/bootstrap-select.min.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/%40yaireo/tagify/dist/tagify.css"
          rel="stylesheet"
        />
        <link
          href="../assets/libs/tiny-slider/dist/tiny-slider.css"
          rel="stylesheet"
        />
        <link href="../assets/libs/tippy.js/dist/tippy.css" rel="stylesheet" />
        <link
          href="../assets/libs/datatables.net-bs5/css/dataTables.bootstrap5.min.css"
          rel="stylesheet"
        />
        {/* Theme CSS */}
        <link rel="stylesheet" href="../assets/css/theme.min.css" />
        <title>Profile Edit | Geeks - Bootstrap 5 Template</title>
        {/* Page Content */}
        <nav className="navbar navbar-expand-lg navbar-default">
          <div className="container-fluid px-0">
            <a className="navbar-brand" href="../index-2.html">
              <img src="../assets/images/brand/logo/logo.svg" alt="" />
            </a>
            {/* Mobile view nav wrap */}
            <ul className="navbar-nav navbar-right-wrap ms-auto d-lg-none d-flex nav-top-wrap">
              <li className="dropdown stopevent">
                <a
                  className="btn btn-light btn-icon rounded-circle text-muted indicator indicator-primary"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fe fe-bell"> </i>
                </a>
                <div className="dropdown-menu dropdown-menu-end shadow">
                  <div>
                    <div className="border-bottom px-3 pb-3 d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">Notifications</span>
                      <a href="# " className="text-muted">
                        <span className="align-middle">
                          <i className="fe fe-settings me-1" />
                        </span>
                      </a>
                    </div>
                    <ul className="list-group list-group-flush notification-list-scroll">
                      <li className="list-group-item bg-light">
                        <div className="row">
                          <div className="col">
                            <a href="#" className="text-body">
                              <div className="d-flex">
                                <img
                                  src="../assets/images/avatar/avatar-1.jpg"
                                  alt=""
                                  className="avatar-md rounded-circle"
                                />
                                <div className="ms-3">
                                  <h5 className="fw-bold mb-1">
                                    Kristin Watson:
                                  </h5>
                                  <p className="mb-3">
                                    Krisitn Watsan like your comment on course
                                    Javascript Introduction!
                                  </p>
                                  <span className="fs-6 text-muted">
                                    <span>
                                      <span className="fe fe-thumbs-up text-success me-1" />
                                      2 hours ago,
                                    </span>
                                    <span className="ms-1">2:19 PM</span>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="col-auto text-center me-2">
                            <a
                              href="#!"
                              className="badge-dot bg-info"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Mark as read"
                            ></a>
                            <div>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Remove"
                              >
                                <i className="fe fe-x text-muted" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col">
                            <a href="#" className="text-body">
                              <div className="d-flex">
                                <img
                                  src="../assets/images/avatar/avatar-2.jpg"
                                  alt=""
                                  className="avatar-md rounded-circle"
                                />
                                <div className="ms-3">
                                  <h5 className="fw-bold mb-1">
                                    Brooklyn Simmons
                                  </h5>
                                  <p className="mb-3">
                                    Just launched a new Courses React for
                                    Beginner.
                                  </p>
                                  <span className="fs-6 text-muted">
                                    <span>
                                      <span className="fe fe-thumbs-up text-success me-1" />
                                      Oct 9,
                                    </span>
                                    <span className="ms-1">1:20 PM</span>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="col-auto text-center me-2">
                            <a
                              href="#"
                              className="badge-dot bg-secondary"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Mark as unread"
                            ></a>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col">
                            <a href="#" className="text-body">
                              <div className="d-flex">
                                <img
                                  src="../assets/images/avatar/avatar-3.jpg"
                                  alt=""
                                  className="avatar-md rounded-circle"
                                />
                                <div className="ms-3">
                                  <h5 className="fw-bold mb-1">Jenny Wilson</h5>
                                  <p className="mb-3">
                                    Krisitn Watsan like your comment on course
                                    Javascript Introduction!
                                  </p>
                                  <span className="fs-6 text-muted">
                                    <span>
                                      <span className="fe fe-thumbs-up text-info me-1" />
                                      Oct 9,
                                    </span>
                                    <span className="ms-1">1:56 PM</span>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="col-auto text-center me-2">
                            <a
                              href="#"
                              className="badge-dot bg-secondary"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Mark as unread"
                            ></a>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col">
                            <a href="#" className="text-body">
                              <div className="d-flex">
                                <img
                                  src="../assets/images/avatar/avatar-4.jpg"
                                  alt=""
                                  className="avatar-md rounded-circle"
                                />
                                <div className="ms-3">
                                  <h5 className="fw-bold mb-1">Sina Ray</h5>
                                  <p className="mb-3">
                                    You earn new certificate for complete the
                                    Javascript Beginner course.
                                  </p>
                                  <span className="fs-6 text-muted">
                                    <span>
                                      <span className="fe fe-award text-warning me-1" />
                                      Oct 9,
                                    </span>
                                    <span className="ms-1">1:56 PM</span>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="col-auto text-center me-2">
                            <a
                              href="#"
                              className="badge-dot bg-secondary"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Mark as unread"
                            ></a>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="border-top px-3 pt-3 pb-0">
                      <a
                        href="notification-history.html"
                        className="text-link fw-semi-bold"
                      >
                        See all Notifications
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="dropdown ms-2">
                <a
                  className="rounded-circle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar avatar-md avatar-indicators avatar-online">
                    <img
                      alt="avatar"
                      src="../assets/images/avatar/avatar-1.jpg"
                      className="rounded-circle"
                    />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end shadow">
                  <div className="dropdown-item">
                    <div className="d-flex">
                      <div className="avatar avatar-md avatar-indicators avatar-online">
                        <img
                          alt="avatar"
                          src="../assets/images/avatar/avatar-1.jpg"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="ms-3 lh-1">
                        <h5 className="mb-1">Annette Black</h5>
                        <p className="mb-0 text-muted">annette@geeksui.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <ul className="list-unstyled">
                    <li className="dropdown-submenu">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        <i className="fe fe-circle me-2" />
                        Status
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="badge-dot bg-success me-2" />
                            Online
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="badge-dot bg-secondary me-2" />
                            Offline
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="badge-dot bg-warning me-2" />
                            Away
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="badge-dot bg-danger me-2" />
                            Busy
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="profile-edit.html">
                        <i className="fe fe-user me-2" />
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="student-subscriptions.html"
                      >
                        <i className="fe fe-star me-2" />
                        Subscription
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="fe fe-settings me-2" />
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="dropdown-divider" />
                  <ul className="list-unstyled">
                    <li>
                      <a className="dropdown-item" href="../index-2.html">
                        <i className="fe fe-power me-2" />
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            {/* Button */}
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-default"
              aria-controls="navbar-default"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar mt-0" />
              <span className="icon-bar middle-bar" />
              <span className="icon-bar bottom-bar" />
            </button>
            {/* Collapse */}
            <div className="collapse navbar-collapse" id="navbar-default">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarBrowse"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-display="static"
                  >
                    Browse
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-arrow"
                    aria-labelledby="navbarBrowse"
                  >
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        Web Development
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Bootstrap
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            React
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            GraphQl
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Gatsby
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Grunt
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Svelte
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Meteor
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            HTML5
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Angular
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        Design
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Graphic Design
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Illustrator
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            UX / UI Design
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Figma Design
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Adobe XD
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Sketch
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Icon Design
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Photoshop
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Mobile App
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        IT Software
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Marketing
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Music
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Life Style
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Business
                      </a>
                    </li>
                    <li>
                      <a href="course-category.html" className="dropdown-item">
                        Photography
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarLanding"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Landings
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarLanding">
                    <li>
                      <h4 className="dropdown-header">Landings</h4>
                    </li>
                    <li>
                      <a
                        href="landings/landing-courses.html"
                        className="dropdown-item"
                      >
                        Courses
                      </a>
                    </li>
                    <li>
                      <a
                        href="landings/course-lead.html"
                        className="dropdown-item"
                      >
                        Lead Course
                      </a>
                    </li>
                    <li>
                      <a
                        href="landings/request-access.html"
                        className="dropdown-item"
                      >
                        Request Access
                      </a>
                    </li>
                    <li>
                      <a
                        href="landings/landing-sass.html"
                        className="dropdown-item"
                      >
                        SaaS
                        <span className="badge bg-light-danger text-danger ms-2">
                          New
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarPages"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-arrow"
                    aria-labelledby="navbarPages"
                  >
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#!"
                      >
                        Courses
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-single.html"
                          >
                            Course Single
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-single-v2.html"
                          >
                            Course Single v2
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-resume.html"
                          >
                            Course Resume
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-category.html"
                          >
                            Course Category
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-checkout.html"
                          >
                            Course Checkout
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="course-filter-list.html"
                          >
                            Course List/Grid
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="add-course.html">
                            Add New Course
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#!"
                      >
                        Paths
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="course-path.html" className="dropdown-item">
                            Browse Path
                          </a>
                        </li>
                        <li>
                          <a
                            href="course-path-single.html"
                            className="dropdown-item"
                          >
                            Path Single
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#!"
                      >
                        Blog
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="blog.html">
                            Listing
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="blog-single.html">
                            Article
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="blog-category.html"
                          >
                            Category
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="blog-sidebar.html">
                            Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#!"
                      >
                        Career
                        <span className="badge bg-light-danger text-danger ms-2">
                          New
                        </span>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="career.html">
                            Overview
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="career-list.html">
                            Listing
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="career-single.html"
                          >
                            Opening
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#!"
                      >
                        Specialty
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="coming-soon.html">
                            Coming Soon
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="404-error.html">
                            Error 404
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="maintenance-mode.html"
                          >
                            Maintenance Mode
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="terms-condition-page.html"
                          >
                            Terms &amp; Conditions
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <hr className="mx-3" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="about.html">
                        About
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Help Center{" "}
                        <span className="badge badge-success ms-1">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pricing.html">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="compare-plan.html">
                        Compare Plan
                        <span className="badge bg-light-danger text-danger ms-2">
                          New
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="contact.html">
                        Contact
                        <span className="badge bg-light-danger text-danger ms-2">
                          New
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarAccount"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Accounts
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-arrow"
                    aria-labelledby="navbarAccount"
                  >
                    <li>
                      <h4 className="dropdown-header">Accounts</h4>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        Instructor
                      </a>
                      <ul className="dropdown-menu">
                        <li className="text-wrap">
                          <h5 className="dropdown-header text-dark">
                            Instructor
                          </h5>
                          <p className="dropdown-text mb-0">
                            Instructor dashboard for manage courses and earning.
                          </p>
                        </li>
                        <li>
                          <hr className="mx-3" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-instructor.html"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-profile.html"
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-courses.html"
                          >
                            My Courses
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-order.html"
                          >
                            Orders
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-reviews.html"
                          >
                            Reviews
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-students.html"
                          >
                            Students
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-payouts.html"
                          >
                            Payouts
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="instructor-earning.html"
                          >
                            Earning
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        Students
                      </a>
                      <ul className="dropdown-menu">
                        <li className="text-wrap">
                          <h5 className="dropdown-header text-dark">
                            Students
                          </h5>
                          <p className="dropdown-text mb-0">
                            Students dashboard to manage your courses and
                            subscriptions.
                          </p>
                        </li>
                        <li>
                          <hr className="mx-3" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-student.html"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="student-subscriptions.html"
                          >
                            Subscriptions
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="payment-method.html"
                          >
                            Payments
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="billing-info.html">
                            Billing Info
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="invoice.html">
                            Invoice
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="invoice-details.html"
                          >
                            Invoice Details
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-student.html"
                          >
                            Bookmarked
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-student.html"
                          >
                            My Path
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu dropend">
                      <a
                        className="dropdown-item dropdown-list-group-item dropdown-toggle"
                        href="#"
                      >
                        Admin
                      </a>
                      <ul className="dropdown-menu">
                        <li className="text-wrap">
                          <h5 className="dropdown-header text-dark">
                            Master Admin
                          </h5>
                          <p className="dropdown-text mb-0">
                            Master admin dashboard to manage courses, user, site
                            setting , and work with amazing apps.
                          </p>
                        </li>
                        <li>
                          <hr className="mx-3" />
                        </li>
                        <li className="px-3 d-grid">
                          <a
                            href="dashboard/admin-dashboard.html"
                            className="btn btn-sm btn-primary"
                          >
                            Go to Dashboard
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <hr className="mx-3" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="sign-in.html">
                        Sign In
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="sign-up.html">
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="forget-password.html">
                        Forgot Password
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="profile-edit.html">
                        Edit Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="security.html">
                        Security
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="social-profile.html">
                        Social Profiles
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="notifications.html">
                        Notifications
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="profile-privacy.html">
                        Privacy Settings
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="delete-profile.html">
                        Delete Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="linked-accounts.html">
                        Linked Accounts
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fe fe-more-horizontal fs-3" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-md"
                    aria-labelledby="navbarDropdown"
                  >
                    <div className="list-group">
                      <a
                        className="list-group-item list-group-item-action border-0"
                        href="../docs/index.html"
                      >
                        <div className="d-flex align-items-center">
                          <i className="fe fe-file-text fs-3 text-primary" />
                          <div className="ms-3">
                            <h5 className="mb-0">Documentations</h5>
                            <p className="mb-0 fs-6">
                              Browse the all documentation
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        className="list-group-item list-group-item-action border-0"
                        href="../docs/changelog.html"
                      >
                        <div className="d-flex align-items-center">
                          <i className="fe fe-layers fs-3 text-primary" />
                          <div className="ms-3">
                            <h5 className="mb-0">
                              Changelog{" "}
                              <span className="text-primary ms-1">v2.2.0</span>
                            </h5>
                            <p className="mb-0 fs-6">See what's new</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
                <span className="position-absolute ps-3 search-icon">
                  <i className="fe fe-search" />
                </span>
                <input
                  type="search"
                  className="form-control ps-6"
                  placeholder="Search Courses"
                />
              </form>
              <ul className="navbar-nav navbar-right-wrap ms-auto d-none d-lg-block">
                <li className="dropdown d-inline-block stopevent">
                  <a
                    className="btn btn-light btn-icon rounded-circle text-muted indicator indicator-primary"
                    href="#"
                    role="button"
                    id="dropdownNotificationSecond"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fe fe-bell"> </i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end dropdown-menu-lg"
                    aria-labelledby="dropdownNotificationSecond"
                  >
                    <div>
                      <div className="border-bottom px-3 pb-3 d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">Notifications</span>
                        <a href="# " className="text-muted">
                          <span className="align-middle">
                            <i className="fe fe-settings me-1" />
                          </span>
                        </a>
                      </div>
                      <ul className="list-group list-group-flush notification-list-scroll ">
                        <li className="list-group-item bg-light">
                          <div className="row">
                            <div className="col">
                              <a className="text-body" href="#">
                                <div className="d-flex">
                                  <img
                                    src="../assets/images/avatar/avatar-1.jpg"
                                    alt=""
                                    className="avatar-md rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <h5 className="fw-bold mb-1">
                                      Kristin Watson:
                                    </h5>
                                    <p className="mb-3">
                                      Krisitn Watsan like your comment on course
                                      Javascript Introduction!
                                    </p>
                                    <span className="fs-6 text-muted">
                                      <span>
                                        <span className="fe fe-thumbs-up text-success me-1" />
                                        2 hours ago,
                                      </span>
                                      <span className="ms-1">2:19 PM</span>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="col-auto text-center me-2">
                              <a
                                href="#"
                                className="badge-dot bg-info"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Mark as read"
                              ></a>
                              <div>
                                <a
                                  href="#"
                                  className="bg-transparent"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Remove"
                                >
                                  <i className="fe fe-x text-muted" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col">
                              <a className="text-body" href="#">
                                <div className="d-flex">
                                  <img
                                    src="../assets/images/avatar/avatar-2.jpg"
                                    alt=""
                                    className="avatar-md rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <h5 className="fw-bold mb-1">
                                      Brooklyn Simmons
                                    </h5>
                                    <p className="mb-3">
                                      Just launched a new Courses React for
                                      Beginner.
                                    </p>
                                    <span className="fs-6 text-muted">
                                      <span>
                                        <span className="fe fe-thumbs-up text-success me-1" />
                                        Oct 9,
                                      </span>
                                      <span className="ms-1">1:20 PM</span>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="col-auto text-center me-2">
                              <a
                                href="#"
                                className="badge-dot bg-secondary"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Mark as unread"
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col">
                              <a className="text-body" href="#">
                                <div className="d-flex">
                                  <img
                                    src="../assets/images/avatar/avatar-3.jpg"
                                    alt=""
                                    className="avatar-md rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <h5 className="fw-bold mb-1">
                                      Jenny Wilson
                                    </h5>
                                    <p className="mb-3">
                                      Krisitn Watsan like your comment on course
                                      Javascript Introduction!
                                    </p>
                                    <span className="fs-6 text-muted">
                                      <span>
                                        <span className="fe fe-thumbs-up text-info me-1" />
                                        Oct 9,
                                      </span>
                                      <span className="ms-1">1:56 PM</span>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="col-auto text-center me-2">
                              <a
                                href="#"
                                className="badge-dot bg-secondary"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Mark as unread"
                              ></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col">
                              <a className="text-body" href="#">
                                <div className="d-flex">
                                  <img
                                    src="../assets/images/avatar/avatar-4.jpg"
                                    alt=""
                                    className="avatar-md rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <h5 className="fw-bold mb-1">Sina Ray</h5>
                                    <p className="mb-3">
                                      You earn new certificate for complete the
                                      Javascript Beginner course.
                                    </p>
                                    <span className="fs-6 text-muted">
                                      <span>
                                        <span className="fe fe-award text-warning me-1" />
                                        Oct 9,
                                      </span>
                                      <span className="ms-1">1:56 PM</span>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="col-auto text-center me-2">
                              <a
                                href="#"
                                className="badge-dot bg-secondary"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Mark as unread"
                              ></a>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="border-top px-3 pt-3 pb-0">
                        <a
                          href="notification-history.html"
                          className="text-link fw-semi-bold"
                        >
                          See all Notifications
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dropdown ms-2 d-inline-block">
                  <a
                    className="rounded-circle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                      <img
                        alt="avatar"
                        src="../assets/images/avatar/avatar-1.jpg"
                        className="rounded-circle"
                      />
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="dropdown-item">
                      <div className="d-flex">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                          <img
                            alt="avatar"
                            src="../assets/images/avatar/avatar-1.jpg"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="ms-3 lh-1">
                          <h5 className="mb-1">Annette Black</h5>
                          <p className="mb-0 text-muted">annette@geeksui.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <ul className="list-unstyled">
                      <li className="dropdown-submenu dropstart-lg">
                        <a
                          className="dropdown-item dropdown-list-group-item dropdown-toggle"
                          href="#"
                        >
                          <i className="fe fe-circle me-2" />
                          Status
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="badge-dot bg-success me-2" />
                              Online
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="badge-dot bg-secondary me-2" />
                              Offline
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="badge-dot bg-warning me-2" />
                              Away
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <span className="badge-dot bg-danger me-2" />
                              Busy
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a className="dropdown-item" href="profile-edit.html">
                          <i className="fe fe-user me-2" />
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="student-subscriptions.html"
                        >
                          <i className="fe fe-star me-2" />
                          Subscription
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fe fe-settings me-2" />
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown-divider" />
                    <ul className="list-unstyled">
                      <li>
                        <a className="dropdown-item" href="../index-2.html">
                          <i className="fe fe-power me-2" />
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="pt-5 pb-5">
          <div className="container">
            {/* User info */}
            <div className="row align-items-center">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                {/* Bg */}
                <div
                  className="pt-16 rounded-top-md"
                  style={{
                    background:
                      "url(../assets/images/background/profile-bg.jpg) no-repeat",
                    backgroundSize: "cover",
                  }}
                />
                <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                      <img
                        src="../assets/images/avatar/avatar-3.jpg"
                        className="avatar-xl rounded-circle border border-4 border-white"
                        alt=""
                      />
                    </div>
                    <div className="lh-1">
                      <h2 className="mb-0">
                        {/* Stella Flores */}
                        {userDetail?.fname + " " + userDetail?.lname}
                        <a
                          href="#"
                          className="text-decoration-none"
                          data-bs-toggle="tooltip"
                          data-placement="top"
                          title="Beginner"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x={3}
                              y={8}
                              width={2}
                              height={6}
                              rx={1}
                              fill="#754FFE"
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
                        </a>
                      </h2>
                    </div>
                  </div>
                  <div>
                    <a
                      href="/order"
                      className="btn btn-outline-primary btn-sm d-none d-md-block"
                    >
                      Go to My Courses
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="row mt-0 mt-md-4">
              {/* <div className="col-lg-3 col-md-4 col-12"> */}
              {/* Side navbar */}
              {/* <nav className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"> */}
              {/* Menu */}
              {/* <a
                    className="d-xl-none d-lg-none d-md-none text-inherit fw-bold"
                    href="#"
                  >
                    Menu
                  </a>
                  {/* Button */}
              {/* <button
                    className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="fe fe-menu" />
                  </button> */}
              {/* Collapse navbar */}
              {/* <div className="collapse navbar-collapse" id="sidenav">
                    <div className="navbar-nav flex-column">
                      <span className="navbar-header">Subscription</span> */}
              {/* List */}
              {/* <ul className="list-unstyled ms-n2 mb-4"> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a
                            className="nav-link"
                            href="student-subscriptions.html"
                          >
                            <i className="fe fe-calendar nav-icon" />
                            My Subscriptions
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="billing-info.html">
                            <i className="fe fe-credit-card nav-icon" />
                            Billing Info
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="payment-method.html">
                            <i className="fe fe-credit-card nav-icon" />
                            Payment
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="invoice.html">
                            <i className="fe fe-clipboard nav-icon" />
                            Invoice
                          </a>
                        </li> */}
              {/* </ul> */}
              {/* <span className="navbar-header">Account Settings</span> */}
              {/* List */}
              {/* <ul className="list-unstyled ms-n2 mb-0"> */}
              {/* Nav item */}
              {/* <li className="nav-item active">
                          <a className="nav-link" href="profile-edit.html">
                            <i className="fe fe-settings nav-icon" />
                            Edit Profile
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="security.html">
                            <i className="fe fe-user nav-icon" />
                            Security
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="social-profile.html">
                            <i className="fe fe-refresh-cw nav-icon" />
                            Social Profiles
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="notifications.html">
                            <i className="fe fe-bell nav-icon" />
                            Notifications
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="profile-privacy.html">
                            <i className="fe fe-lock nav-icon" />
                            Profile Privacy
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="delete-profile.html">
                            <i className="fe fe-trash nav-icon" />
                            Delete Profile
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link " href="linked-accounts.html">
                            <i className="fe fe-user nav-icon" />
                            Linked Accounts
                          </a>
                        </li> */}
              {/* Nav item */}
              {/* <li className="nav-item">
                          <a className="nav-link" href="../index-2.html">
                            <i className="fe fe-power nav-icon" />
                            Sign Out
                          </a>
                        </li> */}
              {/* </ul>
                    </div> */}
              {/* </div> */}
              {/* </nav>
              </div> */}
              <div className="col-lg-9 col-md-8 col-12">
                {/* Card */}
                <div className="card">
                  {/* Card header */}
                  <div className="card-header">
                    <h3 className="mb-0">Profile Details</h3>
                    <p className="mb-0">
                      You have full control to manage your own account setting.
                    </p>
                  </div>
                  {/* Card body */}
                  <div className="card-body">
                    <div className="d-lg-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center mb-4 mb-lg-0">
                        <img
                          src="../assets/images/avatar/avatar-3.jpg"
                          id="img-uploaded"
                          className="avatar-xl rounded-circle"
                          alt=""
                        />
                        <div className="ms-3">
                          <h4 className="mb-0">Your avatar</h4>
                          <div className="w-full overflow-x-scroll flex ">
                            {images &&
                              images.map((photo, index) => {
                                return (
                                  <React.Fragment>
                                    {index === 0 ? (
                                      <div
                                        className="w-1/5 h-35vh m-2 relative top-0 z-10 flex items-center flex-col"
                                        key={index}
                                      >
                                        <img src={photo} />
                                        <svg
                                          onClick={() => removeImage(index)}
                                          className="remove-icon mt-2"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 44 44"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <circle
                                            cx="22"
                                            cy="22"
                                            r="17"
                                            fill="white"
                                          />
                                          <path d="M22 0.222656C9.91992 0.222656 0.125 10.0176 0.125 22.0977C0.125 34.1777 9.91992 43.9727 22 43.9727C34.0801 43.9727 43.875 34.1777 43.875 22.0977C43.875 10.0176 34.0801 0.222656 22 0.222656ZM32.5762 29.4707C32.7227 29.6172 32.8008 29.8125 32.8008 30.0176C32.8008 30.2227 32.7227 30.4277 32.5762 30.5645L30.4668 32.6836C30.3105 32.8398 30.1152 32.9082 29.9199 32.9082C29.7246 32.9082 29.5195 32.8301 29.373 32.6836L22 25.3008L14.6367 32.6934C14.4902 32.8496 14.2852 32.918 14.0898 32.918C13.8945 32.918 13.6895 32.8398 13.543 32.6934L11.4336 30.5742C11.2871 30.4277 11.209 30.2324 11.209 30.0273C11.209 29.8223 11.2871 29.6172 11.4336 29.4805L18.8262 22.0586L11.4141 14.7344C11.1113 14.4316 11.1113 13.9336 11.4141 13.6309L13.5234 11.5117C13.6699 11.3652 13.8652 11.2871 14.0703 11.2871C14.2754 11.2871 14.4707 11.3652 14.6172 11.5117L22.0098 18.8066L29.4023 11.5117C29.5488 11.3652 29.7441 11.2871 29.9492 11.2871C30.1543 11.2871 30.3496 11.3652 30.4961 11.5117L32.6055 13.6309C32.9082 13.9336 32.9082 14.4316 32.6055 14.7344L25.1934 22.0586L32.5762 29.4707Z" />
                                        </svg>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </div>
                          <div className="bg-white rounded-md pl-3 w-max  broder-solid  border-gray-200 border-2">
                            <input
                              type="file"
                              onChange={(e) => imageChange(e.target.files)}
                              accept="image/png, image/jpeg"
                              single
                            />

                            <button
                              className="btn btn-primary"
                              onClick={uploadImage}
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div>
                        <a href="#" className="btn btn-outline-white btn-sm">
                          Update
                        </a>
                        <a href="#" className="btn btn-outline-danger btn-sm">
                          Delete
                        </a>
                      </div> */}
                    </div>
                    <hr className="my-5" />
                    <div>
                      <h4 className="mb-0">Personal Details</h4>
                      <p className="mb-4">
                        Edit your personal information and address.
                      </p>
                      {/* Form */}
                      <form className="row">
                        {/* First name */}
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="fname">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="fname"
                            className="form-control"
                            placeholder="First Name"
                            required
                            value={userDetail.fname}
                            onChange={(e) => {
                              setUserDetail({
                                ...userDetail,
                                fname: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {/* Last name */}
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="lname">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lname"
                            className="form-control"
                            placeholder="Last Name"
                            required
                            value={userDetail.lname}
                            onChange={(e) => {
                              setUserDetail({
                                ...userDetail,
                                lname: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {/* Phone */}
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="phone">
                            Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="form-control"
                            placeholder="Phone"
                            required
                            value={userDetail.mobile}
                            onChange={(e) => {
                              setUserDetail({
                                ...userDetail,
                                mobile: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {/* Birthday */}
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="birth">
                            Birthday
                          </label>
                          <input
                            className="form-control flatpickr"
                            type="text"
                            placeholder="1998-03-14"
                            id="birth"
                            name="birth"
                            value={userDetail.dob.split('T')[0]}
                            onChange={(e) => {
                              setUserDetail({
                                ...userDetail,
                                dob: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {/* Address */}
                        {/* <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="address">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Address"
                            required
                          />
                        </div> */}
                        {/* Address */}
                        {/* <div className="mb-3 col-12 col-md-6">
                          <label className="form-label" htmlFor="address2">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            id="address2"
                            className="form-control"
                            placeholder="Address"
                            required
                          />
                        </div> */}
                        {/* State */}
                        {/* <div className="mb-3 col-12 col-md-6">
                          <label className="form-label">State</label>
                          <select className="selectpicker" data-width="100%">
                            <option value>Select State</option>
                            <option value={1}>Gujarat</option>
                            <option value={2}>Rajasthan</option>
                            <option value={3}>Maharashtra</option>
                          </select>
                        </div> */}
                        {/* Country */}
                        {/* <div className="mb-3 col-12 col-md-6">
                          <label className="form-label">Country</label>
                          <select className="selectpicker" data-width="100%">
                            <option value>Select Country</option>
                            <option value={1}>India</option>
                            <option value={2}>UK</option>
                            <option value={3}>USA</option>
                          </select>
                        </div> */}
                        <div className="col-12">
                          {/* Button */}
                          <button
                            className="btn btn-primary"
                            onClick={updateProfile}
                          >
                            Update Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        {/* Footer */}
        <div className="footer">
          <div className="container">
            <div className="row align-items-center g-0 border-top py-2">
              {/* Desc */}
              <div className="col-md-6 col-12 text-center text-md-start">
                <span>© 2021 Geeks. All Rights Reserved.</span>
              </div>
              {/* Links */}
              <div className="col-12 col-md-6">
                <nav className="nav nav-footer justify-content-center justify-content-md-end">
                  <a className="nav-link active ps-0" href="#">
                    Privacy
                  </a>
                  <a className="nav-link" href="#">
                    Terms{" "}
                  </a>
                  <a className="nav-link" href="#">
                    Feedback
                  </a>
                  <a className="nav-link" href="#">
                    Support
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Scripts */}
        {/* Libs JS */}
        {/* clipboard */}
        {/* Theme JS */}
        {/* Mirrored from codescandy.com/geeks-bootstrap-5/pages/profile-edit.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 18 Aug 2021 15:06:37 GMT */}
      </div>
    </div>
  );
};

export default profile;
