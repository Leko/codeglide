import * as React from "react";
import { connectStyle } from "@shoutem/theme";
import Button from "../molecules/Button";
import { SearchBar as RNSearchBar } from "react-native-elements";

interface IStyle {
  iconColor: string;
  placeholderTextColor: string;
  container: Object;
  inputContainer: Object;
  input: Object;
  leftIconContainer: Object;
  rightIconContainer: Object;
}

export type Props = {
  style: IStyle;
  placeholder: string;
  value: string;
  defaultValue: string;
  enablesReturnKeyAutomatically: boolean;
  autoFocus: boolean;
  searchIcon?: null;
  returnKeyType:
    | "search"
    | "default"
    | "none"
    | "done"
    | "go"
    | "next"
    | "send"
    | "previous"
    | "google"
    | "join"
    | "route"
    | "yahoo"
    | "emergency-call"
    | undefined;
  onFocus?: () => any;
  onBlur?: () => any;
  onClear?: () => any;
  onSubmit: () => any;
  onChangeText?: (text: string) => any;
};

export class SearchBar extends React.Component<Props> {
  ref?: RNSearchBar;

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.autoFocus && this.props.autoFocus && this.ref) {
      this.ref.focus();
    }
  }

  render() {
    const {
      style,
      onFocus,
      onBlur,
      onClear,
      onSubmit,
      onChangeText,
      placeholder,
      value,
      defaultValue,
      searchIcon,
      enablesReturnKeyAutomatically = false,
      autoFocus = false,
      returnKeyType = "search"
    } = this.props;

    return (
      <RNSearchBar
        ref={ref => {
          if (!ref) {
            return;
          }
          this.ref = ref;
        }}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType={returnKeyType}
        searchIcon={
          typeof searchIcon !== "undefined"
            ? searchIcon
            : { color: style && style.iconColor }
        }
        clearIcon={
          <Button
            icon="clear"
            styleName="icon slim"
            style={{ paddingRight: 0 }}
            onPress={() => {
              if (onClear) {
                onClear();
              }
              if (this.ref) {
                this.ref.focus();
              }
            }}
          />
        }
        placeholderTextColor={style && style.placeholderTextColor}
        containerStyle={style && style.container}
        inputContainerStyle={style && style.inputContainer}
        inputStyle={style && style.input}
        leftIconContainerStyle={style && style.leftIconContainer}
        rightIconContainerStyle={style && style.rightIconContainer}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onClear={onClear}
        onSubmitEditing={onSubmit}
      />
    );
  }
}

export default connectStyle("SearchBar", {})(SearchBar);
