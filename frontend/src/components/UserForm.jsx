import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserForm({
  formData,
  setFormData,
  errors,
  data,
  editId,
  selectedIds,
  handleChange,
  handleHobby,
  handleSubmit,
  states,
  cities,
  resetForm,
  users,
  deleteSelected,
}) {
  return (
    <>
      <div className="container mx-auto p-6 max-w-200 border border-gray-200 shadow-xl rounded-2xl mt-5">
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
            <DatePicker
              id="dateOfBirth"
              selected={
                formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
              }
              onChange={(date) => {
                if (!date) return;

                const yyyy = date.getFullYear();
                const mm = ("0" + (date.getMonth() + 1)).slice(-2);
                const dd = ("0" + date.getDate()).slice(-2);

                setFormData({
                  ...formData,
                  dateOfBirth: `${yyyy}-${mm}-${dd}`,
                });
              }}
              dateFormat="dd-MM-yyyy"
              placeholderText="dd/mm/yyyy"
              onKeyDown={(e) => e.preventDefault()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              className={`w-92 border border-gray-300 focus:border-blue-400 outline-none rounded px-3 py-1.5 ${errors.dateOfBirth ? "border-red-400" : ""}`}
              popperClassName="z-50"
              calendarClassName="rounded-lg shadow-lg border border-gray-200"
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

          {/* avatar image  */}
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="avatar" className="mb-1 font-medium">
              Profile Image
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleChange}
              className="border border-gray-300 focus:border-blue-400 rounded px-3 py-1.5"
            />
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
    </>
  );
}

export default UserForm;
