import { ADD_FAV, DELETE_FAV, UPDATE_FAV } from "./Type";

export const addFav = (message) => ({
  type: ADD_FAV,
  message,
});
export const deleteFav = (id) => ({
  type: DELETE_FAV,
  id,
});
export const updateFav = ({ id, message }) => ({
  type: UPDATE_FAV,
  id,
  message,
});
