import * as React from "react";
import {
  AlignItemsProperty,
  JustifyContentProperty,
  MaxWidthProperty
} from "csstype";

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
  maxWidth?: MaxWidthProperty<number>;
};
export const Flex = ({ children, flex = 1, maxWidth }: FlexProps) => (
  <div style={{ flex, maxWidth }}>{children}</div>
);
