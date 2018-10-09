import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FolderIcon from "@material-ui/icons/Folder";
import CodeIcon from "@material-ui/icons/Code";
import SearchIcon from "@material-ui/icons/Search";
import { Text } from "../atoms/Text";
import Container from "../molecules/Container";
import Page from "../templates/Page";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

// FIXME: Move to domain
export type RepositoryHistory = {
  owner: string;
  repository: string;
  lastOpenedAt: number; // UNIT timestamp
};

type Props = {
  repositoryHistory: ReadonlyArray<RepositoryHistory>;
};

export const CodeSearchResult: React.SFC<Props> = ({
  repositoryHistory
}: Props) => (
  <Page
    title="Choose repository"
    renderHeaderLeft={() => (
      <IconButton color="inherit" aria-label="Menu">
        <NavigateBeforeIcon />
      </IconButton>
    )}
  >
    <Paper square>
      <div
        // FIXME: Move to CSS class
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "10px"
        }}
      >
        <div style={{ flex: 1 }}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="keyword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div style={{ margin: "0 6px" }}>
          <Text>in</Text>
        </div>
        <div style={{ flex: 1 }}>
          <TextField id="input-with-icon-textfield" placeholder="owner/repo" />
        </div>
        <IconButton color="inherit">
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <Grid container justify="space-between">
        <Grid item style={{ flex: 1 }}>
          <Button color="inherit" fullWidth>
            <FolderIcon />
            <div style={{ flex: 1, textAlign: "left", margin: "0 10px" }}>
              all
            </div>
            <ArrowDropDownIcon />
          </Button>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <Button color="inherit" fullWidth>
            <CodeIcon />
            <div style={{ flex: 1, textAlign: "left", margin: "0 10px" }}>
              all
            </div>
            <ArrowDropDownIcon />
          </Button>
        </Grid>
      </Grid>
    </Paper>
    <Container>
      <Card>
        <CardActionArea style={{ width: "100%" }}>
          <div style={{ background: "#444", color: "#fff" }}>
            <pre style={{ margin: 0, padding: 10 }}>
              const hoge = 1; import foo from './foo.ts'
            </pre>
          </div>
          <CardContent style={{ padding: "4px 10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div style={{ flex: 1 }}>
                <Text>hoge/foo/bar/buzz.js</Text>
              </div>
              <NavigateNextIcon />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  </Page>
);

CodeSearchResult.defaultProps = {
  repositoryHistory: []
};
