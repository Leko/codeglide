import * as React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FolderIcon from "@material-ui/icons/Folder";
import DoneIcon from "@material-ui/icons/Done";
import CodeIcon from "@material-ui/icons/Code";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, Theme } from "@material-ui/core/styles";
import { SearchParamsState, Repository } from "@codeglide/domain";
import { Language } from "@codeglide/languages";
import { Row, Flex } from "../molecules/Row";
import { Text } from "../atoms/Text";

type Props = {
  defaultValue?: SearchParamsState;
  onSubmit: (params: SearchParamsState) => void;
  onRequestChooseRepository: (repository?: Repository) => void;
  onRequestChooseLanguage: (language?: Language) => void;
  onRequestChooseDirectory: () => void;
  disabled?: boolean;
  classes?: {
    textFieldcontainer: string;
    submitcontainer: string;
    dropdownLabel: string;
    buttonIcon: string;
  };
};
type State = {
  focused: boolean;
};

export class CodeSearchForm extends React.PureComponent<Props, State> {
  state: State = {
    focused: false
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // FIXME
    const values = this.props.defaultValue!;
    this.props.onSubmit(values);
  };

  handleRequestChooseRepository = () => {
    const { onRequestChooseRepository } = this.props;
    // const {} = this.state

    // FIXME
    onRequestChooseRepository();
  };

  handleRequestChooseLanguage = () => {
    const { onRequestChooseLanguage } = this.props;
    // const {} = this.state

    // FIXME
    onRequestChooseLanguage();
  };

  render() {
    const {
      defaultValue,
      disabled,
      classes,
      onRequestChooseDirectory
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Row className={classes!.textFieldcontainer}>
          <Flex flex={1} maxWidth="50%">
            <TextField
              disabled={disabled}
              id="input-code-search-field-q"
              placeholder="keyword"
              defaultValue={defaultValue && defaultValue.q}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Flex>
          <Flex flex={1} maxWidth="50%">
            <Row>
              <div style={{ margin: "0 6px" }}>
                <Text>in</Text>
              </div>
              <Flex flex={1}>
                <TextField
                  disabled={disabled}
                  id="input-code-search-repository"
                  placeholder="owner/repo"
                  defaultValue={
                    defaultValue &&
                    `${defaultValue.repo.owner}/${defaultValue.repo.repository}`
                  }
                />
              </Flex>
            </Row>
          </Flex>
          <IconButton
            disabled={disabled}
            onClick={this.handleRequestChooseRepository}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </Row>
        <Row>
          <Flex flex={1} maxWidth="50%">
            <Button
              fullWidth
              size="small"
              disabled={disabled}
              onClick={onRequestChooseDirectory}
            >
              <FolderIcon />
              <Text className={classes!.dropdownLabel}>
                {defaultValue ? defaultValue.path : "all"}
              </Text>
              <ArrowDropDownIcon />
            </Button>
          </Flex>
          <Flex flex={1} maxWidth="50%">
            <Button
              fullWidth
              size="small"
              disabled={disabled}
              onClick={this.handleRequestChooseLanguage}
            >
              <CodeIcon />
              <Text className={classes!.dropdownLabel}>
                {defaultValue ? defaultValue.language : "all"}
              </Text>
              <ArrowDropDownIcon />
            </Button>
          </Flex>
        </Row>
        <div className={classes!.submitcontainer}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={disabled}
          >
            <DoneIcon className={classes!.buttonIcon} />
            <Text>Search</Text>
          </Button>
        </div>
      </form>
    );
  }
}

const styles = (theme: Theme) => ({
  textFieldcontainer: {
    paddingLeft: theme.spacing.unit
  },
  submitcontainer: {
    padding: theme.spacing.unit
  },
  dropdownLabel: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    textAlign: "left" as "left",
    whiteSpace: "nowrap" as "nowrap",
    overflow: "hidden" as "hidden",
    textOverflow: "ellipsis" as "ellipsis"
  },
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(CodeSearchForm);
