
const genRequestInfo = (_method: string) : RequestInit => {
  return { method: _method, headers: { "Accept": "application/json" } };
};

export const cardsGetRequest = async <JsonT>(cardId: string): Promise<JsonT> => {
  const url = `https://api.trello.com/1/cards/${
    cardId}?key=${
    process.env.TRELLO_API_KEY}&token=${
    process.env.TRELLO_TOKEN}`;
  const response = await fetch(url, genRequestInfo("GET"));

  const json: JsonT = await response.json();

  return json;
};
