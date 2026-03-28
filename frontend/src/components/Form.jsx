import React, { useEffect, useState } from "react";
import dataJson from "../data.json";
import { BsPencilSquare } from "react-icons/bs";
import { IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../features/users/userThunk";

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

function Form() {
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
      setFormData(user);

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

  //   check all checkbox if users exists
  const isSelectedAll =
    users?.length > 0 && selectedIds.length === users.length;

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
      <div className="container mx-auto p-6 max-w-200">
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="flex flex-col md:flex-row gap-4 justify-center ">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="mb-1 font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 ${errors.firstName ? "border-red-400" : ""}`}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="mb-1 font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 ${errors.lastName ? "border-red-400" : ""}`}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* date of birth */}
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="dateOfBirth" className="mb-1 font-medium">
              DOB <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 ${errors.dateOfBirth ? "border-red-400" : ""}`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* hobby */}
          <div className="flex flex-wrap gap-6 mt-2">
            <label className="mb-1 font-medium">Hobby</label>

            <div className="flex items-center justify-center gap-2">
              {["Reading", "Writing", "Dancing", "Yoga"].map((h) => (
                <label htmlFor={h} key={h} className="me-2">
                  <input
                    type="checkbox"
                    name="hobby"
                    id={h}
                    value={h}
                    checked={formData.hobby.includes(h)}
                    onChange={handleHobby}
                    className="h-4 w-4"
                  />
                  <span>{h}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.hobby && (
            <p className="text-red-400 text-sm">{errors.hobby}</p>
          )}

          {/* gender */}
          <div className="flex flex-wrap gap-6 mt-2">
            <label className="mb-1 font-medium">Gender</label>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                className="h-4 w-4"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                className="h-4 w-4"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {/* country */}
            <div className="flex flex-col">
              <select
                name="country"
                id="country"
                className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 w-full ${errors.country ? "border-red-400" : ""}`}
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {data.country?.map((data) => (
                  <option key={data.name}>{data.name}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-400 text-sm">{errors.country}</p>
              )}
            </div>

            {/* state  */}
            <div className="flex flex-col">
              <select
                name="state"
                id="state"
                className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 w-full ${errors.state ? "border-red-400" : ""}`}
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-400 text-sm">{errors.state}</p>
              )}
            </div>

            {/* city  */}
            <div className="flex flex-col">
              <select
                name="city"
                id="city"
                className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 w-full ${errors.city ? "border-red-400" : ""}`}
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-400 text-sm">{errors.city}</p>
              )}
            </div>
          </div>

          {/* address */}
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="address" className="mb-1 font-medium">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              className={`border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 ${errors.address ? "border-red-400" : ""}`}
            ></textarea>
            {errors.address && (
              <p className="text-red-400 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-row w-full gap-4 mt-2">
            {/* reset button */}
            <button
              type="reset"
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-all"
            >
              Reset
            </button>

            {/* submit button  */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all"
            >
              {editId ? "Update" : "Submit"}
            </button>

            {/* delete checked button  */}
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={deleteSelected}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-all"
              >
                {selectedIds.length === users.length
                  ? "Delete All"
                  : "Delete Selected"}
              </button>
            )}
          </div>
        </form>
      </div>

      <table className="min-w-full text-center border border-gray-200 rounded-lg overflow-hidden shadow-md mt-6">
        <thead className="bg-blue-500 text-white">
          <tr>
            {users?.length > 0 && (
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={isSelectedAll}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(users?.map((u) => u._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </th>
            )}

            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Hobby</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b border-b-gray-400">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={selectedIds.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds((prev) => [...prev, user._id]);
                      } else {
                        setSelectedIds((prev) =>
                          prev.filter((id) => id !== user._id),
                        );
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2 font-medium">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-4 py-2">{user.dateOfBirth}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.hobby?.join(", ")}</td>
                <td className="px-4 py-2">{user.country}</td>
                <td className="px-4 py-2">{user.state}</td>
                <td className="px-4 py-2">{user.city}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer rounded p-2"
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded p-2 ms-1"
                  >
                    <IoTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Form;
