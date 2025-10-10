const genTrelloAPI1 = (dir: string): string => {
  return `https://api.trello.com/1/${dir}?key=${
    process.env.TRELLO_API_KEY}&token=${
    process.env.TRELLO_TOKEN}`;
}

const genJsonRequestInfo = (_method: string) : RequestInit => {
  return { method: _method, headers: { "Accept": "application/json" } };
};

const getJsonRequest = async <JsonT>(url: string) : Promise<JsonT | null> => {
  const response = await fetch(url, genJsonRequestInfo("GET"));

  if (response.ok)
  {
    return await response.json();
  }

  console.error(`error response status:${response.status}`);
} 

const postRequest = async (url: string) : Promise<void> => {
  const response = await fetch(url, { method: "POST" });
}

const deleteRequest = async (url: string) : Promise<void> => {
  const response = await fetch(url, { method: "DELETE" });
}

const putRequest = async (url: string) : Promise<void> => {
  const response = await fetch(url, { method: "PUT" });
}


/**
 * GETメソッドでのカードアクセス
 * @param cardId カードId
 * @param dir カードのアクセス先
 * @returns 取得するJson
 */
export const cardsGetRequest =
async <JsonT>(cardId: string, dir: string = "") : Promise<JsonT | null> => {
  const url = genTrelloAPI1(`cards/${cardId}/${dir}`);
  return getJsonRequest(url);
};

/**
 * GETメソッドでボードアクセス
 * @param boardId ボードId
 * @param dir ボードのアクセス先
 * @returns 取得するJson
 */
export const boardGetRequest =
async <JsonT>(boardId: string, dir: string = "") : Promise<JsonT | null> => {
  const url = genTrelloAPI1(`boards/${boardId}/${dir}`);
  return getJsonRequest(url);
}

/**
 * GETメソッドでリストにアクセス
 * @param listId リストId
 * @param dir リストのアクセス先
 * @returns 取得するJson
 */
export const listGetRequest =
async <JsonT>(listId: string, dir: string = "") : Promise<JsonT | null> => {
  const url = genTrelloAPI1(`lists/${listId}/${dir}`);
  return getJsonRequest(url);
}
