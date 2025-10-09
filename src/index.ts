import { Client, Events, GatewayActivity, GatewayIntentBits } from "discord.js";
import { SpreadLoader } from "./spreadLoader";
import { taskView } from "./formatter/taskView";
import { AllTaskMessage } from "./messageBuilder/allTaskMessage";

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
    if (message.author.id === client.user.id) {
      return;
    }
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

      const data = taskView.data(spreadLoader.sheetAccessor);

      const sendMessage = new AllTaskMessage().gen(data);

      await message.channel.send(sendMessage);
    }
  });

client.login(process.env.DISCORD_TOKEN);
