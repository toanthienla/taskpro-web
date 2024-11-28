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
