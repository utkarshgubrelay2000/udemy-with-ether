import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  SET_CURRENT_IP,
  SET_USER_NAME,
} from "../constants/action-types";

export function setCurrentUser(payload) {
  return { type: SET_CURRENT_USER, payload };
}

export function removeCurrentUser(payload) {
  return { type: REMOVE_CURRENT_USER, payload };
}

export function setCurrentIP(payload) {
  return { type: SET_CURRENT_IP, payload };
}

export function setUserName(payload) {
  return { type: SET_USER_NAME, payload };
}

export function setIPAddress() {
  return async (dispatch) => {
    fetch("https://ipapi.co/json/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          return false;
        }
        return resp.json();
      })
      .then((data) => {
        dispatch(setCurrentIP(data.ip));
      });
  };
}
