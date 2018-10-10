import * as React from "react";
import Fuse from "fuse.js";
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
  fuzzySearcher: Fuse;
  state: State = {
    filter: ""
  };

  constructor(props: Props) {
    super(props);
    this.configureFuzzySearcher();
  }

  configureFuzzySearcher(): void {
    this.fuzzySearcher = new Fuse(this.props.languages as Array<Language>, {
      shouldSort: true,
      keys: ["name", "extensions", "group"]
    });
  }

  handleChange = (filter: string) => {
    this.setState({ filter });
  };

  getFiltered(): ReadonlyArray<Language> {
    const { filter } = this.state;
    return filter ? this.fuzzySearcher.search(filter) : this.props.languages;
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.languages !== this.props.languages) {
      this.configureFuzzySearcher();
    }
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
