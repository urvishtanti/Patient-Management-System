import React from "react";
import "./edit-styles.css";

const EditInfoComponent = ({ user, onFieldChange, onSubmit, onPressBack }) => {
  return (
    <div className="card">
      <h2>Edit Profile</h2>
      <hr />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          required={true}
          autoComplete="true"
          value={user.fullName}
          onChange={(e) => {
            onFieldChange("fullName", e.target.value);
          }}
        />

        <br />

        <label>Date of Birth</label>
        <input
          type="date"
          placeholder="Date Of Birth"
          className="date-of-birth"
          required={true}
          autoComplete="true"
          max={"2004-11-01"}
          value={user.dateOfBirth}
          onChange={(e) => {
            onFieldChange("dateOfBirth", e.target.value);
          }}
        />

        <br></br>
        <br></br>
        <label>Address</label>
        <input
          type="text"
          placeholder="House Number, Street Name"
          required={true}
          autoComplete="true"
          value={user.addressLine}
          onChange={(e) => {
            onFieldChange("addressLine", e.target.value);
          }}
        />
        <label>City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={user.city}
          required={true}
          autoComplete="true"
          onChange={(e) => {
            onFieldChange("city", e.target.value);
          }}
        />
        <label>Province</label>
        <select
          id="province"
          name="province"
          required={true}
          value={user.province}
          onChange={(e) => {
            onFieldChange("province", e.target.value);
          }}
        >
          <option value="Quebec">Quebec</option>
          <option value="British Columbia">British Columbia</option>
          <option value="Ontario">Ontario</option>
          <option value="Sasketchwen">Sasketchwen</option>
          <option value="Manitoba">Manitoba</option>
          <option value="Alberta">Alberta</option>
          <option value="Nova Scotia">Nova Scotia</option>
          <option value="New Brunswik">New Brunswik</option>
        </select>
        <br />
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="1234567890"
          required={true}
          autoComplete="true"
          pattern="[0-9]{10}"
          value={user.phoneNumber}
          onChange={(e) => {
            onFieldChange("phoneNumber", e.target.value);
          }}
        />
        <input
          type="submit"
          className="user-signup-button"
          value="Update"
        ></input>

        <div className="go-back">
          <button onClick={onPressBack}>Go back</button>
        </div>
      </form>
    </div>
  );
};

export default EditInfoComponent;
