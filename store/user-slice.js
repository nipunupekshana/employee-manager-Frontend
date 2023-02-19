import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { HYDRATE } from "next-redux-wrapper";
import getConfig from 'next/config'
const {
  publicRuntimeConfig: {BASE_URL},  // Available both client and server side
} = getConfig()
axios.defaults.baseURL = `${BASE_URL}/api`;

const initialState = {
  users: [],
  filteredUsers: [],
  userLoading: false,
  userFetching: false,
  isSearch: false,
};

const usersSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    addUser: (state, action) => {
      state.users = state.users.concat(action.payload);
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      state.users[userIndex] = action.payload;
    },
    removeUsers: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setUserFetching: (state, action) => {
      state.userFetching = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state, // use previous state
        ...action.payload.user, //apply data from hydration
      };
    },
  },
});

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(usersSlice.actions.setUserFetching(true));
    const response = await axios.get("/employee");

    if (response.status !== 200) {
      throw new Error("Sending user data failed.");
    }
    const loadedUsers = [...response.data];
    dispatch(usersSlice.actions.setAllUsers(loadedUsers));
    dispatch(usersSlice.actions.setUserFetching(false));
  } catch (error) {
    dispatch(usersSlice.actions.setUserFetching(false));
  }
};

export const findUser = (id) => async (dispatch) => {
  const response = await axios.get(`/employee/${id}`);

  if (response.status !== 200) {
    throw new Error("Sending user data failed.");
  }

  const loadedUser = response.data;
  dispatch(usersSlice.actions.addUser(loadedUser));
  return response.data;
};

// create a function to add user data and make the API call
export const addUser = (userData, callback) => async (dispatch) => {
  try {
    dispatch(usersSlice.actions.setUserLoading(true));
    const response = await axios.post("/employee", userData);

    if (response.status !== 200) {
      dispatch(usersSlice.actions.setError("Adding user data failed."));
      throw new Error(response.data);
    }

    //add user data to the state
    await dispatch(fetchUsers());
    dispatch(usersSlice.actions.setUserLoading(false));
    toast.success("User added successfully!");

    // call the callback function to redirect to home page
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch(usersSlice.actions.setUserLoading(false));
    toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

// create a function to update user data and make the API call
export const updateUserData = (userData, callback) => async (dispatch) => {
  try {
    dispatch(usersSlice.actions.setUserLoading(true));
    const response = await axios.put(`/employee/${userData._id}`, userData);

    if (response.status !== 200) {
      dispatch(usersSlice.actions.setError("updating user data failed."));
      throw new Error("updating user data failed.");
    }

    dispatch(usersSlice.actions.updateUser(userData));
    dispatch(usersSlice.actions.setUserLoading(false));
    toast.success("User updated successfully!");

    // call the callback function to redirect to home page
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    dispatch(usersSlice.actions.setUserLoading(false));
    toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

// create a function to remove user data and make the API call
export const removeUser = (userId, callback) => async (dispatch) => {
  try {
    const response = await axios.delete(`/employee/${userId}`);

    if (response.status !== 200) {
      throw new Error("removing user data failed.");
    }

    // remove user data from the state
    dispatch(usersSlice.actions.removeUsers(userId));
    toast.success("User removed successfully!");

    // call the callback function to redirect to home page
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

export const filterUsers = (searchText) => async (dispatch, getState) => {
  const { users } = getState().user;
  if (!searchText) {
    dispatch(usersSlice.actions.setFilteredUsers([]));
    dispatch(usersSlice.actions.setIsSearch(false));
    return;
  }
  let filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.number.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchText.toLowerCase().charAt(0))
    );
  });
  dispatch(usersSlice.actions.setFilteredUsers(filteredUsers));
  dispatch(usersSlice.actions.setIsSearch(true));
};

export const reducers = usersSlice.reducer;
export const actions = usersSlice.actions;
export default usersSlice;
