import * as React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};
const Button = ({ onClick, children }: Props) => (
  <button onClick={onClick}>{children}</button>
);

export default Button;
