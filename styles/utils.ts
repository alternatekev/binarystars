import { SerializedStyles, ObjectInterpolation, css } from "@emotion/core";

export type ObjectStyles = ObjectInterpolation<undefined>;

function importantize(styles: string) {
  const split = styles.split(";");
  const labelIndex = split.findIndex((li) => li.includes("label"));
  const importantized = split.map((sp, i) =>
    i < labelIndex ? `${sp} !important` : sp
  );

  return importantized.join(";");
}

function removeSuffixes(name: string) {
  return name.replace("-mk-mk", "");
}

export function style(styles: { [key: string]: ObjectStyles }) {
  return Object.keys(styles).reduce<{ [key: string]: SerializedStyles }>(
    (memo, key) => {
      const mk = css({ ...styles[key], label: key });

      return {
        ...memo,
        [key]: {
          name: removeSuffixes(mk.name),
          styles: importantize(mk.styles),
        },
      };
    },
    {}
  );
}
