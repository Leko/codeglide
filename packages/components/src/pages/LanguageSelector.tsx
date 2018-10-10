import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Language } from "@codeglide/languages";
import Container from "../molecules/Container";
import { LanguageList } from "../molecules/LanguageList";
import Paper from "../molecules/Paper";
import { LanguageForm } from "../organisms/LanguageForm";
import Page from "../templates/Page";

type Props = {
  onSelect: (repository: Language) => void;
  languages: ReadonlyArray<Language>;
};

type State = {
  filter: string;
};

export class LanguageSelector extends React.Component<Props, State> {
  state: State = {
    filter: ""
  };

  handleChange = (filter: string) => {
    this.setState({ filter });
  };

  // FIXME: performance optimizing
  getFiltered() {
    const { languages } = this.props;
    const { filter } = this.state;
    const f = filter.toLowerCase();
    return languages.filter(({ name }) => name.toLowerCase().includes(f));
  }

  render() {
    const { onSelect } = this.props;

    return (
      <Page
        title="Choose language"
        renderHeaderLeft={() => (
          <IconButton color="inherit" aria-label="Menu">
            <NavigateBeforeIcon />
          </IconButton>
        )}
      >
        <Container last={false}>
          <Paper>
            <LanguageForm
              defaultValue={this.state.filter}
              onChange={this.handleChange}
            />
          </Paper>
        </Container>
        <LanguageList languages={this.getFiltered()} onPress={onSelect} />
      </Page>
    );
  }
}
