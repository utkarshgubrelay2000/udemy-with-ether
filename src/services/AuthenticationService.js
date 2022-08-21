import store from "../redux/store/store";
import { Cookies } from "react-cookie";
import {
  setCurrentUser,
  removeCurrentUser,
  setUserName,
} from "../redux/actions/actions";
import axios from "axios";
import jwt from "jsonwebtoken";
import AnalyticsService from "./AnalyticsService";

const cookies = new Cookies();

class AuthenticationService {
  constructor() {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = this;
    }
    AuthenticationService.instance;
  }

  registerUser = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/signup`,
        data
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }
      const token = resp.data.token;
      cookies.set("jwtToken", token);
      store.dispatch(setCurrentUser(jwt.decode(token)));
      return true;
    } catch (err) {
      return false;
    }
  };

  loginUser = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/login`,
        data
      );
      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }
      const token = resp.data.token;
      cookies.set("jwtToken", token);
      store.dispatch(setCurrentUser(jwt.decode(token)));
      return true;
    } catch (err) {
      return false;
    }
  };

  logoutUser = async () => {
    store.dispatch(removeCurrentUser());
    localStorage.setItem("userInfo", null);
  };

  getUserProfile = async () => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("jwtToken")}`,
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }

      return resp.data;
    } catch (error) {
      AnalyticsService.setEvent("Error", "Get Profile Failed", "Profile");
      return false;
    }
  };

  updateUserProfile = async (data) => {
    const { name } = data;
    try {
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/profile`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${cookies.get("jwtToken")}`,
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }
      store.dispatch(setUserName(name));
      return resp.data;
    } catch (err) {
      AnalyticsService.setEvent("Error", "Update Profile Failed", "Profile");
      // console.log(err);
      return false;
    }
  };

  saveUnregisteredNewsletterUser = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/unregistered`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again later.");
        return false;
      }

      return true;
    } catch (err) {
      AnalyticsService.setEvent(
        "Error",
        "Failed to save unregistered newsletter user",
        "User"
      );
      // console.log(err);
      return false;
    }
  };

  saveUnregisteredUser = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/unregistered`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again later.");
        return false;
      }

      cookies.set("hasOnboarded", true);
      return true;
    } catch (err) {
      AnalyticsService.setEvent("Error", "Update Profile Failed", "Profile");
      // console.log(err);
      return false;
    }
  };

  forgotPassword = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/forgotPassword`,
        data
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }
      store.dispatch(setUserName(name));
      return resp.data;
    } catch (err) {
      AnalyticsService.setEvent("Error", "Update Profile Failed", "Profile");
      // console.log(err);
      return false;
    }
  };

  resetPassword = async (data) => {
    try {
      // console.log("in try block : ", data);
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/users/resetPassword`,
        data
      );

      if (resp.status !== 200) {
        alert("Something went wrong. Please try again.");
        return false;
      }
      return resp.data;
    } catch (err) {
      AnalyticsService.setEvent("Error", "Update Profile Failed", "Profile");
      // console.log(err);
      return false;
    }
  };
}

const instance = new AuthenticationService();
Object.freeze(instance);
module.exports = instance;
