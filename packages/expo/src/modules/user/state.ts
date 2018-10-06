export type State = {
  readonly boardedAt: string | null;
  readonly avatarUrl: string | null;
  readonly displayName: string | null;
  readonly accessToken: string | null;
};

export const Namespace = "user";
