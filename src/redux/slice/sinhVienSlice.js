import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../utils/localStorage";

const initialState = {
  list_SV: [],
  info_SV: {
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  },
};

const sinhVienSlice = createSlice({
  name: "sinhVien",
  initialState,
  reducers: {
    getList_SV: (state, { type, payload }) => {
      state.list_SV = [...payload];
    },
    add_SV: (state, { type, payload }) => {
      //them sinh vao state va luu state vao local de su dung khi reload
      state.list_SV.push({ ...payload });
      setLocalStorage(state.list_SV);
    },
    delete_SV: (state, { type, payload }) => {
      const pos = state.list_SV.findIndex((sv) => sv.maSV === payload);
      if (pos !== -1) {
        state.list_SV.splice(pos, 1);
        setLocalStorage(state.list_SV);
      }
    },
    edit_SV: (state, { type, payload }) => {
      state.info_SV = payload;
    },
    update_SV: (state, { type, payload }) => {
      const pos = state.list_SV.findIndex((sv) => sv.maSV === payload.maSV);
      if (pos !== -1) {
        state.list_SV[pos] = payload;
        setLocalStorage(state.list_SV);
      }
    },
  },
});

export const { getList_SV, add_SV, delete_SV, edit_SV, update_SV } =
  sinhVienSlice.actions;

export default sinhVienSlice.reducer;
