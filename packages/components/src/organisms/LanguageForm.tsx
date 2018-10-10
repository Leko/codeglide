import * as React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

type Props = {
  defaultValue: string;
  onChange: (language: string) => void;
};

export class LanguageForm extends React.PureComponent<Props> {
  public static defaultProps = {
    defaultValue: ""
  };

  handleChangeOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { defaultValue } = this.props;

    return (
      <TextField
        fullWidth
        defaultValue={defaultValue}
        onChange={this.handleChangeOwner}
        id="input-language-field-filter"
        placeholder="filter"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    );
  }
}
