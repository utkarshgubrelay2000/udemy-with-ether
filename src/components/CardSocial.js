import React, { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import {
    Card,CardBody,CardTitle,
    Row,Col,Button,Input,Label,
    Modal,ModalHeader,ModalBody,
    ModalFooter,Collapse,Form,FormGroup,
    Media
} from 'reactstrap'
import TimeAgo from "react-timeago";
import UserManagerService from "../services/UserManagerService";
import CommunityManagerService from "../services/CommunityManagerService";

export default props => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [comments, setComments] = useState([]);
    const [commenting, setCommenting] = useState(null);
    const [userLikes, setUserLikes] = useState([]);
    const [postLiked, setPostLiked] = useState(null);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [userDislikes, setUserDislikes] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const [commentReplyingTo, setCommentReplyingTo] = useState(null);
    const [replyCommentBody, setReplyCommentBody] = useState(null);
    const [commentThreads, setCommentThreads] = useState({});
    const [formCollapse, setFormCollapse] = useState(false);
    const [viewReplyButtonsOpened, setViewReplyButtonsOpened] = useState({});
    const [postLikes, setPostLikes] =useState(props.data.likes);
    const [postCommentCount, setPostCommentCount] = useState(null);

    const data = props.data;
    const { email, name } = user;

    const toggle = () => setModal(!modal);
    //Handle data fetches
    const fetchData = async () => {
      await getComments();
      await getLikes();
      await getDislikes();
      await getUserLikedPost();
      await getUserLikedPost();
      await getPostCommentCount();
    };
  

    useEffect(() => {
      fetchData();
    }, [])

    const getPostCommentCount = async () => {
      const count = await CommunityManagerService.getPostCommentCount(
        data.id
      );
      setPostCommentCount(count[0].count);
      // console.log(count);
    }
    const getUserLikedPost= async () => {
      const userLiked = await CommunityManagerService.checkLikedPost(
        data.id,
        email
      );
      setPostLiked(userLiked);
    };

    // Handle Button Clicks
    const handleCommentButtonClick = (e) => {
      e.preventDefault();
      if (commenting) {
        setCommenting(false);
      } else {
        setCommenting(true);
      }
    }

    const handlePostLikeSubmit = async (e) => {
      e.preventDefault();
      if (isAuthenticated) {
        const newLike = await CommunityManagerService.addLikeToPost(
          data.id,
          email
        );
        if (newLike) {
          setPostLiked(true);
          setPostLikes(newLike.likes);
        } else {
          setError("Post could not be liked at this time");
          setErrorVisible(true);
        }
      } else {
        setError("You must sign in to like a post");
        setErrorVisible(true);
      }
    };

    const handleDeletePostLike = async (e) => {
      e.preventDefault();
      const isDeleted = await CommunityManagerService.deletePostLike(
        data.id,
        email
      );
  
      if (isDeleted !== false) {
        setPostLiked(false);
        setPostLikes(isDeleted.likes);
      } else {
        setError("Post could not be unliked at this time");
        setErrorVisible(true);
      }
    };
  
    //Commenting System 
    const getComments = async () => {
      const comments = await CommunityManagerService.getPostBaseComments(data.id);
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
      const likes = await CommunityManagerService.getUserCommentLikes(
        data.id,
        email
      );
      if (likes !== false) {
        setUserLikes(likes);
      }
    };
  
    const getDislikes = async () => {
      const { email } = user;
      const dislikes = await CommunityManagerService.getUserCommentDislikes(
        data.id,
        email
      );
      if (dislikes !== false) {
        setUserDislikes(dislikes);
      }
    };
  
    const getPostCommentThread = async (commentId) => {
      try {
        const commentThread = await CommunityManagerService.getPostCommentThread(data.id, commentId);
        setCommentThreads({...commentThreads, 
          [commentId]: commentThread,
        });
        return commentThread || false;
      } catch (error) {
        setError("Something went wrong getting that thread, but we're working on it!");
      }
    }
  
    const handleReplyCommentSubmit = async (e, parentId) => {
      e.preventDefault();
      if (isAuthenticated && commentBody !== null) {
        const newComment = await CommunityManagerService.addCommentToPost(
          data.id,
          email,
          replyCommentBody,
          parentId,
          name
        );
  
        if (newComment !== false) {
          newComment.like_diff = 0;
          newComment.name = name;
          comments.push(newComment);
          getPostCommentThread(parentId);
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
        await getPostCommentThread(commentId);
      }
  
      setViewReplyButtonsOpened({...viewReplyButtonsOpened,
        [commentId]: !!viewReplyButtonsOpened[commentId] ? false : true
      });
    }
  
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      if (isAuthenticated && commentBody !== null) {
        const newComment = await CommunityManagerService.addCommentToPost(
          data.id,
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
  
        setCommenting(!commenting);
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
        const newLike = await CommunityManagerService.addLikeToComment(
          data.id,
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
      const newDislike = await CommunityManagerService.addDislikeToComment(
        data.id,
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
      const isDeleted = await CommunityManagerService.deleteComment(
        data.id,
        email,
        comment.id
      );
  
      if (isDeleted !== false) {
        setComments(comments.filter((baseComment) => baseComment.id !== comment.id));
        if (comment.parent_id) {
          getPostCommentThread(comment.parent_id);
        }
        await getComments();
      } else {
        setError("Comment could not be deleted at this time");
        setErrorVisible(true);
      }
      toggle();
    };
  
  
    //Error messages
    const dismissError = () => {
      setError("");
      setErrorVisible(false);
    };
    
    
    return (
        <Card className="mb-2">
            <CardTitle>
                <Row className="mt-2">
                  <Col xs="auto">
                    <img src={`/content/img/avatar/${data.avatar ? data.avatar : "user-profile-default.png"}`} alt={data.name} className="avatar avatar-md p-1 mt-1 ml-2" />
                  </Col>
                  <Col xs="2.5">
                    <h6 className="mt-2 mb-1">{data.name}</h6>
                    <div className=" text-muted text-sm">
                      {<TimeAgo date={data.created_at} />}
                    </div>
                  </Col>
                </Row>
            </CardTitle>
            <Row>
              <Col className='ml-3' lg="11">
                <div style={{ width: '100%'}}>
                  <p className="text-muted">{data.body}</p>
                </div>
              </Col>
            </Row>
             <hr/>
            <Row>
              <Col sm={{ size: 'auto', offset: 1 }}>
                {postLiked ? (
                  <>
                    <Button
                      color="transparent"
                      onClick={(e) => {
                        handleDeletePostLike(e);
                      }}
                    >
                      <div className="text-secondary">
                        <i
                          className="fas fa-thumbs-up"
                          style={{ fontSize: "1rem" }}
                        />
                        {postLikes > 0 && (
                          <span className="px-1">
                            {postLikes}
                          </span>
                        )}
                      </div>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="transparent"
                      onClick={(e) => {
                        handlePostLikeSubmit(e);
                      }}
                    >
                      <div className="text-secondary">
                        <i
                          className="far fa-thumbs-up"
                          style={{ fontSize: "1rem" }}
                        />
                        {postLikes > 0 && (
                          <span className="px-1">
                            {postLikes}
                          </span>
                        )}
                      </div>
                    </Button>
                  </>
                 )}
              </Col>
              <Col sm={{ size: 'auto', offset: 1 }}>
                  <Button
                    color="transparent"
                    href="#comment"
                    onClick={(e) => handleCommentButtonClick(e)}
                  >
                    <div className="text-primary">
                      <i
                        className="fas fa-comment mr-2"
                        style={{ fontSize: "1rem" }}
                      />
                      {postCommentCount > 0 && (
                          <span className="px-1">
                            {postCommentCount}
                          </span>
                        )}
                    </div>
                  </Button>
                </Col>
                {/* <Col xs="auto">
                  <Button
                    color="transparent"
                    onClick={(e) => handleShareButton(e)}
                  >
                    <div className="text-success">
                      <i
                        className="fas fa-share mr-2"
                        style={{ fontSize: "1rem" }}
                      />
                      Share
                    </div>
                  </Button>
                </Col> */}
            </Row>
            <Collapse
            id="leaveComment"
            isOpen={commenting}
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
           {comments && (
                <div>
                  {comments && comments.length > 0 && <hr/>}
                  <div className="mt-1">
                    {comments
                      .map((comment, index) => {
                        if (!comment.parent_id) {
                          return (
                            <Media key={index} className="mb-1" >
                              <img
                                src={`/content/img/avatar/user-profile-default.png`}
                                alt={comment.title}
                                className="avatar avatar-md ml-1 p-1 mr-4"
                              />
                              <Media body>
                                <h5>
                                  {comment.name}
                                </h5>
                                <p className="text-sm text-muted">
                                  <i className="far fa-clock" />{" "}
                                  <TimeAgo date={comment.created_at} locale="en-US"/>
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
                </div>
              )}  
           {
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
           }
        </Card>
    )
}
