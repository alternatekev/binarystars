import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from "next/document";
import { extractCritical } from "emotion-server";

export interface EmotionCriticalProps {
  html: string;
  ids: Array<string>;
  css: string;
}

export default class MyDocument extends Document<
  EmotionCriticalProps & DocumentProps
> {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const pageProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);

    return { ...pageProps, ...styles };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="/globals.css"
            type="text/css"
            media="screen"
          />
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal" />
          <script
            src="/iframeResizer.contentWindow.min.js"
            type="text/javascript"
          />
          <script src="/parentIframe.js" type="text/javascript" />
        </body>
      </Html>
    );
  }
}
