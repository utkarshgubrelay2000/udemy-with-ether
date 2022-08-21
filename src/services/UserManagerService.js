import axios from "axios";
class UserManagerService {
  constructor() {
    if (!UserManagerService.instance) {
      UserManagerService.instance = this;
    }
    UserManagerService.instance;
  }

  getUsername = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${email}/name`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }

      return resp.data;
    } catch (err) {
      // console.log(err);
      return false;
    }
  };

  onboardUser = async (email, userType, interests, objectives) => {
    try {
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/onboarding/${email}`,
        JSON.stringify({
          userType,
          interests,
          objectives,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }

      return true;
    } catch (err) {
      // console.log(err);
      return false;
    }
  }

  getUserOnboardingStatus = async (email) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/onboarding/status/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status === 403) {
        return false;
      }

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }

      return true;
    } catch (err) {
      // console.log(err);
      return false;
    }
  }
}

const instance = new UserManagerService();
Object.freeze(instance);
module.exports = instance;
