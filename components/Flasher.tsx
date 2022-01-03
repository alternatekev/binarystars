import { css, keyframes } from "@emotion/core";
import { style } from "@styles";
import { FC } from "react";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const styles = style({
  Flasher: {
    borderBottom: `3px #F99 solid`,
    width: 20,
    height: 5,
    display: "inlineBlock",
    marginLeft: 5,
    animation: `${bounce} 1s ease infine`,
  },
});

export const Flasher: FC = () => <div css={css(styles.Flasher)} />;
