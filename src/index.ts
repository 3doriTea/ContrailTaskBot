import { Client, Events, GatewayActivity, GatewayIntentBits } from "discord.js";
import { SpreadLoader } from "./spreadLoader";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client
  .once(Events.ClientReady, async (readyClient: Client) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  })
  .on(Events.MessageCreate, async (message) => {
    console.log(message.content);
    if (message.content == "Hello") {
      await message.reply("Hello World!");
    } else if (message.content == "タスク教えて") {
      const spreadLoader = new SpreadLoader(process.env.TARGET_SPREAD_SEET_ID);
      await spreadLoader.load("GanttChart");

      if (!spreadLoader.isLoaded) {
        await message.channel.send("読み込みできなかった！");
        return;
      }

      const sl = spreadLoader;

      const text: string = [`タイトル${sl.getValue(0, 0)}`].join("\n");

      await message.channel.send(text);
    }
  });

client.login(process.env.DISCORD_TOKEN);
