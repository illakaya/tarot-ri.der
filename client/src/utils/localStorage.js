export const getSelectedCardInfo = () => {
  const savedCardInfo = localStorage.getItem('card_info')
    ? JSON.parse(localStorage.getItem('card_info'))
    : [];
  return savedCardInfo;
};

// Save the selected card IDs to local storage
export const saveSelectedCardInfo = (cardIdArr) => {
  if (cardIdArr.length) {
    localStorage.setItem('card_info', JSON.stringify(cardIdArr));
  } else {
    localStorage.removeItem('card_info');
  }
};