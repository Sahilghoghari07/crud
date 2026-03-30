import React from "react";
import dataJson from "./data.json";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "./features/users/userThunk";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Register from "./pages/Register";

const data = dataJson;

const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  hobby: [],
  gender: "Male",
  country: "",
  state: "",
  city: "",
  address: "",
};

function App() {
  const [formData, setFormData] = useState(initialValues);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({ ...initialValues, hobby: "" });
  const [editId, setEditId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // load users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...formData, [name]: value };

    // country change
    if (name === "country") {
      const selectedCountry = data.country.find((c) => c.name === value);
      setStates(selectedCountry ? selectedCountry.state : []);
      setCities([]);
      updatedForm.state = "";
      updatedForm.city = "";
    }

    // state change
    if (name === "state") {
      const selectedCountry = data.country.find(
        (c) => c.name === formData.country,
      );
      const selectedState = selectedCountry?.state?.find(
        (s) => s.name === value,
      );
      setCities(selectedState ? selectedState.city : []);
      updatedForm.city = "";
    }

    setFormData(updatedForm);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // handle hobby
  const handleHobby = (e) => {
    const { value, checked } = e.target;
    let updated = [...formData.hobby];

    if (checked) updated.push(value);
    else updated = updated.filter((h) => h !== value);

    setFormData({ ...formData, hobby: updated });
    setErrors((prev) => ({ ...prev, hobby: "" }));
  };

  // validate form
  const validateForm = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "Enter valid first name";
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Enter valid last name";
    }
    if (data.dateOfBirth === "") {
      errors.dateOfBirth = "DOB can not be empty";
    }
    if (!data.hobby.length) {
      errors.hobby = "Select at least 1 hobby";
    }
    if (data.country === "") {
      errors.country = "Country can not be empty";
    }
    if (data.state === "") {
      errors.state = "State can not be empty";
    }
    if (data.city === "") {
      errors.city = "City can not be empty";
    }
    if (!data.address.trim()) {
      errors.address = "Address can not be empty";
    }

    return errors;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      if (editId) {
        // update user
        dispatch(updateUser({ editId, formData }));
      } else {
        // add user
        dispatch(addUser(formData));
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // reset form
  const resetForm = () => {
    setFormData(initialValues);
    setStates([]);
    setCities([]);
    setErrors({ ...initialValues, hobby: "" });
    setEditId(null);
    setSelectedIds([]);
  };

  // update user
  const handleUpdate = async (id) => {
    const user = users?.find((u) => u._id === id);
    setEditId(id);

    if (user) {
      let formattedDate = "";

      if (user.dateOfBirth) {
        const [dd, mm, yyyy] = user.dateOfBirth.split("-");
        formattedDate = `${yyyy}-${mm}-${dd}`;
      }

      setFormData({ ...user, dateOfBirth: formattedDate });

      const selectedCountry = data.country.find((c) => c.name === user.country);
      setStates(selectedCountry?.state || []);

      const selectedState = selectedCountry?.state?.find(
        (s) => s.name === user.state,
      );
      setCities(selectedState?.city || []);
    }
  };

  // delete user
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  //   delete which is checked
  const deleteSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) => dispatch(deleteUser(id)).unwrap()),
      );

      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      alert("Delete Failed!");
    }
  };

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <UserForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                data={data}
                editId={editId}
                selectedIds={selectedIds}
                handleChange={handleChange}
                handleHobby={handleHobby}
                handleSubmit={handleSubmit}
                states={states}
                cities={cities}
                users={users}
                resetForm={resetForm}
                deleteSelected={deleteSelected}
              />
              <UserTable
                users={users}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
