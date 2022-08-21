import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Image } from "semantic-ui-react";
import CourseManagerService from "../services/CourseManagerService";
import AnalyticsService from "../services/AnalyticsService";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

import datacampImages from '../utils/datacamp_images';

export default ({course, handleError}) => {
  const [courseLiked, setCourseLiked] = useState(null);
  const [courseSaved, setCourseSaved] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * datacampImages.length));
  const { email } = user;

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getUserLikedCourse();
    await getUserSavedCourse();
  };

  const getUserLikedCourse = async () => {
    try {
      if (isAuthenticated) {
        const userLiked = await CourseManagerService.checkLikedCourse(
          course.title_key,
          email
        );
        setCourseLiked(userLiked);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getUserSavedCourse = async () => {
    try {
      const userSaved = await CourseManagerService.checkSavedCourse(
        course.title_key,
        email
      );
      setCourseSaved(userSaved);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCourseSaveSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const newSave = await CourseManagerService.addSaveToCourse(
          course.title_key,
          email
        );
        if (newSave) {
          setCourseSaved(true);
        } else {
          handleError("Course could not be saved at this time");
        }
      } catch (error) {
        handleError("Something went wrong, but we're working on it!");
        AnalyticsService.setEvent(
          "Error",
          "Failed to add a course save",
          "Course Save"
        );
      }
    } else {
      handleError("You must sign in to save a course");
    }
  };

  const handleDeleteCourseSave = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const isDeleted = await CourseManagerService.deleteCourseSave(
          course.title_key,
          email
        );

        if (isDeleted !== false) {
          setCourseSaved(false);
        } else {
          handleError("Course could not be unliked at this time");
        }
      } catch (error) {
        handleError("Something went wrong, but we're working on it!");
        AnalyticsService.setEvent(
          "Error",
          "Failed to delete a course save",
          "Course Save"
        );
      }
    }
  };

  const handleCourseLikeSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const newLike = await CourseManagerService.addLikeToCourse(
          course.title_key,
          email
        );
        if (newLike) {
          setCourseLiked(true);
        } else {
          handleError("Course could not be liked at this time");
        }
      } catch (error) {
        handleError("Something went wrong, but we're working on it!");

        AnalyticsService.setEvent(
          "Error",
          "Failed to like a course",
          "Course Like"
        );
      }
    } else {
      handleError("You must sign in to like a course");
      AnalyticsService.setEvent(
        "Error",
        "Failed to like a course",
        "Course Like"
      );
    }
  };

  const handleDeleteCourseLike = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const isDeleted = await CourseManagerService.deleteCourseLike(
          course.title_key,
          email
        );

        if (isDeleted !== false) {
          setCourseLiked(false);
        } else {
          handleError("Course could not be unliked at this time");
          AnalyticsService.setEvent(
            "Error",
            "Failed to delete a course like",
            "Course Like"
          );
        }
      } catch (error) {
        handleError("Something went wrong, but we're working on it!");
        AnalyticsService.setEvent(
          "Error",
          "Failed to delete a course like",
          "Course Like"
        );
      }
    }
  };

  function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

  function extractContent(s) {
    //Extract text from html
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };


  return (
    <>
      <Card
        className="h-100 border-0 shadow"
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        <div className="card-img-top overflow-hidden gradient-overlay">
          <div className="embed-responsive embed-responsive-16by9">
            <img
              src={course.provider == "datacamp" ?
                datacampImages[randomIndex]
              : course.thumbnail_url}
              alt={course.title}
              className="img-fluid embed-responsive-item"
            />
          </div>
          <Link
            href={`/course/${course.title_key}`}
            as={`/course/${course.title_key}`}
          >
            <a className="tile-link" />
          </Link>
          <div className="card-img-overlay-bottom z-index-20"></div>
        </div>
        <div className="card-img-overlay-top d-flex justify-content-between">
        </div>
        <CardBody
          className="d-flex align-items-center"
          id={`course-${course.id}`}
        >
          <div className="w-100">
            <CardTitle
              tag="h6"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "2",
                height: "2.5em",
              }}
            >
              <Link
                href={`/course/${course.title_key}`}
                as={`/course/${course.title_key}`}
              >
                <a
                  className="text-decoration-none text-dark"
                  rel="noopener noreferrer"
                >
                  {course.title}
                </a>
              </Link>
            </CardTitle>
            <div class="p-0">
              <CardText className="text-muted">
                <span className="h5 text-primary">
                  {`${
                    course.subscription === true
                      ? ""
                      : course.price === "FREE"
                      ? "FREE"
                      : "$" + course.price
                  }`}
                </span>
                <Image
                  className="float-right"
                  src={`../content/img/${
                    course.provider 
                  }.png`}
                  inline="true"
                />
              </CardText>
            </div>
          </div>
        </CardBody>
        <Popover
          placement="top"
          isOpen={popoverOpen}
          toggle={toggle}
          target={`course-${course.id}`}
        >
          <PopoverHeader style={{ backgroundColor: "white", border: "none" }}>
            {course.title}
          </PopoverHeader>
          <PopoverBody>
            {course.course_subject && (
              <p>
                <b>Subject:</b> {course.course_subject}
              </p>
            )}
            {(course.short_description || course.full_description) && (
              <p>
                <b>Description:</b> {course.short_description ? 
                course.short_description :
                truncateString(extractContent(course.full_description), 400)}
              </p>
            )}
            <div className="pb-3">
              <Link
                href={`/course/${course.title_key}`}
                as={`/course/${course.title_key}`}
              >
                <Button type="button" color="primary">
                  View Course
                </Button>
              </Link>
              <div className="d-inline float-right">
                {courseLiked ? (
                  <Button
                    color="transparent"
                    className="p-2"
                    onClick={(e) => handleDeleteCourseLike(e)}
                  >
                    <div className="text-secondary">
                      <i
                        className="fas fa-heart"
                        style={{ fontSize: "1rem" }}
                        title="Unlike this course"
                      />
                    </div>
                  </Button>
                ) : (
                  <Button
                    color="transparent"
                    className="p-2"
                    onClick={(e) => handleCourseLikeSubmit(e)}
                  >
                    <i
                      className="far fa-heart fa-lg"
                      style={{ fontSize: "1rem" }}
                      title="like this course"
                    />
                  </Button>
                )}
                {courseSaved ? (
                  <>
                    {" "}
                    <Button
                      className="p-2"
                      color="transparent"
                      onClick={(e) => handleDeleteCourseSave(e)}
                    >
                      <i
                        className="fas fa-check mr-2 text-secondary"
                        style={{ fontSize: "1rem" }}
                        title="remove course from saved list"
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="transparent"
                      onClick={(e) => handleCourseSaveSubmit(e)}
                      className="p-2"
                    >
                      <i
                        className="fas fa-plus mr-2 text-secondary"
                        style={{ fontSize: "1rem" }}
                        title="save course to list"
                      />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </Card>
    </>
  );
};
