declare namespace NodeJS {
  interface ProcessEnv {
    readonly DISCORD_TOKEN: string;
    readonly SPREAD_SEET_API_KEY: string;
    readonly TARGET_SPREAD_SEET_ID: string;
  }
}
