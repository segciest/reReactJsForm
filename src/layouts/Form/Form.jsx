import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../components/Input/InputCustom";
import { useDispatch, useSelector } from "react-redux";
import { add_SV, update_SV } from "../../redux/slice/sinhVienSlice";
import { AlertContext } from "../../App";

const Form = () => {
  const { handleAlert } = useContext(AlertContext);
  const { info_SV, list_SV } = useSelector((state) => state.sinhVien);
  const dispatch = useDispatch();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    isValid,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const existingStudent = list_SV.find((sv) => sv.maSV === values.maSV);
      if (existingStudent) {
        handleAlert("error", "Mã sinh viên đã tồn tại");
        return;
      }
      dispatch(add_SV(values));
      handleAlert("success", "Thêm hành công");
      handleUpdate(values);
      resetForm();
    },
    validationSchema: Yup.object({
      maSV: Yup.string().required("Vui lòng không bỏ trống"),
      hoTen: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /^[a-zA-Z\s'\-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/g,
          "Vui lòng nhập họ tên là chữ"
        ),
      sdt: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Đây không phải số điện thoại"
        ),
      email: Yup.string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập đúng dạng email"),
    }),
  });
  useEffect(() => {
    setValues(info_SV);
  }, [info_SV, setValues]);
  const handleUpdate = (values) => {
    dispatch(update_SV(values));
    handleAlert("success", "Chỉnh sửa thành công");
  };
  return (
    <div className="pt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputCustom
            label="Mã SV"
            name="maSV"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.maSV}
            touched={touched.maSV}
            value={values.maSV}
          />
          <InputCustom
            label="Họ tên"
            name="hoTen"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.hoTen}
            touched={touched.hoTen}
            value={values.hoTen}
          />
          <InputCustom
            label="Số điện thoại"
            name="sdt"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.sdt}
            touched={touched.sdt}
            value={values.sdt}
          />
          <InputCustom
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
          <div className="space-x-3">
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded mt-4"
              type="submit"
            >
              Thêm sinh viên
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-5 rounded mt-4"
              type="button"
              onClick={() => {
                handleUpdate(values);
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
