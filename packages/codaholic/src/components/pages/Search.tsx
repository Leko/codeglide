import React from "react";
import { View, TextInput } from "@shoutem/ui";
import { withFormik, FormikProps } from "formik";
import omitBy from "lodash/omitBy";
import * as yup from "yup";
import { Subtitle } from "../atoms/Subtitle";
import { Caption } from "../atoms/Caption";
import ErrorMessage from "../atoms/ErrorMessage";
import ListItem from "../molecules/ListItem";
import RequiredIndicator from "../atoms/RequiredIndicator";
import Button from "../molecules/Button";
import SearchAccordion from "../organisms/SearchAccordion";
import { InnerProps } from "../organisms/SearchAccordion";
import { SearchParams } from "../../usecases/searchCode";

type Props = {
  open: boolean;
  defaultValues: Partial<Values>;
  onCancel: () => void;
  onSubmit: (searchParams: SearchParams) => void;
};
type Values = {
  q: string;
  repo: string;
  path: string;
  language: string;
};

const baseInputProps = {
  blurOnSubmit: false,
  clearButtonMode: "while-editing",
  autoCorrect: false
};

export class Search extends React.PureComponent<Props & FormikProps<Values>> {
  componentWillReceiveProps(nextProps: Props & FormikProps<Values>) {
    if (!this.props.open && nextProps.open) {
      this.props.resetForm(nextProps.defaultValues);
    }
  }

  render() {
    const {
      open,
      onCancel,
      values,
      errors,
      touched,
      setFieldTouched,
      setFieldValue,
      handleSubmit,
      resetForm
    } = this.props;

    return (
      <SearchAccordion
        {...baseInputProps}
        open={open}
        enablesReturnKeyAutomatically
        keyboardType="ascii-capable"
        placeholder={"Quick search"}
        onSubmit={handleSubmit}
        value={values.q}
        onBlur={() => setFieldTouched("q")}
        onChangeText={(text: string) => {
          setFieldValue("q", text);
        }}
      >
        {({ toggle }: InnerProps) => (
          <View styleName="container">
            <ListItem>
              <Subtitle style={{ flex: 1 }}>Filter</Subtitle>
              <Button
                styleName="icon"
                onPress={() => {
                  if (onCancel) onCancel();
                  resetForm({});
                  toggle();
                }}
                icon="close"
              />
            </ListItem>
            <ListItem>
              <Caption style={{ flex: 1 }}>
                Repository
                <RequiredIndicator />
              </Caption>
              <View style={{ flex: 2 }}>
                <TextInput
                  {...baseInputProps}
                  enablesReturnKeyAutomatically
                  keyboardType="url"
                  returnKeyType="search"
                  placeholder="owner/repo"
                  value={values.repo}
                  onBlur={() => setFieldTouched("repo")}
                  onChangeText={(text: string) => {
                    setFieldValue("repo", text);
                  }}
                  onSubmitEditing={handleSubmit}
                />
                {touched.repo &&
                  errors.repo && (
                    <ErrorMessage>ERROR: {errors.repo}</ErrorMessage>
                  )}
              </View>
            </ListItem>
            <ListItem>
              <Caption style={{ flex: 1 }}>Directory</Caption>
              <View style={{ flex: 2 }}>
                <TextInput
                  returnKeyType="search"
                  placeholder="__tests__"
                  value={values.path}
                  onBlur={() => setFieldTouched("path")}
                  onChangeText={(text: string) => {
                    setFieldValue("path", text);
                  }}
                  onSubmitEditing={handleSubmit}
                />
                {touched.path &&
                  errors.path && (
                    <ErrorMessage>ERROR: {errors.path}</ErrorMessage>
                  )}
              </View>
            </ListItem>
            <ListItem>
              <Caption style={{ flex: 1 }}>Language</Caption>
              <View style={{ flex: 2 }}>
                <TextInput
                  returnKeyType="search"
                  placeholder="JavaScript"
                  value={values.language}
                  onBlur={() => setFieldTouched("language")}
                  onChangeText={(text: string) => {
                    setFieldValue("language", text);
                  }}
                  onSubmitEditing={handleSubmit}
                />
                {touched.language &&
                  errors.language && (
                    <ErrorMessage>ERROR: {errors.language}</ErrorMessage>
                  )}
              </View>
            </ListItem>
          </View>
        )}
      </SearchAccordion>
    );
  }
}

export default withFormik({
  validateOnBlur: true,
  validateOnChange: true,
  mapPropsToValues: ({ defaultValues }: Props): Values => ({
    q: defaultValues.q || "",
    repo: defaultValues.repo || "",
    path: defaultValues.path || "",
    language: defaultValues.language || ""
  }),
  handleSubmit(values: Values, { props }: { props: Props }) {
    const validValues = omitBy(values, v => !v);

    const payload: SearchParams = {
      in: "file",
      q: validValues.q,
      repo: validValues.repo,
      path: validValues.path,
      language: validValues.language
    };
    props.onSubmit(payload);
  },
  validationSchema: yup.object().shape({
    q: yup.string().required(),
    repo: yup.string().required(),
    path: yup.string(),
    language: yup.string()
  })
})(Search);
