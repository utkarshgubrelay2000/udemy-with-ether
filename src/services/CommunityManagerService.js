import axios from 'axios'; 

class CommunityManagerService {

  constructor() {
    if (!CommunityManagerService.instance) {
      CommunityManagerService.instance = this;
    }
    CommunityManagerService.instance;
  }

  addPost = async (email, body, name) => {
    try {
      const bodyParams = {};
      if (email) {
        bodyParams["email"] = email;
      }

      if (body) {
        bodyParams["body"] = body;
      }

      if (name) {
        bodyParams["name"] = name;
      }

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${email}/addPost`,
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

  getPosts = async () => {
    try {

      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/posts`
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

  getPostCommentThread = async (postId, commentId) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/${commentId}/thread`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  }

  addCommentToPost = async (postId, email, body, parentId, name) => {
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
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment`,
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

  getNextPosts = async (offset, limit) => {
    try {
      // console.log(`I'm logging all request with offset: ${offset}`);
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/posts/limit/${offset}/${limit}/`,
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
  addLikeToComment = async (postId, email, commentId) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/likes`,
        JSON.stringify({
          commentId,
          email,
          postId,
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

  addDislikeToComment = async (postId, email, commentId) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/dislikes`,
        JSON.stringify({
          commentId,
          email,
          postId,
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

  getUserCommentLikes = async (postId, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/${email}/likes`,
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

  getUserCommentDislikes = async (postId, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/${email}/dislikes`,

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

  deleteComment = async (postId, email, commentId) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comment/`,
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

  addLikeToPost = async (postId, email) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/likePost/${email}/`,
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

  checkLikedPost = async (postId, email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/likedPost/${email}/`,
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

  getPostBaseComments = async (postId) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/comments`
      );
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  deletePostLike = async (postId, email) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/likedPost/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 204) {
        return false;
      }
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  getUserLikedPosts = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${email}/likedPosts`,

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

  getUserSavedPosts = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${email}/savedPosts`,

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

  getPostCommentCount = async (postId) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_COMMUNITY_MANAGER_HOST}/api/post/${postId}/commentedPostCount`,

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

const instance = new CommunityManagerService();
Object.freeze(instance);
module.exports = instance;
