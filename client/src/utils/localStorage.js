export const getSavedCardIds = () => {
  const savedCardIds = localStorage.getItem('saved_cards')
    ? JSON.parse(localStorage.getItem('saved_cards'))
    : [];
  return savedCardIds;
};

// Save the selected card IDs to local storage
export const saveSelectedCardIds = (cardIdArr) => {
  if (cardIdArr.length) {
    localStorage.setItem('selected_cards', JSON.stringify(cardIdArr));
  } else {
    localStorage.removeItem('selected_cards');
  }
};