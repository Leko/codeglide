import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Language } from "@codeglide/languages";
import { Circle } from "../atoms/Circle";

type Props = {
  languages: ReadonlyArray<Language>;
  onPress: (language: Language) => void;
};

export const LanguageList = ({ languages, onPress }: Props) => (
  <List>
    {languages.map((language: Language) => (
      <ListItem key={language.name} button onClick={() => onPress(language)}>
        <Circle size={10} color={language.color} />
        <ListItemText
          inset
          primary={`${language.name}${
            language.group ? `(${language.group})` : ""
          }`}
          secondary={language.type}
        />
      </ListItem>
    ))}
  </List>
);
