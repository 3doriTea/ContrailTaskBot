const genTrelloAPI1 = (
  dir: string,
  otherQueryParam: undefined | any = undefined
): string => {
  const paramStr = new URLSearchParams({
    key: `${process.env.TRELLO_API_KEY}`,
    token: `${process.env.TRELLO_TOKEN}`,
    ...otherQueryParam,
  });
  return `https://api.trello.com/1/${dir}?${paramStr}`;
};

const genJsonRequestInfo = (_method: string): RequestInit => {
  return { method: _method, headers: { Accept: "application/json" } };
};

const getJsonRequest = async <JsonT>(url: string): Promise<JsonT | null> => {
  const response = await fetch(url, genJsonRequestInfo("GET"));

  if (response.ok) {
    return await response.json();
  }

  console.error(`error response status:${response.status}`);
};

const postJsonRequest = async <JsonT>(url: string): Promise<JsonT | null> => {
  const response = await fetch(url, genJsonRequestInfo("POST"));

  if (response.ok) {
    return await response.json();
  }

  console.error(`error response status:${response.status}`);
};

const putJsonRequest = async <JsonT>(url: string): Promise<JsonT | null> => {
  const response = await fetch(url, genJsonRequestInfo("PUT"));

  if (response.ok) {
    return await response.json();
  }

  console.error(`error response status:${response.status}`);
};

const postRequest = async (url: string): Promise<void> => {
  const response = await fetch(url, { method: "POST" });
};

const deleteRequest = async (url: string): Promise<void> => {
  const response = await fetch(url, { method: "DELETE" });
};

const putRequest = async (url: string): Promise<void> => {
  const response = await fetch(url, { method: "PUT" });
};

/**
 * GETメソッドでのカードアクセス
 * @param cardId カードId
 * @param dir カードのアクセス先
 * @returns 取得するJson
 */
export const cardsGetRequest = async <JsonT>(
  cardId: string,
  dir: string = ""
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`cards/${cardId}/${dir}`);
  return getJsonRequest(url);
};

/**
 * POSTメソッドでカードにアクセス
 * @param cardId カードId
 * @param dir カードのアクセス先
 * @returns 取得するJson
 */
export const cardsPostRequest = async <JsonT>(
  cardId: string,
  dir: string = "",
  param: any | undefined = undefined
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`cards/${cardId}/${dir}`, param);
  return postJsonRequest(url);
};

/**
 * PUTメソッドでカードにアクセス
 * @param cardId カードId
 * @param dir カードのアクセス先
 * @returns 取得するJson
 */
export const cardsPutRequest = async <JsonT>(
  cardId: string,
  dir: string = "",
  param: any | undefined = undefined
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`cards/${cardId}/${dir}`, param);
  return putJsonRequest(url);
};

/**
 * GETメソッドでボードアクセス
 * @param boardId ボードId
 * @param dir ボードのアクセス先
 * @returns 取得するJson
 */
export const boardGetRequest = async <JsonT>(
  boardId: string,
  dir: string = ""
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`boards/${boardId}/${dir}`);
  return getJsonRequest(url);
};

/**
 * GETメソッドでワークスペースにアクセス
 * @param organizationId ワークスペースId
 * @param dir ワークスペースのアクセス先
 * @returns 取得するJson
 */
export const organizationGetRequest = async <JsonT>(
  organizationId: string,
  dir: string = ""
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`organizations/${organizationId}/${dir}`);
  return getJsonRequest(url);
};

/**
 * GETメソッドでリストにアクセス
 * @param listId リストId
 * @param dir リストのアクセス先
 * @returns 取得するJson
 */
export const listGetRequest = async <JsonT>(
  listId: string,
  dir: string = ""
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`lists/${listId}/${dir}`);
  return getJsonRequest(url);
};

/**
 * POSTメソッドでリストにアクセス
 * @param listId リストId
 * @param dir リストのアクセス先
 * @returns 取得するJson
 */
export const listPostRequest = async <JsonT>(
  listId: string,
  dir: string = "",
  param: any | undefined = undefined
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`lists/${listId}/${dir}`, param);
  return postJsonRequest(url);
};

/**
 * PUTメソッドでリストにアクセス
 * @param listId リストId
 * @param dir リストのアクセス先
 * @returns 取得するJson
 */
export const listPutRequest = async <JsonT>(
  listId: string,
  dir: string = "",
  param: any | undefined = undefined
): Promise<JsonT | null> => {
  const url = genTrelloAPI1(`lists/${listId}/${dir}`, param);
  return putJsonRequest(url);
};
