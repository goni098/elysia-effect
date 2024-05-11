module.exports = {
  apps: [
    {
      name: "server-api",
      script: "bun --env-file=./.env.local src/index.ts"
    },
    {
      name: "scanner",
      script: "bun --env-file=./.env.local src/bin/scanner.ts"
    },
    {
      name: "stream",
      script: "bun --env-file=./.env.local src/bin/stream.ts"
    },
    {
      name: "launchpad-snapshot",
      script: "bun --env-file=./.env.local src/bin/launchpad-snapshot.ts"
    }
  ]
};
