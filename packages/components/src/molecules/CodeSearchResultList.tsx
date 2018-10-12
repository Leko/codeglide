import * as React from "react";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withStyles, Theme } from "@material-ui/core/styles";
import { CodeSearchResultItem } from "@codeglide/domain";
import { Placeholder, TextBlock } from "./Placeholder";
import { CodeSearchResult } from "./CodeSearchResult";

type Props = {
  placeholder?: boolean;
  results: ReadonlyArray<CodeSearchResultItem>;
  onPress: (item: CodeSearchResultItem) => void;
  classes?: {
    item: string;
    codeContainer: string;
    placeholderIcon: string;
  };
};

export const CodeSearchResultList = ({
  placeholder = false,
  results,
  classes,
  onPress
}: Props) => (
  <Placeholder
    ready={!placeholder}
    renderPlaceholder={() => (
      <List>
        {[0, 1, 2].map(n => (
          <Card key={n} className={classes!.item}>
            <div className={classes!.codeContainer}>
              <TextBlock rows={3} inverted />
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
                  <TextBlock rows={1} />
                </div>
                <NavigateNextIcon className={classes!.placeholderIcon} />
              </div>
            </CardContent>
          </Card>
        ))}
      </List>
    )}
  >
    <List>
      {results.map((item: CodeSearchResultItem) => (
        <CodeSearchResult
          className={classes!.item}
          item={item}
          onPress={onPress}
        />
      ))}
    </List>
  </Placeholder>
);

const styles = (theme: Theme) => ({
  item: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  codeContainer: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[100]
  },
  placeholderIcon: {
    color: theme.palette.grey[100]
  }
});

export default withStyles(styles)(CodeSearchResultList);
