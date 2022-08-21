const withImages = require("next-images");
module.exports = withImages({
  trailingSlash: true,
  images: {
    loader: "imgix", // Uncomment this line for STATIC EXPORT
    path: "", // Uncomment this line for STATIC EXPORT
    disableStaticImages: true
  },
  env: {
    production_type: "static", // Change variable to "static" for STATIC EXPORT
  },
});
