import React from "react";
import { Context as ResponsiveContext } from "react-responsive";
import { AppContext } from "next/app";
import { CacheProvider } from "@emotion/core";

import { cache } from "emotion";
// tslint:disable no-import-side-effect
import "semantic-ui-css/semantic.min.css";

interface Props {
  pageProps: any; // tslint:disable-line no-any
}

function BinaryStars(props: AppContext & Props) {
  const { Component, pageProps } = props;

  return (
    <ResponsiveContext.Provider value={{ width: 960 }}>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </ResponsiveContext.Provider>
  );
}

export default BinaryStars;
