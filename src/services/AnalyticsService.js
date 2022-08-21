import ReactGa from "react-ga";

class AnalyticsService {
  constructor() {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = this;
    }
    AnalyticsService.instance;
  }

  initialize = () => {
    ReactGa.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_CODE);
  };

  logPageView = (url) => {
    ReactGa.set({ page: url });
    ReactGa.pageview(url);
  };

  setEvent = (category, action, label) => {
    ReactGa.event({
      category,
      action,
      label,
    });
  };
}

const instance = new AnalyticsService();
Object.freeze(instance);
module.exports = instance;
