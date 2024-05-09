export const readConfigOrDie = (config: string) => {
  const c = process.env[config];

  if (!c) {
    console.error(`Missing ${config} env config`);
    process.exit(1);
  }

  return c;
};
