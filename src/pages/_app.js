import React, { useEffect } from "react";
import Layout from "../components/Layout";
import App from "next/app";
import "leaflet/dist/leaflet.css";
import "react-image-lightbox/style.css";
import "../scss/style.default.scss";
import store from "../redux/store/store";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import AnalyticsService from "../services/AnalyticsService";
import Router from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//new css file converted to scss
import "../scss/geeks/style.scss";

class WorkSchoolApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
      });
    });
    if (!window.GA_INITIALIZED) {
      AnalyticsService.initialize();
      window.GA_INITIALIZED = true;
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    let stripePromise = null;
    stripePromise = loadStripe(
      "pk_test_51IlGNCSDvGZXZees5lq9BtusOYa7a8iZdRhAIuOEMDZDIoUjq2xdt2XwMRkKFOy9SYAzEs1Lze805vfwLxAOGpPl00bxzZWYbr"
    );
    return (
      <Provider store={store}>
        <Layout {...pageProps}>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </Layout>
      </Provider>
    );
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(WorkSchoolApp);
