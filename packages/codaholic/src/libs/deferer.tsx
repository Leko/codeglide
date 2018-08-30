import React from "react";
import { PureComponent, ComponentType } from "react";
import { View, ActivityIndicator } from "react-native";

type State = {
  deferedComponent: ComponentType | null;
};

export const deferer = (fn: (props: T) => Promise<ComponentType<T>>) =>
  class WrappedComponent extends PureComponent<T, State> {
    state: State = {
      deferedComponent: null
    };

    static get defaultProps() {
      return {
        loading: (
          <ActivityIndicator
            size="small"
            style={{ position: "absolute", top: 10, left: 10 }}
          />
        ),
        onError: () => {}
      };
    }

    componentDidMount() {
      fn(this.props)
        .then(deferedComponent => {
          console.log(deferedComponent);
          this.setState({ deferedComponent });
        })
        .catch(this.props.onError);
    }

    render() {
      const { children, loading } = this.props;
      const { deferedComponent } = this.state;
      console.log({ deferedComponent });

      if (!deferedComponent) {
        return (
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            {children}
            {loading}
          </View>
        );
      }

      return deferedComponent;
    }
  };
