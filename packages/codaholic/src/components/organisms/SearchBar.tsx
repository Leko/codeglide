import * as React from "react";
import { connectStyle } from "@shoutem/theme";
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
  onFocus: () => any;
  onBlur: () => any;
  onChangeText: (text: string) => any;
};

export const SearchBar = ({
  style,
  onFocus,
  onBlur,
  onChangeText,
  placeholder
}: Props) => (
  <RNSearchBar
    searchIcon={{ color: style && style.iconColor }}
    clearIcon={{ color: style && style.iconColor }}
    placeholderTextColor={style && style.placeholderTextColor}
    containerStyle={style && style.container}
    inputContainerStyle={style && style.inputContainer}
    inputStyle={style && style.input}
    leftIconContainerStyle={style && style.leftIconContainer}
    rightIconContainerStyle={style && style.rightIconContainer}
    placeholder={placeholder}
    onChangeText={onChangeText}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

export default connectStyle("SearchBar", {})(SearchBar);
