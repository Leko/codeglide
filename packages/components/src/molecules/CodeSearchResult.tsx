import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  CodeSearchResultItem,
  CodeSearchResultItemMatch
} from "@codeglide/domain";
import { Text } from "../atoms/Text";

type Props = {
  item: CodeSearchResultItem;
  className?: string;
  onPress: (item: CodeSearchResultItem) => void;
};

export const CodeSearchResult = ({ item, onPress, className }: Props) => (
  <Card className={className}>
    <CardActionArea style={{ width: "100%" }} onClick={() => onPress(item)}>
      <div style={{ background: "#444", color: "#fff" }}>
        <pre style={{ margin: 0, padding: 10 }}>
          {item.text_matches
            .map((match: CodeSearchResultItemMatch) => match.fragment)
            .join("\n---\n")}
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
            <Text>{item.path}</Text>
          </div>
          <NavigateNextIcon />
        </div>
      </CardContent>
    </CardActionArea>
  </Card>
);
