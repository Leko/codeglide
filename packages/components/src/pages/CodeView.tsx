import * as React from "react";
import { Repository } from "@codeglide/domain";
import { ReadOnlyEditor } from "../molecules/ReadOnlyEditor";
import { BackButton } from "../molecules/BackButton";
import PathBreadcrumb from "../molecules/PathBreadcrumb";
import Page from "../templates/Page";

export type Props = {
  onRequestBack: () => void;
  onRequestLoad: (repository: Repository, fullpath: string) => void;
  onRequestPath: (path: string) => void;
  repository: Repository;
  path: string | null;
  filename: string;
  code: string | null;
};

export class CodeView extends React.Component<Props> {
  componentDidMount() {
    const { repository, path, filename, onRequestLoad } = this.props;
    onRequestLoad(repository, `${path}/${filename}`);
  }

  render() {
    const {
      onRequestBack,
      onRequestPath,
      repository,
      code,
      path,
      filename
    } = this.props;

    return (
      <Page
        title={`${filename} in ${repository.owner}/${repository.repository}`}
        renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
      >
        <PathBreadcrumb
          paths={path ? path.split("/") : []}
          onPress={onRequestPath}
        />
        <ReadOnlyEditor value={code} language="JavaScript" height={500} />
      </Page>
    );
  }
}
