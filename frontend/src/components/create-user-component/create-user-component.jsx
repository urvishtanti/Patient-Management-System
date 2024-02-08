import React from "react";
import { RequestState, UserRole, UserRoleToTitle } from "../../lib/types";
import { ErrorMessage } from "../elements/error-message";
import { SucessMessage } from "../elements/success-message";
import "./create-user-component.css";

export function CreateUserComponent({
  user,
  onFieldChange,
  onSubmit,
  userRole,
  requestState,
  errorMessage,
}) {
  return (
    <div className="add-counselor-card">
      <h2>Add {UserRoleToTitle[userRole]}</h2>
      <hr />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {(userRole === UserRole.COUNSELOR || userRole === UserRole.DOCTOR) && (
          <>
            <label>{UserRoleToTitle[userRole]} Registration Number</label>
            <input
              type="text"
              placeholder="Please Enter Your Registration Number"
              value={user.registrationNumber}
              required={true}
              autoComplete="true"
              onChange={(e) => {
                onFieldChange("registrationNumber", e.target.value);
              }}
            />
          </>
        )}
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
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email address"
          required={true}
          autoComplete="true"
          value={user.emailAddress}
          onChange={(e) => {
            onFieldChange("emailAddress", e.target.value);
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
          value={`Create ${UserRoleToTitle[userRole]}`}
        ></input>

        {requestState === RequestState.ERROR && (
          <div className="error-message">
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        )}
        {requestState === RequestState.COMPLETED && (
          <div className="success-message">
            <SucessMessage>User created successfully</SucessMessage>
          </div>
        )}
      </form>
    </div>
  );
}
