import { configureStore } from "@reduxjs/toolkit";
import sinhVienSlice from "./slice/sinhVienSlice";

export const store = configureStore({
  reducer: {
    sinhVien: sinhVienSlice,
  },
});
