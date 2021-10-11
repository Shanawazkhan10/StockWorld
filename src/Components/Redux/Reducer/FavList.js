const initialState = {
  data: [],
};

export const FavList = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV":
      return {
        ...state,
        data: [...state.data, action.message],
      };
    case "DELETE_FAV":
      return {
        ...state,
        data: [...state.data.filter((el) => el.id !== action.id)],
      };
    case "UPDATE_FAV":
      return {};
    default:
      return state;
  }
};
