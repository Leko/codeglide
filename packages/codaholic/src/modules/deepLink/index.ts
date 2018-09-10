export const OPEN_IN_BROWSER = "OPEN_IN_BROWSER";

export const creators = {
  openInBrowser: ({ url }: { url: string }) => ({
    type: OPEN_IN_BROWSER,
    url
  })
};
