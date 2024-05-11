export const readConfigOrExit = <T extends string = string>(
  config: string
): T => {
  const value = process.env[config];

  if (!value) {
    console.error(`missing config ${config}`);
    process.exit(1);
  }

  return value as T;
};
