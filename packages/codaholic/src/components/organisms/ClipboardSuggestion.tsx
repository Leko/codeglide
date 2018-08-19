// FIXME: Carve out to npm package
import React from "react";
import { ChildProps } from "../molecules/Inbox";
import SnackBar from "../molecules/SnackBar";
import Inbox from "../../containers/Inbox";
import { TOPIC_CLIPBOARD } from "../../modules/topics";

export default () => (
  <Inbox topic={TOPIC_CLIPBOARD}>
    {({
      notification: {
        message,
        meta: { url }
      },
      dismiss
    }: ChildProps) => (
      <SnackBar
        visible
        message={`${message}:\n${url}`}
        actionText="open"
        onPress={() => {
          dismiss();
        }}
      />
    )}
  </Inbox>
);
