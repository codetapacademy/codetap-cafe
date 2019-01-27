import { UPDATE_USER } from "./const";

const updateUser = payload => ({
  type: UPDATE_USER,
  payload
});

export { updateUser };
