import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Collapse,
  Form,
  Label,
  Input,
} from "reactstrap";

import Link from "next/link";
import defaultAvatar from "../../../public/content/img/avatar/user-profile-default.png";
import Pagination from "@material-ui/lab/Pagination";
import store from "../../redux/store/store";
import AuthenticationService from "../../services/AuthenticationService";
import CourseManagerService from "../../services/CourseManagerService";
import AnalyticsService from "../../services/AnalyticsService";

import { useSelector } from "react-redux";
import Axios from "axios";
import API_URL from "../../utils/API_URL";

export default () => {
  const router = useRouter();
  const [collapsePersonalDetails, setCollapsePersonalDetails] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [likedCourses, setLikedCourses] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [currentLikePage, setCurrentLikePage] = useState(1);
  const [currentSavePage, setCurrentSavePage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [dribbble, setDribbble] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const { user } = useSelector((state) => state.auth);

  const likePagesCount = Math.ceil(likedCourses.length / coursesPerPage);
  const savePagesCount = Math.ceil(savedCourses.length / coursesPerPage);
  let isLoggedInUser = false;

  if (typeof Storage !== "undefined") {
    const localStorageState = JSON.parse(localStorage.getItem("state"));
    if (
      localStorageState.auth.isAuthenticated &&
      localStorageState.auth.user.email === store.getState().auth.user.email
    ) {
      isLoggedInUser = true;
    } else {
      // router.push("/signup");
    }
  }

  useEffect(async () => {
    getProfileData();
    AnalyticsService.logPageView(
      window.location.pathname + window.location.search
    );

    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    // console.log(token);
    // console.log(localStorage.getItem("userInfo"));
    try {
      const res = await Axios.get(`${API_URL}/getMyProfile`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "json" },
      });
      // console.log(res.data);
      setName(res.data.name);
      setUserProfile(res.data);
      // alert(res.data);
    } catch (e) {
      alert(e);
    }
  }, []);

  const getProfileData = async () => {
    if (isLoggedInUser) {
      // const data = await AuthenticationService.getUserProfile();
      // if (data) {
      //   const { name, bio, linkedin, website, dribbble, github, twitter } =
      //     data.profile;
      //   setUserProfile(data.profile);
      //   setName(name ? name : "");
      //   setLinkedin(linkedin ? linkedin : "");
      //   setGithub(github ? github : "");
      //   setTwitter(twitter ? twitter : "");
      //   setBio(bio ? bio : "");
      //   setWebsite(website ? website : "");
      //   setDribbble(dribbble ? dribbble : "");
      // }
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  };

  const handleDribbbleChange = (e) => {
    setDribbble(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const handleLinkedInChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const savedProfileData = await AuthenticationService.updateUserProfile({
        bio,
        linkedin,
        github,
        twitter,
        dribbble,
        website,
        name,
      });

      if (savedProfileData) {
        setUserProfile(savedProfileData);
        setCollapsePersonalDetails(!collapsePersonalDetails);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="9" className="pl-lg-5 offset-md-2">
            <h3 className="hero-heading mb-0">
              {userProfile ? userProfile.name : ""}
            </h3>
            <div className="text-block">
              <hr />
              <p>{userProfile ? userProfile.bio : ""}</p>
              <Row className="mb-3">
                <Col sm="9">
                  <h5>Personal details</h5>
                </Col>
                {isLoggedInUser && (
                  <Col sm="3" className="text-right">
                    <Button
                      color="link"
                      className="pl-0 text-primary collapsed"
                      onClick={() =>
                        setCollapsePersonalDetails(!collapsePersonalDetails)
                      }
                    >
                      Update
                    </Button>
                  </Col>
                )}
              </Row>
              {userProfile && (
                <p>
                  <i
                    className="fas fa-envelope-square"
                    style={{ fontSize: 25 }}
                  ></i>
                  <strong style={{ marginLeft: 10 }}>
                    Your email address:
                  </strong>
                  <br />
                  <a
                    href={`mailto:${userProfile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {" " + userProfile.email}
                  </a>
                </p>
              )}
              {userProfile && (
                <p>
                  <i className="fas fa-portrait" style={{ fontSize: 25 }}></i>
                  <strong style={{ marginLeft: 10 }}>
                    Your personal website:
                  </strong>
                  <br />
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {" " + userProfile.website}
                  </a>
                </p>
              )}
              {userProfile && (
                <p>
                  <i
                    className="fab fa-twitter-square"
                    style={{ fontSize: 25 }}
                  ></i>
                  <strong style={{ marginLeft: 10 }}>
                    Your twitter profile:
                  </strong>
                  <br />
                  <a
                    href={userProfile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {" " + userProfile.twitter}
                  </a>
                </p>
              )}
              {userProfile && (
                <p>
                  <i className="fab fa-linkedin" style={{ fontSize: 25 }}></i>
                  <strong style={{ marginLeft: 10 }}>
                    Your linkedin profile:
                  </strong>
                  <br />
                  <a
                    href={userProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {" " + userProfile.linkedin}
                  </a>
                </p>
              )}
              {userProfile && (
                <p>
                  <i
                    className="fab fa-github-square"
                    style={{ fontSize: 25 }}
                  ></i>
                  <strong style={{ marginLeft: 10 }}>
                    Your github profile:
                  </strong>
                  <br />
                  <a
                    href={userProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {" " + userProfile.github}
                  </a>
                </p>
              )}
              {userProfile && (
                <p>
                  <i className="fab fa-dribbble" style={{ fontSize: 25 }} />
                  <strong style={{ marginLeft: 10 }}>
                    Your dribbble profile:
                  </strong>
                  <br />
                  <a
                    href={userProfile.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 35 }}
                  >
                    {userProfile.dribbble}
                  </a>
                </p>
              )}
              <Collapse isOpen={collapsePersonalDetails}>
                <Form onSubmit={handleSubmit}>
                  <Row className="pt-4">
                    <Col md="6" className="form-group">
                      <Label for="name" className="form-label">
                        Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleNameChange}
                        defaultValue={name}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Name Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="twitter" className="form-label">
                        Twitter
                      </Label>
                      <Input
                        type="text"
                        name="twitter"
                        id="twitter"
                        onChange={handleTwitterChange}
                        defaultValue={twitter}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Twitter Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="linkedin" className="form-label">
                        LinkedIn
                      </Label>
                      <Input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        onChange={handleLinkedInChange}
                        defaultValue={linkedin}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked LinkedIn Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="github" className="form-label">
                        GitHub
                      </Label>
                      <Input
                        type="text"
                        name="github"
                        id="github"
                        onChange={handleGithubChange}
                        defaultValue={github}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Github Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="website" className="form-label">
                        Website
                      </Label>
                      <Input
                        type="text"
                        name="website"
                        id="website"
                        onChange={handleWebsiteChange}
                        defaultValue={website}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Website Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="dribbble" className="form-label">
                        Dribbble
                      </Label>
                      <Input
                        type="text"
                        name="dribbble"
                        id="dribbble"
                        onChange={handleDribbbleChange}
                        defaultValue={dribbble}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Dribbble Input"
                          )
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <Label for="dribbble" className="form-label">
                        Bio
                      </Label>
                      <Input
                        type="textarea"
                        name="dribbble"
                        id="dribbble"
                        onChange={handleBioChange}
                        defaultValue={bio}
                        onFocus={() =>
                          AnalyticsService.setEvent(
                            "Profile",
                            "Clicked Bio Input"
                          )
                        }
                      />
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    color="outline-primary"
                    className=" mb-4"
                  >
                    Save
                  </Button>
                </Form>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
