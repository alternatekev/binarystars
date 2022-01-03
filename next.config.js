const path = require("path");

module.exports = {
  pwa: {
    dest: "public",
  },
  webpack: (config) => {
    config.resolve.alias["@rl"] = path.resolve(__dirname) + "";
    config.resolve.alias["@components"] =
      path.resolve(__dirname) + "/components";
    config.resolve.alias["@types"] = path.resolve(__dirname) + "./types";
    config.resolve.alias["@styles"] = path.resolve(__dirname) + "./styles";
    config.resolve.alias["@views"] = path.resolve(__dirname) + "./views";
    config.resolve.alias["@utils"] = path.resolve(__dirname) + "./utils";
    config.resolve.alias["@data"] = path.resolve(__dirname) + "./data";

    return config;
  },
  images: {
    domains: ["rulegallery.com"],
  },
  cssModules: true,
};
