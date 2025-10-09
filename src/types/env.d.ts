declare namespace NodeJS {
  interface ProcessEnv {
    readonly DISCORD_TOKEN: string;
    readonly SPREAD_SEET_API_KEY: string;
    readonly TARGET_SPREAD_SEET_ID: string;
    readonly HTTP_PROXY: string | undefined;
    readonly HTTPS_PROXY: string | undefined;
    readonly TRELLO_TOKEN: string;
    readonly TRELLO_API_KEY: string;
    readonly TARGET_TRELLO_BOARD_ID: string;
  }
}
