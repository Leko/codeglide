import * as React from "react";
import Fuse from "fuse.js";
import { Language } from "@codeglide/languages";
import Container from "../molecules/Container";
import { LanguageList } from "../molecules/LanguageList";
import { BackButton } from "../molecules/BackButton";
import Paper from "../molecules/Paper";
import { LanguageForm } from "../organisms/LanguageForm";
import Page from "../templates/Page";

export type Props = {
  onSelect: (repository: Language) => void;
  onRequestBack: () => void;
  languages: ReadonlyArray<Language>;
};

type State = {
  filter: string;
};

export class LanguageSelector extends React.Component<Props, State> {
  fuzzySearcher: Fuse = this.getFuzzySearcher();
  state: State = { filter: "" };

  constructor(props: Props) {
    super(props);
    this.getFuzzySearcher();
  }

  getFuzzySearcher(): Fuse {
    return new Fuse(this.props.languages as Array<Language>, {
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
      this.fuzzySearcher = this.getFuzzySearcher();
    }
  }

  render() {
    const { onSelect, onRequestBack } = this.props;

    return (
      <Page
        title="Choose language"
        renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
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
