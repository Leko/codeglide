import * as React from "react";
import { Repository } from "@codeglide/domain";
import { ReadOnlyEditor } from "../molecules/ReadOnlyEditor";
import { BackButton } from "../molecules/BackButton";
import PathBreadcrumb from "../molecules/PathBreadcrumb";
import Page from "../templates/Page";

export type Props = {
  onRequestBack: () => void;
  onRequestLoad: (
    repository: Repository,
    sha: string,
    fullpath: string
  ) => void;
  onRequestPath: (path: string) => void;
  repository: Repository;
  sha: string;
  path: string | null;
  filename: string;
  code: string | null;
};

export class CodeView extends React.Component<Props> {
  componentDidMount() {
    const { repository, sha, path, filename, onRequestLoad } = this.props;
    onRequestLoad(repository, sha, `${path ? `${path}/` : ""}${filename}`);
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
    const ext = filename.slice(filename.indexOf(".") + 1);

    return (
      <Page
        title={`${filename} in ${repository.owner}/${repository.repository}`}
        renderHeaderLeft={() => <BackButton onPress={onRequestBack} />}
      >
        <PathBreadcrumb
          paths={path ? path.split("/") : []}
          onPress={onRequestPath}
        />
        <ReadOnlyEditor value={code} language={ext} theme="vs" />
      </Page>
    );
  }
}
