import * as React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Repository } from "@codeglide/domain";
import { Text } from "../atoms/Text";
import { Row, Flex } from "../molecules/Row";

type Props = {
  defaultValue: Repository;
  onChange: (repository: Repository) => void;
};

export class RepositoryForm extends React.PureComponent<Props> {
  public static defaultProps = {
    defaultValue: { owner: "", repository: "" }
  };

  private owner: string = this.props.defaultValue.owner;
  private repository: string = this.props.defaultValue.repository;

  handleChangeOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.owner = event.target.value;
    this.handleChange();
  };

  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.repository = event.target.value;
    this.handleChange();
  };

  handleChange = () => {
    this.props.onChange({
      owner: this.owner,
      repository: this.repository
    });
  };

  render() {
    const { defaultValue } = this.props;

    return (
      <Row>
        <Flex>
          <TextField
            defaultValue={defaultValue.owner}
            onChange={this.handleChangeOwner}
            id="input-repository-field-owner"
            placeholder="org or user"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Flex>
        <div style={{ margin: "0 6px" }}>
          <Text>/</Text>
        </div>
        <Flex>
          <TextField
            defaultValue={defaultValue.repository}
            onChange={this.handleChangeName}
            id="input-repository-field-repository"
            placeholder="repository"
          />
        </Flex>
      </Row>
    );
  }
}
