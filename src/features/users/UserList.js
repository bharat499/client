import React, { useEffect, useState } from "react";
import {
  ApiEndPoint,
  getAppData,
  deleteRecord,
} from "../../service/axiosService";
import { useNavigate } from "react-router";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";
import AlertMessage from "../../components/alertmessage/AlertMessage";
import TableWithPagination from "../../components/table/TableWithPagination";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

 
  const getUserList = async () => {
    try {
      const res = await getAppData(ApiEndPoint.GET_USER_LIST);
      if (res.statusCode === 200) {
        setUsers(res.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (row) => {
    setUserId(row?._id);
    setShowConfirm(true);
  };
  const handleConfirm = async () => {
    try {
      const res = await deleteRecord(`${ApiEndPoint.DELETE_USER}${userId}`);
      if (res.statusCode === 200) {
        setShowConfirm(false);
        setAlert({ show: true, message: res.message, type: "success" });
        getUserList();
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, type: "danger" });
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const onEdit = (user) => {
    navigate("/update-user", { state: { rowData: user } });
  };
  useEffect(() => {
    getUserList();
  }, []);

  const columns = [
    {
      label: "Full Name",
      field: "fname",
      render: (row) => `${row.fname} ${row.lname}`,
    },
    { label: "Email", field: "email" },
    { label: "Mobile", field: "mobileNo",className: "text-center" },
    {
      label: "Actions",
      field: "actions",
      className: "text-center",
      render: (row) => (
        <>
          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Edit User"
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(row)}
          >
            <i className="bi bi-pen"></i>
          </button>

          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Delete User"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
             <i className="bi bi-trash"></i>
          </button>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-4">User List</h2>
          </div>
          <div className="col-md-6 text-end">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add")}
            >
              Add User
            </button>
          </div>
        </div>
        <TableWithPagination columns={columns} data={users} itemsPerPage={10} />
        

        <ConfirmDialog
          show={showConfirm}
          title="Delete Confirmation"
          message="Are you sure you want to delete this item?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <AlertMessage
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      </div>
    </>
  );
};
export default UserList;
