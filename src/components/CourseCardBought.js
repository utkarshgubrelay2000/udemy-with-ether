import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CourseManagerService from "../services/CourseManagerService";
import { Image } from "semantic-ui-react";
import datacampImages from "../utils/datacamp_images";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
} from "reactstrap";

export default (props) => {
  const [courseLiked, setCourseLiked] = useState(null);
  const [courseSaved, setCourseSaved] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { email } = user;

  const [ready, setReady] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const data = props.data;
  const name = data.courseName || data.title;
  const subtitle = data.subtitle || data.provider || data.name;
  const link = data.link || data.title_key;
  const image =
    data.image || data.thumbnail_url || data.img || data.thumbnailImage;
  const id = data.id || data._id;
  const subject = data.course_subject || data.subject;
  const description =
    data.short_description || data.description || data.subTitle;

  const courseId = data.courseId;
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * datacampImages.length)
  );
  // console.log(data);
  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.data1, props.data2]);

  const fetchData = async () => {
    await getUserLikedCourse();
    await getUserSavedCourse();
    // console.log("CardRoom fetchData() called!!");
  };

  const getUserLikedCourse = async () => {
    try {
      if (isAuthenticated) {
        const courseLiked = await CourseManagerService.checkLikedCourse(
          data.title_key,
          email
        );
        setCourseLiked(courseLiked);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getUserSavedCourse = async () => {
    try {
      const courseSaved = await CourseManagerService.checkSavedCourse(
        data.title_key,
        email
      );
      setCourseSaved(courseSaved);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Link href={`/view/${id}`}>
      <Card
        className="h-100 border-0 shadow"
        style={{ width: "200px", margin: "10px" }}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        <div className="card-img-top overflow-hidden gradient-overlay">
          <div className="embed-responsive embed-responsive-16by9">
            <img
              src={
                data.subtitle == "Datacamp"
                  ? datacampImages[randomIndex]
                  : image
              }
              alt={name}
              className="img-fluid embed-responsive-item"
            />
          </div>
          <div className="card-img-overlay-bottom z-index-20"></div>
        </div>
        <CardBody className="d-flex align-items-center" id={`course-${id}`}>
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
              <a className="text-decoration-none text-dark" target="_blank">
                {name}
              </a>
            </CardTitle>
            <CardSubtitle className="d-flex mb-3">
              <p
                className="flex-grow-1 mb-0 text-muted text-sm"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {subtitle &&
                  subtitle.charAt(0).toUpperCase() + subtitle.substr(1)}
              </p>
            </CardSubtitle>
            <div class="p-0">
              {data.prv && (
                <CardText className="text-muted">
                  <Image
                    className="float-right"
                    src={`../content/img/${data.prv}.png`}
                    inline="true"
                  />
                </CardText>
              )}
            </div>
          </div>
        </CardBody>
        {ready && (
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            toggle={toggle}
            target={`course-${id}`}
          >
            <PopoverHeader style={{ backgroundColor: "white", border: "none" }}>
              {name}
            </PopoverHeader>
            <PopoverBody>
              {subject && (
                <p>
                  <b>Subject:</b> {subject}
                </p>
              )}
              {description && (
                <p>
                  <b>Description:</b> {description}
                </p>
              )}
              <div className="pb-3">
                <Link href={`/view/${id}`}>
                  <Button type="button" color="primary">
                    {data.img ? "View Pack" : "View Course"}
                  </Button>
                </Link>
                <div className="d-inline float-right">
                  {courseLiked && courseSaved && (
                    <>
                      <Button
                        color="transparent"
                        className="p-2"
                        onClick={(e) =>
                          props.handleDeleteCourseLike(e, data.title_key)
                        }
                      >
                        <div className="text-secondary">
                          <i
                            className="fas fa-heart"
                            style={{ fontSize: "1rem" }}
                            title="Unlike this course"
                          />
                        </div>
                      </Button>{" "}
                      <Button
                        className="p-2"
                        color="transparent"
                        onClick={(e) =>
                          props.handleDeleteCourseSave(e, data.title_key)
                        }
                      >
                        <i
                          className="fas fa-check mr-2 text-secondary"
                          style={{ fontSize: "1rem" }}
                          title="remove course from saved list"
                        />
                      </Button>
                    </>
                  )}
                  {courseLiked && courseSaved === false && (
                    <Button
                      color="transparent"
                      className="p-2"
                      onClick={(e) =>
                        props.handleDeleteCourseLike(e, data.title_key)
                      }
                    >
                      <div className="text-secondary">
                        <i
                          className="fas fa-heart"
                          style={{ fontSize: "1rem" }}
                          title="Unlike this course"
                        />
                      </div>
                    </Button>
                  )}
                  {courseSaved && courseLiked === false && (
                    <>
                      {" "}
                      <Button
                        className="p-2"
                        color="transparent"
                        onClick={(e) =>
                          props.handleDeleteCourseSave(e, data.title_key)
                        }
                      >
                        <i
                          className="fas fa-check mr-2 text-secondary"
                          style={{ fontSize: "1rem" }}
                          title="remove course from saved list"
                        />
                      </Button>
                    </>
                  )}
                  {<> </>}
                </div>
              </div>
            </PopoverBody>
          </Popover>
        )}
      </Card>
    </Link>
  );
};
