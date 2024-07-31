import React, { useContext, useEffect } from "react";
import { Table, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { delete_SV, edit_SV } from "../../redux/slice/sinhVienSlice";
import { setLocalStorage, getLocalStorage } from "../../utils/localStorage";
import { AlertContext } from "../../App";

const TableUser = () => {
  const { handleAlert } = useContext(AlertContext);
  const { list_SV } = useSelector((state) => state.sinhVien);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedList = getLocalStorage();
    dispatch({ type: "sinhVien/getList_SV", payload: savedList });
  }, [dispatch]);
  const columns = [
    {
      title: "Mã SV",
      dataIndex: "maSV",
      key: "maSV",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức năng",
      render: (text, record) => {
        // console.log(record);
        return (
          <Space>
            <button
              className="bg-yellow-400 px-3 py-2 text-white rounded hover:bg-yellow-500"
              onClick={() => {
                dispatch(edit_SV(record));
              }}
            >
              <i className="fa-solid fa-pencil"></i> Sửa
            </button>
            <button
              onClick={() => {
                dispatch(delete_SV(record.maSV));
                handleAlert("success", "Xóa thành công");
              }}
              className="bg-red-600 px-3 py-2 text-white rounded hover:bg-red-700"
            >
              <i className="fa-solid fa-trash-can"></i> Xóa
            </button>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={list_SV}
      columns={columns}
      pagination={{ defaultPageSize: 20 }}
    />
  );
};

export default TableUser;
