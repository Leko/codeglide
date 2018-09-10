const stripPrefix = (ext: string) => ext.replace(".", "");

export const extensionsToRegExp = (extensions: Array<string>) =>
  new RegExp(`\\.(${extensions.map(stripPrefix).join("|")})$`);
