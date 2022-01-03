import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { css, Global } from "@emotion/core";
import { Container } from "semantic-ui-react";
import { style } from "@styles";
import { stripHtml } from "string-strip-html";
import { Flasher } from "@components";

import { initializeApollo, HOME_QUERY } from "@data";

interface Props {
  title: string;
  content: string;
  wpUrl: string;
  excerpt: string;
  featuredImage: string;
}

const styles = style({
  Container: {
    display: "inline-flex",
    alignItems: "baseline",
    marginTop: "80vh",
    fontSize: 24,
    textShadow: "0 -1px #333 solid",
    color: "#FFF",
    padding: `3px 6px`,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  Text: {
    display: "inline-block",
  },
});

const BinaryStarsPage = ({ content, featuredImage, title, excerpt }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={stripHtml(excerpt).result} />
      <meta property="og:image" content={featuredImage} />
    </Head>
    <Global
      styles={{
        "html > body": {
          backgroundImage: `url(${featuredImage})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        },
      }}
    />
    <Container>
      <div css={css(styles.Container)}>
        <div
          css={css(styles.Text)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Flasher />
      </div>
    </Container>
  </div>
);

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
