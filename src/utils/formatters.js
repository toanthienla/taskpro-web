// Capitalize the first letter of a string
export const capitalizeFirstLetter = (val) => {
  if (!val) return '';
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

// Add empty card object to fix empty column in dndKit
export const generatePlaceholderCard = (column) => ({
  _id: `${column._id}-placeholder-card`,
  boardId: column.boardId,
  columnId: column._id,
  FE_PlaceholderCard: true
});

// Prevent user duple click submit
// Add className='interceptor-loading' to use
export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading');
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opacity = '0.5';
      elements[i].style.pointerEvents = 'none';
    } else {
      elements[i].style.opacity = 'initial';
      elements[i].style.pointerEvents = 'initial';
    }
  }
};
