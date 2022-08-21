import React, { useEffect, useState } from "react";
import CourseManagerService from "../services/CourseManagerService";
import AnalyticsService from "../services/AnalyticsService";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Swiper from "./Swiper";

const UserDashboard = ({ user }) => {

  const [likedCourses, setLikedCourses] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const { isAuthenticated} = useSelector((state) => state.auth);
  

  useEffect(() => {
    getLikedCourses();
    getSavedCourses();
  }, []);

  const getLikedCourses = async () => {
    try {
      const likedCourses = await CourseManagerService.getUserLikedCourses(
        user.email
      );
      if (likedCourses !== false) {
        setLikedCourses(likedCourses);
      } else if (likedCourses === []) {
        setLikedCourses(likedCourses)
      }
    } catch (error) {
      alert("something went wrong, but we're working on it!");
      AnalyticsService.setEvent(
        "Error",
        "Failed to retrieve liked courses on dashboard",
        "Course Like"
      );
    }
  
  };

  const getSavedCourses = async () => {
    try {
      const savedCourses = await CourseManagerService.getUserSavedCourses(
        user.email
      );
      if (savedCourses !== false) {
        setSavedCourses(savedCourses);
      } else if (savedCourses === []) {
        setSavedCourses(savedCourses)
      }
    } catch (error) {
      alert("something went wrong, but we're working on it!");
      AnalyticsService.setEvent(
        "Error",
        "Failed to retrieve saved courses on dashboard",
        "Course Save"
      );
    }
  };

  const handleDeleteCourseSave = async (e,titleKey) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        await CourseManagerService.deleteCourseSave(
          titleKey,
          user.email
        );
        await getLikedCourses();
        await getSavedCourses();
      } catch (error) {
        alert("Something went wrong, but we're working on it!");
        AnalyticsService.setEvent(
          "Error",
          "Failed to delete a course save",
          "Course Save"
        );
      }
    }
  };

  const handleDeleteCourseLike = async (e,titleKey) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        await CourseManagerService.deleteCourseLike(
          titleKey,
          user.email
        );
        await getLikedCourses();
        await getSavedCourses();
      } catch (error) {
        alert("Something went wrong, but we're working on it!");
        AnalyticsService.setEvent(
          "Error",
          "Failed to delete a course like",
          "Course Like"
        );
      }
    }
  };


  return (
    <>
      {likedCourses.length > 0 && (
          <section className="py-5 bg-gray-50">

        <Container>
          <Row className="mb-5">
            <Col md="8">
              <p className="subtitle text-secondary">
                Revisit Your Liked Courses{" "}
              </p>
              <h2>Your Liked Courses</h2>
            </Col>
          </Row>
          <Swiper
            className="swiper-container-mx-negative pt-3 pb-5"
            perView={1}
            spaceBetween={20}
            roundLengths
            md={2}
            lg={3}
            xl={4}
            data={likedCourses}
            data2={savedCourses}
            cards
            handleDeleteCourseSave={handleDeleteCourseSave}
            handleDeleteCourseLike={handleDeleteCourseLike}
          />
        </Container>
        </section>

      )}
      {savedCourses.length > 0 && (
          <section className="py-6 bg-gray-100">

        <Container>
          <Row className="mb-5">
            <Col md="8">
              <p className="subtitle text-secondary">
                Revisit Your Saved Courses{" "}
              </p>
              <h2>Your Saved Courses</h2>
            </Col>
          </Row>
          <Swiper
            className="swiper-container-mx-negative pt-3 pb-5"
            perView={1}
            spaceBetween={20}
            roundLengths
            md={2}
            lg={3}
            xl={4}
            data={savedCourses}
            data2={likedCourses}
            cards
            handleDeleteCourseSave={handleDeleteCourseSave}
            handleDeleteCourseLike={handleDeleteCourseLike}
          />
        </Container>
        </section>

      )}  
    </>
  );
};

export default UserDashboard;
