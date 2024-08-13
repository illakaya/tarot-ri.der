export const retrieveAllCards = (query) => {
  return fetch(`https://tarotapi.dev/api/v1/cards/`);
}

export const retrieveOneCard = (query) => {
  return fetch(`https://tarotapi.dev/api/v1/cards/${query}`);
}