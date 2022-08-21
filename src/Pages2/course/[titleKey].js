import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
  Media,
  Collapse,
  Form,
  Input,
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CourseManagerService from "../../services/CourseManagerService";
import UserManagerService from "../../services/UserManagerService";
import AnalyticsService from "../../services/AnalyticsService";
import parse from "html-react-parser";
import TimeAgo from "react-timeago";
import { useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import ShareButtonsModal from "../../components/ShareButtonsModal";
import { trackers } from "../../utils/trackers";
import datacampImages from '../../utils/datacamp_images';
import { useRouter } from "next/router";
import { Cookies } from 'react-cookie';
import Head from 'next/head';

export async function getStaticProps({ params }) {
  const { titleKey } = params;
  const course = await CourseManagerService.getCourseInfo(
    encodeURIComponent(titleKey)
  );
  return { props: { course, titleKey } };
}

export async function getStaticPaths() {
  const titleKeys = await CourseManagerService.getTitleKeys();
  const paths = [];
  // titleKeys?.forEach((titleKey) => {
  //   paths.push({ params: { titleKey } });
  // });
  return {
    paths,
    fallback: false,
  };
}

export default (props) => {
  const {
    title,
    course_subject,
    short_description,
    full_description,
    instructors,
    thumbnail_url,
    price,
    cert_price,
    language,
    course_url,
    provider,
    length,
  } = props.course;
  const { titleKey } = props;
  const [formCollapse, setFormCollapse] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [courseLiked, setCourseLiked] = useState(null);
  const [courseSaved, setCourseSaved] = useState(null);
  const [userDislikes, setUserDislikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const pagesCount = Math.ceil(comments.length / commentsPerPage);
  const [pageUrl, setpageUrl] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [commentReplyingTo, setCommentReplyingTo] = useState(null);
  const [replyCommentBody, setReplyCommentBody] = useState(null);
  const [commentThreads, setCommentThreads] = useState({});
  const [viewReplyButtonsOpened, setViewReplyButtonsOpened] = useState({});
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * datacampImages.length))
  const router = new useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    AnalyticsService.logPageView(
      window.location.pathname + window.location.search
    );
    fetchData();
  }, []);

  useEffect(() => {
    setpageUrl(window.location.href);
  }, []);

  const { email, name } = user;

  const toggle = () => setModal(!modal);

  const shareToggle = () => setShareModal(false);

  const dismissError = () => {
    setError("");
    setErrorVisible(false);
  };

  const fetchData = async () => {
    await getComments();
    await getLikes();
    await getDislikes();
    await getUserLikedCourse();
    await getUserSavedCourse();
  };

  const getUserLikedCourse = async () => {
    const userLiked = await CourseManagerService.checkLikedCourse(
      titleKey,
      email
    );
    setCourseLiked(userLiked);
  };

  const getUserSavedCourse = async () => {
    const userLiked = await CourseManagerService.checkSavedCourse(
      titleKey,
      email
    );
    setCourseSaved(userLiked);
  };

  const getComments = async () => {
    const comments = await CourseManagerService.getCourseBaseComments(titleKey);
    if (comments !== false) {
      comments.forEach(async (comment) => {
        const { name } = await UserManagerService.getUsername(comment.email);
        if (name !== null) {
          comment.name = name;
        }
      });
      setComments(comments);
    }
  };

  const getLikes = async () => {
    const likes = await CourseManagerService.getUserCommentLikes(
      titleKey,
      email
    );
    if (likes !== false) {
      setUserLikes(likes);
    }
  };

  const getDislikes = async () => {
    const { email } = user;
    const dislikes = await CourseManagerService.getUserCommentDislikes(
      titleKey,
      email
    );
    if (dislikes !== false) {
      setUserDislikes(dislikes);
    }
  };

  const getCourseCommentThread = async (commentId) => {
    try {
      const commentThread = await CourseManagerService.getCourseCommentThread(titleKey, commentId);
      setCommentThreads({...commentThreads, 
        [commentId]: commentThread,
      });
      return commentThread || false;
    } catch (error) {
      setError("Something went wrong getting that thread, but we're working on it!");
    }
  }

  const handleCourseLikeSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const newLike = await CourseManagerService.addLikeToCourse(
        titleKey,
        email
      );
      if (newLike) {
        setCourseLiked(true);
      } else {
        setError("Course could not be liked at this time");
        setErrorVisible(true);
      }
    } else {
      setError("You must sign in to like a course");
      setErrorVisible(true);
    }
  };

  const handleCourseSaveSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const newSave = await CourseManagerService.addSaveToCourse(
        titleKey,
        email
      );
      if (newSave) {
        setCourseSaved(true);
      } else {
        setError("Course could not be saved at this time");
        setErrorVisible(true);
      }
    } else {
      setError("You must sign in to save a course");
      setErrorVisible(true);
    }
  };

  const handleReplyCommentSubmit = async (e, parentId) => {
    e.preventDefault();
    if (isAuthenticated && commentBody !== null) {
      const newComment = await CourseManagerService.addCommentToCourse(
        titleKey,
        email,
        replyCommentBody,
        parentId,
        name
      );

      if (newComment !== false) {
        newComment.like_diff = 0;
        newComment.name = name;
        comments.push(newComment);
        getCourseCommentThread(parentId);
        await getComments();
      } else {
        setError("Comment could not be added at this time");
        setErrorVisible(true);
      }

      setFormCollapse(false);
      setCommentBody("");
    } else {
      setError("You must sign in to add comments");
      setErrorVisible(true);
    }
  }

  const handleViewReplyButtonForCommentClick = async (e, commentId) => {
    e.preventDefault();

    if (!viewReplyButtonsOpened[commentId]) {
      await getCourseCommentThread(commentId);
    }

    setViewReplyButtonsOpened({...viewReplyButtonsOpened,
      [commentId]: !!viewReplyButtonsOpened[commentId] ? false : true
    });
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated && commentBody !== null) {
      const newComment = await CourseManagerService.addCommentToCourse(
        titleKey,
        email,
        commentBody,
        null,
        name
      );

      if (newComment !== false) {
        newComment.like_diff = 0;
        newComment.name = name;
        comments.push(newComment);
      } else {
        setError("Comment could not be added at this time");
        setErrorVisible(true);
      }

      setFormCollapse(false);
      setCommentBody("");
    } else {
      setError("You must sign in to add comments");
      setErrorVisible(true);
    }
  };

  const handleCommentReplyButtonClick = (e, commentId) => {
    e.preventDefault();
    if (commentReplyingTo) {
      setCommentReplyingTo(false);
    } else {
      setCommentReplyingTo(commentId);
    }
  }

  const handleReplyCommentBodyChange = (e) => {
    setReplyCommentBody(e.target.value);
  }

  const handleKeyPress = (e, commentParentId) => {
    if(e.key === "Enter") {
      setCommentReplyingTo(null);
      handleReplyCommentSubmit(e, commentParentId);
    } 
  }

  const handleLikeSubmit = async (e, commentId) => {
    e.preventDefault();
    if (isAuthenticated) {
      const newLike = await CourseManagerService.addLikeToComment(
        titleKey,
        email,
        commentId
      );

      if (newLike !== false) {
        const { deletedDislike, comment_id } = newLike;

        comments.forEach((comment) => {
          if (comment.id === comment_id) {
            comment.like_diff++;
          }
        });
        setComments(comments);
        setUserLikes([...userLikes, comment_id]);
        if (deletedDislike === true) {
          setUserDislikes([...userDislikes.filter((id) => id !== comment_id)]);
        }
      } else {
        setError("Comment could not be liked at this time");
        setErrorVisible(true);
      }
    } else {
      setError("You must sign in to like comments");
      setErrorVisible(true);
    }
  };

  const handleDislikeSubmit = async (e, commentId) => {
    e.preventDefault();
    const newDislike = await CourseManagerService.addDislikeToComment(
      titleKey,
      email,
      commentId
    );

    if (isAuthenticated) {
      if (newDislike !== false) {
        const { deletedLike, comment_id } = newDislike;
        comments.forEach((comment) => {
          if (comment.id === comment_id) {
            comment.like_diff--;
          }
        });
        setComments(comments);
        setUserDislikes([...userDislikes, comment_id]);

        if (deletedLike === true) {
          setUserLikes([...userLikes.filter((id) => id !== comment_id)]);
        }
      } else {
        setError("Comment could not be disliked at this time");
        setErrorVisible(true);
      }
    } else {
      setError("You must sign in to dislike comments");
      setErrorVisible(true);
    }
  };

  const handleDeleteComment = async (e, comment) => {
    e.preventDefault();
    const isDeleted = await CourseManagerService.deleteComment(
      titleKey,
      email,
      comment.id
    );

    if (isDeleted !== false) {
      setComments(comments.filter((baseComment) => baseComment.id !== comment.id));
      if (comment.parent_id) {
        getCourseCommentThread(comment.parent_id);
      }
      await getComments();
    } else {
      setError("Comment could not be deleted at this time");
      setErrorVisible(true);
    }
    toggle();
  };

  const handleDeleteCourseLike = async (e) => {
    e.preventDefault();
    const isDeleted = await CourseManagerService.deleteCourseLike(
      titleKey,
      email
    );

    if (isDeleted !== false) {
      setCourseLiked(false);
    } else {
      setError("Course could not be unliked at this time");
      setErrorVisible(true);
    }
  };

  const handleDeleteCourseSave = async (e) => {
    e.preventDefault();
    const isDeleted = await CourseManagerService.deleteCourseSave(
      titleKey,
      email
    );

    if (isDeleted !== false) {
      setCourseSaved(false);
    } else {
      setError("Comment could not be unliked at this time");
      setErrorVisible(true);
    }
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleShareButton = (e) => {
    e.preventDefault();
    setShareModal(true);
  };

  const handleGoToCourseButtonAction = (href) => {
    let visitedCount = cookies.get("__shibaInu");

    if (typeof visitedCount === "undefined") {
      cookies.set("__shibaInu", 1);
      window.open(href, '_blank')
      return;
    }

    if (isAuthenticated || visitedCount < 3) {
      if (visitedCount) {
        visitedCount++;
        cookies.set("__shibaInu", visitedCount);
      }
      window.open(href, '_blank')
    } else {
      router.push({
        pathname: '/signup',
        query: {
          courseRedirect: true,
        }
      })
    }
  };

  const indexOfLastPost = currentPage * commentsPerPage;
  const indexOfFirstPost = indexOfLastPost - commentsPerPage;

  return (
    <>
     <Head>
        <title>{title}</title>
        <meta name="description" content={short_description}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={short_description} />
        <meta property="og:image" content={thumbnail_url} />
      </Head>
      <section>
        <Container className="py-5">
          <Row>
            <Col lg="8">
              <div className="text-block">
                {title && <h1>{title}</h1>}
                {course_subject && (
                  <div className="text-muted text-uppercase mb-4">
                    {course_subject}
                  </div>
                )}
                <ul className="list-inline text-sm mb-4">
                  <li className="list-inline-item mr-3">
                    {courseLiked ? (
                      <>
                        <Button
                          color="transparent"
                          onClick={(e) => {
                            handleDeleteCourseLike(e);
                          }}
                        >
                          <div className="text-secondary">
                            <i
                              className="fas fa-thumbs-up"
                              style={{ fontSize: "1rem" }}
                            />{" "}
                            Liked
                          </div>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="transparent"
                          onClick={(e) => {
                            handleCourseLikeSubmit(e);
                          }}
                        >
                          <div className="text-secondary">
                            <i
                              className="far fa-thumbs-up"
                              style={{ fontSize: "1rem" }}
                            />{" "}
                            Like
                          </div>
                        </Button>
                      </>
                    )}
                  </li>
                  <li className="list-inline-item mr-3">
                    <Button
                      color="transparent"
                      href="#comment"
                      onClick={() => {
                        setFormCollapse(true);
                      }}
                    >
                      <div className="text-secondary">
                        <i
                          className="fas fa-comment mr-2"
                          style={{ fontSize: "1rem" }}
                        />
                        Comment
                      </div>
                    </Button>
                  </li>
                  <li className="list-inline-item mr-3">
                    {courseSaved ? (
                      <>
                        {" "}
                        <Button
                          color="transparent"
                          onClick={(e) => handleDeleteCourseSave(e)}
                        >
                          <div className="text-secondary">
                            <i
                              className="fas fa-check mr-2"
                              style={{ fontSize: "1rem" }}
                            />
                            Added
                          </div>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="transparent"
                          onClick={(e) => handleCourseSaveSubmit(e)}
                        >
                          <div className="text-secondary">
                            <i
                              className="fas fa-plus-circle mr-2"
                              style={{ fontSize: "1rem" }}
                            />
                            Add To List
                          </div>
                        </Button>
                      </>
                    )}
                  </li>
                  <li className="list-inline-item mr-3">
                    <Button
                      color="transparent"
                      onClick={(e) => handleShareButton(e)}
                    >
                      <div className="text-secondary">
                        <i
                          className="fas fa-share mr-2 text-secondary"
                          style={{ fontSize: "1rem" }}
                        />
                        Share
                      </div>
                    </Button>
                  </li>
                </ul>
                {short_description && (
                  <>
                    <h3>About This Course</h3>
                    <p className="text-muted font-weight-light">
                      {short_description}
                    </p>
                  </>
                )}
                {full_description && (
                  <>
                    {provider == "treehouse" 
                    ? 
                    <div><p className="text-muted font-weight-light">
                    {parse(full_description)}
                    </p>
                    </div>
                    : 
                      <div>
                      <h3>Course Overview</h3>
                      <p className="text-muted font-weight-light">
                      {provider == "swayam" ? full_description : parse(full_description)}
                      </p>
                      </div>
                    }
                  </>
                )}
              </div>
              <br />
              {instructors && provider !== 'google' && (
                <span className="text-muted text-uppercase text-sm">
                  Taught by
                </span>
              )}
              {instructors && provider !== 'google' &&
                instructors.map((instructor, idx) => (
                  <div key={idx} className="text-block">
                    <Media>
                      <img
                        src={"/content/img/avatar/user-profile-default.png"}
                        alt={instructor.name}
                        className="avatar avatar-sm mr-4"
                      />
                      <Media body>
                        <p>
                          {instructor.url && (
                            <Link href={instructor.url}>
                              <a
                                href={instructor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {instructor.name}
                              </a>
                            </Link>
                          )}
                        </p>
                      </Media>
                    </Media>
                  </div>
                ))}
              <br />
              <br />
              <div className="mb-5">
                <Button
                  type="button"
                  id="comment"
                  aria-expanded={formCollapse}
                  aria-controls="leaveComment"
                  color="outline-primary"
                  onClick={() => setFormCollapse(!formCollapse)}
                >
                  Leave a comment
                </Button>
                <Collapse
                  id="leaveComment"
                  isOpen={formCollapse}
                  className="mt-4"
                >
                  <h5 className="mb-4">Leave a comment</h5>
                  <Form method="post" onSubmit={handleCommentSubmit}>
                    <FormGroup className="mb-4">
                      <Label for="comment" className="form-label">
                        Comment <span className="required">*</span>
                      </Label>
                      <Input
                        id="comment"
                        type="textarea"
                        className="form-control"
                        rows="4"
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      <i className="far fa-comment" /> Comment
                    </Button>
                  </Form>
                </Collapse>
              </div>
              {comments && (
                <div>
                  <div className="mt-5">
                    <h6 className="text-uppercase text-muted mb-4">
                      {comments.length} comments
                    </h6>
                    {comments
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((comment, index) => {
                        if (!comment.parent_id) {
                          return (
                            <Media key={index} className="mb-4">
                              <img
                                src={`/content/img/avatar/user-profile-default.png`}
                                alt={comment.title}
                                className="avatar avatar-lg mr-4"
                              />
                              <Media body>
                                <h5>
                                  {comment.name}
                                </h5>
                                <p className="text-uppercase text-sm text-muted">
                                  <i className="far fa-clock" />{" "}
                                  <TimeAgo date={comment.created_at} />
                                </p>
                                <p className="text-muted">
                                  {comment.body}
                                </p>
                                <p>
                                  <Button
                                    color="link"
                                    onClick={(e) => handleCommentReplyButtonClick(e, comment.id)}
                                    className="text-primary"
                                  >
                                    <i className="fa fa-reply" />
                                    Reply
                                  </Button>
                                  <Button
                                    color="link"
                                    href="#"
                                    className="text-primary"
                                    onClick={(e) => handleLikeSubmit(e, comment.id)}
                                    disabled={userLikes.includes(comment.id)}
                                  >
                                    <i
                                      className={`${
                                        userLikes.includes(comment.id)
                                          ? "fa fa-thumbs-up"
                                          : "far fa-thumbs-up"
                                      } pr-2`}
                                    />
                                    {comment.like_diff > 0 && (
                                      <span className="px-1">
                                        {comment.like_diff}
                                      </span>
                                    )}
                                  </Button>
                                  <Button
                                    color="link"
                                    href="#"
                                    className="text-primary ml-1"
                                    onClick={(e) =>
                                      handleDislikeSubmit(e, comment.id)
                                    }
                                    disabled={userDislikes.includes(comment.id)}
                                  >
                                    <i
                                      className={
                                        userDislikes.includes(comment.id)
                                          ? "fa fa-thumbs-down"
                                          : "far fa-thumbs-down"
                                      }
                                    />
                                  </Button>
                                  {comment.email === email && (
                                    <div className="d-inline ml-1">
                                      <Button
                                        color="link"
                                        href="#"
                                        className="text-secondary"
                                        onClick={toggle}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </Button>
                                      <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>
                                          Are you sure?
                                        </ModalHeader>
                                        <ModalBody>
                                          Are you sure you want to delete this
                                          comment? Your comment will be permanently
                                          deleted.
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button
                                            color="primary"
                                            onClick={(e) =>
                                              handleDeleteComment(e, comment)
                                            }
                                          >
                                            Delete
                                          </Button>{" "}
                                          <Button
                                            color="secondary"
                                            onClick={toggle}
                                          >
                                            Cancel
                                          </Button>
                                        </ModalFooter>
                                      </Modal>
                                    </div>
                                  )}
                                </p>
                                {
                                  comment.id === commentReplyingTo && 
                                  <>
                                    <Input
                                      placeholder="add a public reply..."
                                      onKeyPress={(e) => handleKeyPress(e, comment.id)}
                                      onChange={handleReplyCommentBodyChange}
                                    />
                                    <br />
                                  </>
                                }
                                {
                                  comment.replies_count > 0 &&
                                    <Button
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                        borderColor: 'transparent',
                                        fontSize: 10,
                                      }}
                                      onClick={(e) => handleViewReplyButtonForCommentClick(e, comment.id)}
                                    >
                                      {
                                        !!viewReplyButtonsOpened[comment.id] ?
                                          <i class="fas fa-caret-up"></i> :
                                          <i class="fas fa-caret-down"></i>  
                                      } View {comment.replies_count} replies
                                    </Button>
                                }
                                <br />
                                <br />
                                {
                                  !!viewReplyButtonsOpened[comment.id] &&
                                  !!commentThreads[comment.id] && 
                                  commentThreads[comment.id].slice(0).reverse().map((comment, index) => {
                                    return (
                                      <Media key={index}>
                                        <img
                                          src={`/content/img/avatar/user-profile-default.png`}
                                          alt={comment.title}
                                          className="avatar avatar-sm mr-4"
                                        />
                                        <Media body>
                                          <h5>
                                            {comment.name}
                                          </h5>
                                          <p className="text-uppercase text-sm text-muted">
                                            <i className="far fa-clock" />{" "}
                                            <TimeAgo date={comment.created_at} style={{ fontSize: 14, }} />
                                          </p>
                                          <p className="text-muted" style={{ fontSize: 14, }}>
                                            {comment.body}
                                          </p>
                                          <p>
                                            <Button
                                              color="link"
                                              href="#"
                                              className="text-primary"
                                              onClick={(e) => handleLikeSubmit(e, comment.id)}
                                              disabled={userLikes.includes(comment.id)}
                                            >
                                              <i
                                                style={{ fontSize: 12, }}
                                                className={`${
                                                  userLikes.includes(comment.id)
                                                    ? "fa fa-thumbs-up"
                                                    : "far fa-thumbs-up"
                                                } pr-2`}
                                              />
                                              {comment.like_diff > 0 && (
                                                <span className="px-1">
                                                  {comment.like_diff}
                                                </span>
                                              )}
                                            </Button>
              
                                            <Button
                                              color="link"
                                              href="#"
                                              className="text-primary ml-1"
                                              onClick={(e) =>
                                                handleDislikeSubmit(e, comment.id)
                                              }
                                              disabled={userDislikes.includes(comment.id)}
                                            >
                                              <i
                                                style={{ fontSize: 12, }}
                                                className={
                                                  userDislikes.includes(comment.id)
                                                    ? "fa fa-thumbs-down"
                                                    : "far fa-thumbs-down"
                                                }
                                              />
                                            </Button>
                                            {comment.email === email && (
                                              <div className="d-inline ml-1">
                                                <Button
                                                  color="link"
                                                  href="#"
                                                  className="text-secondary"
                                                  onClick={toggle}
                                                >
                                                  <i
                                                    style={{ fontSize: 12, }}
                                                    className="fa fa-trash"
                                                  />
                                                </Button>
                                                <Modal isOpen={modal} toggle={toggle}>
                                                  <ModalHeader toggle={toggle}>
                                                    Are you sure?
                                                  </ModalHeader>
                                                  <ModalBody>
                                                    Are you sure you want to delete this
                                                    comment? Your comment will be permanently
                                                    deleted.
                                                  </ModalBody>
                                                  <ModalFooter>
                                                    <Button
                                                      color="primary"
                                                      onClick={(e) =>
                                                        handleDeleteComment(e, comment)
                                                      }
                                                    >
                                                      Delete
                                                    </Button>{" "}
                                                    <Button
                                                      color="secondary"
                                                      onClick={toggle}
                                                    >
                                                      Cancel
                                                    </Button>
                                                  </ModalFooter>
                                                </Modal>
                                              </div>
                                            )}
                                          </p>
                                          {
                                            comment.id === commentReplyingTo && 
                                            <>
                                              <Input 
                                                placeholder="add a public reply..."
                                                onKeyPress={(e) => handleKeyPress(e, comment.id)}
                                                onChange={handleReplyCommentBodyChange}
                                              />
                                              <br />
                                            </>
                                          }
                                        </Media>
                                      </Media>
                                    )
                                  })
                                }
                              </Media>
                            </Media>
                          )
                        }
                      })
                    }
                  </div>
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
                </div>
              )}
              <br />
            </Col>
            <Col lg="4">
              <div
                style={{ top: "100px" }}
                className="p-4 shadow ml-lg-4 rounded sticky-top"
              >
                <div className="text-muted">
                  {provider === 'datacamp' ? 
                  <img
                    src={datacampImages[randomIndex]}
                    style={{ width: "100%" }}
                    className="my-3"
                  />
                   : 
                    thumbnail_url && (
                      <img
                        src={thumbnail_url}
                        style={{ width: "100%" }}
                        className="my-3"
                      />
                  )}
                  {price && (
                    <div className="d-flex justify-content-between">
                      <span>Price: </span>
                      <span className="text-primary h4">
                        {price === "FREE" ? "FREE" : `$${price}`}
                      </span>{" "}
                    </div>
                  )}
                  {cert_price && (
                    <div className="d-flex justify-content-between">
                      <span>Certificate: </span>
                      <span className="text-primary h4">
                        ${cert_price && cert_price}
                      </span>
                    </div>
                  )}
                  {language && (
                    <div className="d-flex justify-content-between">
                      <span>Language: </span>
                      <span className="text-primary h4">
                        {language && language}
                      </span>{" "}
                    </div>
                  )}
                  {length && (
                    <div className="d-flex justify-content-between">
                      <span>Length: </span>
                      <span className="text-primary h4">
                        {provider == "yc" ?
                        `${length} mins` :
                         provider == "swayam" ? 
                        `${length} weeks` :
                         length < 2 ? 
                        `${length} hour`: 
                         length < 25 ? 
                         `${length} hours` :
                         (length >= 25 && length <= 200) ? 
                        `${Math.floor(length/24)} days` : 
                        `${Math.floor(length /168)} weeks`}
                      </span>{" "}
                    </div>
                  )}
                </div>
                <hr className="my-4" />
                {course_url && (
                  <Button
                    // href={trackers[provider](course_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    onClick={() => handleGoToCourseButtonAction(trackers[provider](course_url))}
                  >
                    Go To Course
                  </Button>
                )}
                <hr className="my-4" />
                <div className="d-flex justify-content-between">
                  {courseLiked ? (
                    <>
                      <Button
                        color="transparent"
                        onClick={(e) => {
                          handleDeleteCourseLike(e);
                        }}
                      >
                        <i
                          className="fas fa-thumbs-up text-secondary"
                          style={{ fontSize: "1rem" }}
                        />{" "}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="transparent"
                        onClick={(e) => {
                          handleCourseLikeSubmit(e);
                        }}
                      >
                        <i
                          className="far fa-thumbs-up text-secondary"
                          style={{ fontSize: "1rem" }}
                        />{" "}
                      </Button>
                    </>
                  )}

                  <Button
                    color="link"
                    href="#comment"
                    onClick={() => {
                      setFormCollapse(true);
                    }}
                  >
                    <i
                      className="mr-1 text-secondary fas fa-comment"
                      style={{ fontSize: "1rem" }}
                    />
                  </Button>
                  {courseSaved ? (
                    <>
                      {" "}
                      <Button
                        color="transparent"
                        onClick={(e) => handleDeleteCourseSave(e)}
                      >
                        <i
                          className="fas fa-check mr-2 text-secondary"
                          style={{ fontSize: "1rem" }}
                        />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="transparent"
                        onClick={(e) => handleCourseSaveSubmit(e)}
                      >
                        <i
                          className="fas fa-plus-circle mr-2 text-secondary"
                          style={{ fontSize: "1rem" }}
                        />
                      </Button>
                    </>
                  )}

                  <Button
                    color="transparent"
                    onClick={(e) => handleShareButton(e)}
                  >
                    <i
                      className="fas fa-share mr-1 text-secondary"
                      style={{ fontSize: "1rem" }}
                    />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row></Row>
          <Modal
            isOpen={errorVisible}
            toggle={dismissError}
            className="text-center"
          >
            <ModalHeader
              className="border-0"
              toggle={dismissError}
            ></ModalHeader>
            <ModalBody className="border-0">{error}</ModalBody>
            <ModalFooter className="border-0">
              <Button color="primary" onClick={dismissError}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
          <ShareButtonsModal
            modal={shareModal}
            toggle={shareToggle}
            shareUrl={pageUrl}
          ></ShareButtonsModal>
        </Container>
      </section>
    </>
  );
};
