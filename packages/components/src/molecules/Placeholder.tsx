import * as React from "react";
import ReactPlaceholder from "react-placeholder";
import {
  TextBlock as TextBlockBase,
  // MediaBlock,
  // TextRow,
  // RectShape,
  RoundShape as RoundShapeBase
} from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
  ready: boolean;
  renderPlaceholder: () => React.ReactNode;
  children: React.ReactNode;
};

export const Placeholder = ({ children, renderPlaceholder, ready }: Props) => (
  <ReactPlaceholder
    ready={ready}
    customPlaceholder={renderPlaceholder()}
    className="show-loading-animation"
  >
    {children}
  </ReactPlaceholder>
);

// FIXME: Theme
const color = "rgb(240, 240, 240)";
export const RoundShape = () => <RoundShapeBase color={color} />;
export const TextBlock = ({ rows }: { rows: number }) => (
  <TextBlockBase rows={rows} color={color} />
);
