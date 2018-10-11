import * as React from "react";
import { AlignItemsProperty, JustifyContentProperty } from "csstype";

// FIXME: Move to CSS

type RowProps = {
  children: React.ReactNode;
  className?: string;
  alignItems?: AlignItemsProperty;
  justifyContent?: JustifyContentProperty;
};
export const Row = ({
  children,
  className,
  alignItems = "center",
  justifyContent = "flex-start"
}: RowProps) => (
  <div
    // FIXME: Move to CSS class
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems,
      justifyContent
    }}
    className={className}
  >
    {children}
  </div>
);

type FlexProps = {
  children: React.ReactNode;
  flex?: number;
};
export const Flex = ({ children, flex = 1 }: FlexProps) => (
  <div style={{ flex }}>{children}</div>
);
