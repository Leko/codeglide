// FIXME: Carve out to npm package
import React from "react";
import { withNavigation } from "react-navigation";
import { ChildProps } from "../molecules/Inbox";
import SnackBar from "../molecules/SnackBar";
import Inbox from "../../containers/Inbox";
import * as NavigationService from "../../libs/NavigationService";
import { TOPIC_CLIPBOARD } from "../../modules/topics";

type Props = {
  openSearchWith: () => any;
};

export default ({ openSearchWith }: Props) => (
  <Inbox topic={TOPIC_CLIPBOARD}>
    {({
      notification: {
        message,
        meta: { repo, user, visible }
      },
      dismiss
    }: ChildProps) => (
      <SnackBar
        visible={visible}
        message={`${message}:\n${user}/${repo}`}
        actionText="open"
        onPress={() => {
          NavigationService.navigate("Dashboard", {
            openSearch: true,
            searchParams: { repo: [user, repo].join("/") }
          });
          dismiss();
        }}
      />
    )}
  </Inbox>
);
