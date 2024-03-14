import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosBase, updateUser } from "src/app/http";
import { productType, userType } from "src/app/types/userType";

interface IState {
  user: userType;
  status: string;
  isAuth: boolean;
}
const initialState: IState = {
  user: {
    basket: [],
    email: "",
    favorites: [],
    name: "",
    surname: "",
    lastName: "",
    birthday: "",
  },
  isAuth: false,
  status: "loading",
};

interface IBody {
  name?: string;
  email: string;
  password: string;
}
export const loginUser = createAsyncThunk("loginUser", async (body: IBody) => {
  const { data } = await axiosBase.post("auth/login", body);
  localStorage.setItem("token", data.token);
  return data.user;
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (body: IBody) => {
    const { data } = await axiosBase.post("auth/register", body);
    localStorage.setItem("token", data.token);
    return data.user;
  }
);

export const getUser = createAsyncThunk("getUser", async () => {
  try {
    return await axiosBase
      .get("user")
      .then((res) => {
        if ("error" in res) {
          return localStorage.removeItem("token");
        }
        return res.data;
      })
      .catch((err) => {
        if (err.response.data.message === "Нет доступа") {
          localStorage.removeItem("token");
        }
      });
  } catch (error) {
    if (error) {
      return localStorage.removeItem("token");
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.user = initialState.user;
      state.isAuth = false;
      location.reload();
    },
    addItemToCart(state, { payload }) {
      let newCart = [...(state.user.basket as productType[])];
      const foundItem = state.user.basket.find(
        ({ _id }) => _id === payload._id
      );
      if (foundItem) {
        newCart = newCart.map((item) => {
          return item._id === foundItem._id
            ? {
                ...foundItem,
                quantity: payload.quantity || item.quantity + 1,
              }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }

      state.user.basket = newCart;
      updateUser(state.user);
    },
    removeItemCart(state, { payload }) {
      let newFavorite = [...(state.user.basket as productType[])];
      const foundItemIndex = newFavorite.findIndex(
        ({ _id }) => _id === payload._id
      );
      if (foundItemIndex !== -1) {
        newFavorite = newFavorite.filter((item) => item._id !== payload._id);
      }
      state.user.basket = newFavorite;
      updateUser(state.user);
    },
    addItemToFavorite(state, { payload }) {
      let newFavorite = [...(state.user.favorites as productType[])];
      const foundItemIndex = newFavorite.findIndex(
        ({ _id }) => _id === payload._id
      );
      if (foundItemIndex !== -1) {
        newFavorite = newFavorite.filter((item) => item._id !== payload._id);
      } else {
        newFavorite.push(payload);
      }
      state.user.favorites = newFavorite;
      updateUser(state.user);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = initialState.user;
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.isAuth = true;
        location.reload();
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = initialState.user;
        state.status = "Не верный логин или пароль";
      })

      .addCase(registerUser.pending, (state) => {
        state.user = initialState.user;
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.isAuth = true;
        location.reload();
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = initialState.user;
        state.status = "Пользователь с таким email уже существует";
      })

      .addCase(getUser.pending, (state) => {
        state.user = initialState.user;
        state.status = "loading";
        state.isAuth = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = "succeeded";
          state.isAuth = true;
        }
      })
      .addCase(getUser.rejected, (state) => {
        state.user = initialState.user;
        state.status = "error";
        state.isAuth = false;
      });
  },
});

export const { logOut, addItemToCart, addItemToFavorite, removeItemCart } =
  userSlice.actions;
export default userSlice.reducer;
