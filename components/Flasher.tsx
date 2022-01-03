import { css } from "@emotion/core";
import { style } from "@styles";
import { FC, useState } from "react";

export const Flasher: FC = () => {
  const styles = style({
    Flasher: {
      width: 15,
      height: 2,
      display: "inline-block",
      marginLeft: 5,
      backgroundColor: "rgba(255, 153, 153, 1)",
      transition: "none",
    },
    animating: {
      transition: `300ms background-color ease-in-out`,
      backgroundColor: "rgba(255, 153, 153, 0)",
    },
  });

  const [animating, setAnimating] = useState(true);

  setTimeout(() => {
    setAnimating(!animating);
  }, 700);

  return <div css={css(styles.Flasher, animating && styles.animating)} />;
};
