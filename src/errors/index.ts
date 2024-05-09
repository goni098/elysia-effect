export type ErrorArgs = Parameters<typeof Error>;

export type AnyHow = {
  readonly _tag: string;
  encodeHttp(): Error;
};
