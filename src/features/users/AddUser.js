import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form-controls/TextInput";
import {mobileValidation,emailValidation,passwordValidation,onlyLetters} from "../../components/utils/constant";
import { useNavigate, useLocation } from "react-router";
import {ApiEndPoint,postApiWithData,putData} from "../../service/axiosService";
import AlertMessage from "../../components/alertmessage/AlertMessage";

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowsData = location?.state?.rowData;
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const res =
        rowsData?._id !== undefined
          ? await putData(`${ApiEndPoint.UPDATED_USER}${rowsData?._id}`, data)
          : await postApiWithData(ApiEndPoint.ADD_USER, data);
      if (res.statusCode === 200) {
        navigate("/");
      } else if (res.response.data.statusCode === 409) {
        setAlert({
          show: true,
          message: res.response.data.message,
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
  if (rowsData?._id) {
    reset(rowsData);
  }
}, [rowsData, reset]);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4">
              {rowsData?._id !== undefined ? "Update User" : "Add User"}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xs-12 col-md-4 col-lg-3">
              <TextInput
                label="First Name"
                registration={register("fname", {
                  required: "First name is required",
                  pattern: {
                    value: onlyLetters,
                    message: "Please enter valid email id",
                  },
                })}
                error={errors.fname?.message}
              />
            </div>
            <div className="col-xs-12 col-md-4 col-lg-3">
              <TextInput
                label="Last Name"
                registration={register("lname", {
                  required: "Last name is required",
                })}
                error={errors.lname?.message}
              />
            </div>
            <div className="col-xs-12 col-md-4 col-lg-3">
              <TextInput
                label="Email"
                 isMaxLength={50}
                registration={register("email", {
                  required: "Email Id is required",
                  pattern: {
                    value: emailValidation,
                    message: "Please enter valid email id",
                  },
                })}
                error={errors.email?.message}
              />
            </div>
            <div className="col-xs-12 col-md-4 col-lg-3">
              <TextInput
                label="Mobile"
                isMaxLength={10}
                registration={register("mobileNo", {
                  required: "Mobile number is required",
                  pattern: {
                    value: mobileValidation,
                    message: "Please enter valid mobile no",
                  },
                })}
                error={errors.mobileNo?.message}
              />
            </div>
            {rowsData?._id !== undefined ? (
              ""
            ) : (
              <div className="col-xs-12 col-md-4 col-lg-3">
                <TextInput
                  label="Password"
                  type="password"
                  registration={register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordValidation,
                      message: "Please enter valid password",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password can not be greater then 15 characters",
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>
            )}
            {rowsData?._id !== undefined ? null : (
              <div className="col-xs-12 col-md-4 col-lg-3">
                <TextInput
                  label="Confirm Password"
                  type="password"
                  registration={register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                />
              </div>
            )}
          </div>

          <div className="mt-3 text-end">
            <button type="submit" className="btn btn-primary mr-5">
              {rowsData?._id !== undefined ? "Update User" : "Add User"}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>

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
export default AddUser;
