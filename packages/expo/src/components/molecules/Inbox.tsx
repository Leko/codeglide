import * as React from "react";
import { Notification } from "../../modules/topics";

export type ChildProps = {
  notification: Notification;
  dismiss: () => void;
};
type Props = {
  id?: string;
  notification?: Notification;
  children: (props: ChildProps) => React.ReactNode;
  dismiss: (id: string) => void;
};

export default ({ id, children, notification, dismiss }: Props) =>
  id &&
  notification &&
  children({
    notification,
    dismiss: () => dismiss(id)
  });
