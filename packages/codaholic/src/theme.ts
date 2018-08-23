import { StyleSheet } from "react-native";
import Color from "color";

type Palette = {
  BACKGROUND: string;
  BACKGROUND_BACK: string;
  BACKGROUND_DEVIDER: string;
  EYECATCH: string;
  DIMMED: string;
  ACCENT: string;
  TEXT: string;
};
type Theme = {};

const themerize = (palette: Palette): Theme => ({
  // Title > Subtitle > Heading > Caption > Text
  "shoutem.ui.Title": {
    color: palette.TEXT,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 14
  },
  "shoutem.ui.Subtitle": {
    color: palette.TEXT,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4
  },
  "shoutem.ui.Heading": {
    color: palette.TEXT,
    fontSize: 18,
    marginBottom: 4
  },
  "shoutem.ui.Caption": {
    color: palette.TEXT,
    fontSize: 14
  },
  "shoutem.ui.Text": {
    color: palette.DIMMED,
    fontSize: 14
  },
  "shoutem.ui.View": {
    backgroundColor: palette.BACKGROUND,
    ".container": {
      flex: 1,
      padding: 8
    }
  },
  "shoutem.ui.TextInput": {
    placeholderTextColor: palette.DIMMED,
    color: palette.TEXT
  },

  StatusBar: {
    backgroundColor: palette.BACKGROUND
  },
  NavBar: {
    tintColor: palette.DIMMED,
    header: {
      backgroundColor: palette.BACKGROUND,
      borderBottomColor: palette.BACKGROUND_DEVIDER
    },
    title: {
      color: palette.DIMMED,
      fontWeight: "normal"
    }
  },
  Drawer: {
    container: {
      backgroundColor: palette.BACKGROUND,
      borderRightColor: palette.BACKGROUND_BACK,
      borderRightWidth: StyleSheet.hairlineWidth
    },
    safeArea: {
      paddingHorizontal: 10
    }
  },
  Divider: {
    borderBottomColor: palette.BACKGROUND_DEVIDER,

    ".thin": {
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    ".dent": {
      borderBottomColor: palette.BACKGROUND_BACK
    }
  },
  Icon: {
    fontSize: 24,
    color: palette.TEXT,

    ".dimmed": {
      color: palette.DIMMED
    }
  },
  Button: {
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 28,
    borderRadius: 2,

    ".icon": {
      margin: 0,
      padding: 8
    }
  },
  Checkbox: {
    fontSize: 22,
    color: palette.TEXT
  },
  Container: {
    container: {
      backgroundColor: palette.BACKGROUND
    },
    scrollable: {}
  },
  ListItem: {
    marginVertical: 8
  },
  SnackBar: {
    backgroundColor: palette.ACCENT,
    color: palette.DIMMED,
    actionColor: palette.BACKGROUND
  },
  RequiredIndicator: {
    color: palette.EYECATCH
  },
  ErrorMessage: {
    color: palette.EYECATCH
  },
  SearchBar: {
    iconColor: palette.TEXT,
    placeholderTextColor: palette.BACKGROUND_DEVIDER,
    container: {
      backgroundColor: palette.BACKGROUND,
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    inputContainer: {
      backgroundColor: palette.BACKGROUND_BACK
    },
    input: {
      color: palette.TEXT
    },
    leftIconContainer: {},
    rightIconContainer: {}
  }
});

// https://dribbble.com/shots/3678483-Music-Player-and-Menu-dark-theme
export const darkTheme = themerize({
  BACKGROUND: "#2B2C5A",
  BACKGROUND_BACK: Color("#2B2C5A")
    .darken(0.3)
    .string(),
  BACKGROUND_DEVIDER: Color("#2B2C5A")
    .lighten(0.2)
    .string(),
  EYECATCH: "#E5476D",
  // _: "#995179",
  DIMMED: "#6C7CE8",
  ACCENT: "#F4C429",
  TEXT: "#F4F4F6"
  // _: "#EC9461"
});
