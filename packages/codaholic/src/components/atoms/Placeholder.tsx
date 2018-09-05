import * as React from "react";
import { connectStyle } from "@shoutem/theme";
import Placeholder from "rn-placeholder";

interface IStyle {
  textSize: number;
  color: string;
}

type CommonProps = {
  style: IStyle;
  width: string;
  onReady: boolean;
  children: React.ReactNode;
};

type LineProps = CommonProps & {};
export const Line = connectStyle("Placeholder.Line", {})(
  ({ style, ...props }: LineProps) => (
    <Placeholder.Line animate="fade" {...style} {...props} />
  )
);

type ParagraphProps = CommonProps & {
  lineNumber: number;
  lineSpacing: number;
  lastLineWidth: string;
  firstLineWidth: string;
};
export const Paragraph = connectStyle("Placeholder.Paragraph", {})(
  ({ style, ...props }: ParagraphProps) => (
    <Placeholder.Paragraph animate="fade" {...style} {...props} />
  )
);
