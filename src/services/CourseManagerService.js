import axios from "axios";

class CourseManagerService {
  constructor() {
    if (!CourseManagerService.instance) {
      CourseManagerService.instance = this;
    }
    CourseManagerService.instance;
  }

  getCourses = async (params) => {
    try {
      const queryParams = Object.keys(params)
        .map((param) => param + "=" + encodeURIComponent(params[param]))
        .join("&");

      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course?${queryParams}`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };

  getCourseInfo = async (titleKey) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getTitleKeys = async () => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/courseTitleKeys`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getCourseBaseComments = async (titleKey) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comments`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getCourseCommentThread = async (titleKey, commentId) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/${commentId}/thread`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  }

  addCommentToCourse = async (titleKey, email, body, parentId, name) => {
    try {
      const bodyParams = {};
      if (email) {
        bodyParams["email"] = email;
      }

      if (body) {
        bodyParams["body"] = body;
      }

      if (parentId) {
        bodyParams["parentId"] = parentId;
      }

      if (name) {
        bodyParams["name"] = name;
      }

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment`,
        JSON.stringify(bodyParams),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }

      return resp.data;
    } catch (error) {
      return false;
    }
  };

  addLikeToComment = async (titleKey, email, commentId) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/likes`,
        JSON.stringify({
          commentId,
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }

      return resp.data;
    } catch (error) {
      return false;
    }
  };

  addDislikeToComment = async (titleKey, email, commentId) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/dislikes`,
        JSON.stringify({
          commentId,
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }

      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getUserCommentLikes = async (titleKey, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/${email}/likes`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }

      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getUserCommentDislikes = async (titleKey, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/${email}/dislikes`,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }

      return resp.data;
    } catch (error) {
      return false;
    }
  };

  deleteComment = async (titleKey, email, commentId) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/comment/`,
        {
          data: {
            commentId,
            email,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 204) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  addLikeToCourse = async (titleKey, email) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/likedCourses/`,
        JSON.stringify({
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  addSaveToCourse = async (titleKey, email) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/savedCourses/`,
        JSON.stringify({
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  
  checkLikedCourse = async (titleKey, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/likedCourses/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      // console.log(error)
      return false;
    }
  };

  checkSavedCourse = async (titleKey, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/savedCourses/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  deleteCourseLike = async (titleKey, email) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/likedCourses`,
        {
          data: {
            email,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 204) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  deleteCourseSave = async (titleKey, email) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${titleKey}/savedCourses`,
        {
          data: {
            email,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 204) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  getUserLikedCourses = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${email}/likedCourses`,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      if (error.response.status == 404) return []; 
      else return false;
    }
  };

  getUserSavedCourses = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COURSE_MANAGER_HOST}/api/course/${email}/savedCourses`,

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      if (error.response.status == 404) return []; 
      else return false;
    }
  };
}

const instance = new CourseManagerService();
Object.freeze(instance);
module.exports = instance;
