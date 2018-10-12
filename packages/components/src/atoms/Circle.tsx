import * as React from "react";

type Props = {
  size: number;
  color: string;
};

// FIXME: Move to CSS
export const Circle = ({ size, color }: Props) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color
    }}
  />
);
