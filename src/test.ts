import { SpreadLoader } from "./spreadLoader";
import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici" 
import { taskView } from "./formatter/taskView";

// プロキシが設定されているなら使う
if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
  setGlobalDispatcher(new EnvHttpProxyAgent());
}

const main = async () => {
  const loader = new SpreadLoader(process.env.TARGET_SPREAD_SEET_ID);
  await loader.load("GanttChart");
  
  const value = loader.getValue(0, 0);
  console.log(`値は「${value}」`);
  console.log(`url: ${loader.previousAccessUri}`);

  const text = taskView.data(loader.sheetAccessor);
  console.log(text);
}

main().then();
