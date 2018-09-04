import * as React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Toggle } from "react-powerplug";
import { connectStyle } from "@shoutem/theme";
import SearchBar from "./SearchBar";
import { Props as SearchBarProps } from "./SearchBar";

export type InnerProps = { toggle: () => void };

type Props = SearchBarProps & {
  open: boolean;
  children: (props: InnerProps) => any;
};

export const SearchAccordion = ({
  open,
  children,
  ...searchBarProps
}: Props) => (
  <Toggle initial={open}>
    {({ on, toggle }) => (
      <React.Fragment>
        <View style={{ zIndex: 2 }}>
          <SearchBar
            {...searchBarProps}
            autoFocus={open}
            onFocus={() => {
              if (searchBarProps.onFocus) {
                searchBarProps.onFocus();
              }
              if (!on) {
                toggle();
              }
            }}
          />
        </View>
        {on && (
          <Animatable.View
            style={{
              flex: 1,
              position: "absolute",
              top: 48, // SearchBar height
              left: 0,
              right: 0,
              bottom: -48,
              zIndex: 1
            }}
            animation="slideInDown"
            easing="ease-in-out-quint"
            duration={150}
          >
            {children({ toggle })}
          </Animatable.View>
        )}
      </React.Fragment>
    )}
  </Toggle>
);

export default connectStyle("SearchAccordion", {})(SearchAccordion);
