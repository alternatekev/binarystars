module.exports = (api) => {
  api.cache(true);

  const presets = ["next/babel", "@emotion/babel-preset-css-prop"];

  const plugins = ["emotion"];

  return {
    presets,
    plugins,
  };
};
