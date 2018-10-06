import flatten from "lodash/flatten";
import { ActionSheetIOS } from "react-native"; // FIXME: Support Android
import { navigate } from "../libs/NavigationService";
import { selectors } from "../modules/file";
import { languages, extensions } from "../libs/plugins";
import * as analytics from "../libs/ga";

export type Choice = {
  message: string;
  onPress: () => any;
};

// FIXME: Move to middleware
const showActionSheet = (
  title: string,
  choices: Array<Choice>,
  { cancellable }: { cancellable?: boolean } = { cancellable: true }
) => {
  const MESSAGE_CANCEL = "Cancel";
  const allChoices = choices.concat(
    cancellable
      ? [
          {
            message: MESSAGE_CANCEL,
            onPress() {
              analytics.trackEvent("preview", "actionsheet:matched:cancelled");
            }
          }
        ]
      : []
  );

  return new Promise((resolve, reject) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title,
        options: allChoices.map(({ message }) => message),
        cancelButtonIndex: allChoices.findIndex(
          ({ message }) => message === MESSAGE_CANCEL
        )
      },
      async (pressedIndex: number) => {
        if (!allChoices[pressedIndex]) {
          // TODO: Sentry
          reject(new Error(`Invalid index: ${pressedIndex}`));
        }

        try {
          const result = await allChoices[pressedIndex].onPress();
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

export default (text: string) => async (dispatch, getState) => {
  const path = selectors.getPath(getState());
  const repository = selectors.getRepository(getState());
  if (!path || !repository) return;

  analytics.trackEvent("preview", "actionsheet", { label: text });

  const language = languages.getMatch(path);
  const tokens = language.tokenize(text);
  if (tokens.length === 0) {
    analytics.trackEvent("preview", "actionsheet:failed", {
      label: "TOKEN_IS_EMPTY"
    });
  }

  let token = tokens[0];
  if (tokens.length > 1) {
    analytics.trackEvent("preview", "actionsheet:selection", {
      value: tokens.length
    });
    const tokenChoices = tokens.map(token => ({
      message: token,
      onPress: (): string => token
    }));
    token = await showActionSheet(`Which one do you select?`, tokenChoices);
  }
  if (!token) {
    analytics.trackEvent("preview", "actionsheet:selection:cancelled");
    return;
  }

  const matchedExtensions = extensions.getMatches(path);
  const menus = await Promise.all(
    matchedExtensions.map(ext => ext.getContextMenu(dispatch, token))
  );

  // FIXME: i18n
  const MESSAGE_SEARCH = `Search in ${repository}`;
  const messages = [
    {
      slug: `search-in-app`,
      message: MESSAGE_SEARCH,
      onPress: () =>
        navigate("Dashboard", {
          openSearch: true,
          searchParams: {
            q: token,
            repo: repository
          }
        })
    },
    ...flatten(menus).map(menu => {
      analytics.trackEvent("preview", "actionsheet:matched", {
        label: menu.slug
      });

      return {
        ...menu,
        onPress: () => {
          analytics.trackEvent("preview", "actionsheet:matched:chosen", {
            label: menu.slug
          });
          menu.onPress(dispatch);
        }
      };
    })
  ];

  await showActionSheet(token, messages);
};
