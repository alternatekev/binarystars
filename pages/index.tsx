import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { css, Global } from "@emotion/core";
import { Container } from "semantic-ui-react";
import { style } from "@styles";
import { stripHtml } from "string-strip-html";
import { Flasher } from "@components";
import ReactTypingEffect from "react-typing-effect";

import { initializeApollo, HOME_QUERY } from "@data";

interface Props {
  title: string;
  content: string;
  wpUrl: string;
  excerpt: string;
  featuredImage: string;
}

const BinaryStarsPage = ({ content, featuredImage, title, excerpt }: Props) => {
  const duration = 25000;
  const scale = 110;

  const styles = style({
    Page: {
      transformStyle: "preserve-3d",
      backgroundImage: `url(${featuredImage})`,
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      transition: `${duration}ms all ease-in-out`,
      backgroundSize: "100%",
      backgroundPosition: "center center",
      zIndex: -1,
      opacity: 1,
      backgroundBlendMode: "overlay",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    animating: {
      backgroundColor: "rgba(0,15,125,0.1)",
      backgroundPosition: "center right",
      filter: "blur(50px) saturate(300%)",
      backgroundSize: `${scale}%`,
      opacity: 0.15,
    },
    Container: {
      display: "inline-flex",
      alignItems: "baseline",
      marginTop: "80vh",
      fontSize: 24,
      textShadow: "0 -1px 1px rgba(0, 0, 0, 0.25)",
      backgroundAttachment: "fixed",
      color: "#FFF",
      padding: `3px 5px`,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      boxShadow: `0 10px 25px rgba(0, 0, 0, 0.25)`,
      " p": {
        marginBottom: 0,
        display: "block",
        paddingLeft: 5,
      },
    },
    Text: {
      letterSpacing: "-0.0555555em",
      " p span": {
        color: "rgba(255, 255, 255, 0.5)",
        textShadow: "0 -1px 1px rgba(0, 0, 0, 0.25)",
      },
    },
    cursor: {
      display: "none",
    },
  });

  const [animating, setAnimating] = useState(true);
  setTimeout(() => {
    setAnimating(!animating);
  }, duration);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={stripHtml(excerpt).result} />
        <meta property="og:image" content={featuredImage} />
        <meta
          name="theme-color"
          content="#83859C"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#83859C"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Global
        styles={{
          "html > body": {
            backgroundImage: `url(${featuredImage})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            transformStyle: "preserve-3d",
            transition: `${duration}ms all ease-in-out`,
          },
        }}
      />

      <Container>
        <div css={css(styles.Page, animating && styles.animating)} />

        <div css={css(styles.Container)}>
          <p>
            <ReactTypingEffect
              typingDelay={50}
              speed={200}
              eraseDelay={500000}
              cursorClassName="typing-cursor"
              text={stripHtml(content).result}
            />
          </p>
          <Flasher />
        </div>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, params } = ctx;

  res?.setHeader("cache-control", "max-age=1, must-revalidate");
  const apolloClient = initializeApollo({}, process.env.WP_URL || "");

  const binarystars = await apolloClient.query({
    query: HOME_QUERY,
    variables: {
      exhibitionId: params?.id,
    },
  });

  return {
    props: {
      title: binarystars.data.page.title,
      content: binarystars.data.page.content,
      featuredImage: binarystars.data.page.featuredImage.node.sourceUrl,
      excerpt: binarystars.data.page.excerpt,
      wpUrl: process.env.WP_URL || "",
    },
  };
};

export default BinaryStarsPage;
