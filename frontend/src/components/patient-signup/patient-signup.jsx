import React from "react";
import "./patient-signup.css";

function showPassword() {
  var x = document.getElementById("myPasswordInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showRetypePassword() {
  var y = document.getElementById("myReTypeInput");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
}

// When the user clicks on the password field, show the message box
function passwordFocus() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
function passwordBlur() {
  document.getElementById("message").style.display = "none";
}

function passwordKeyUp() {
  var myPasswordInput = document.getElementById("myPasswordInput");
  var passwordLetter = document.getElementById("passwordLetter");
  var passwordCapital = document.getElementById("passwordCapital");
  var passwordNumber = document.getElementById("passwordNumber");
  var passwordLength = document.getElementById("passwordLength");

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myPasswordInput.value.match(lowerCaseLetters)) {
    passwordLetter.classList.remove("invalid");
    passwordLetter.classList.add("valid");
  } else {
    passwordLetter.classList.remove("valid");
    passwordLetter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myPasswordInput.value.match(upperCaseLetters)) {
    passwordCapital.classList.remove("invalid");
    passwordCapital.classList.add("valid");
  } else {
    passwordCapital.classList.remove("valid");
    passwordCapital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myPasswordInput.value.match(numbers)) {
    passwordNumber.classList.remove("invalid");
    passwordNumber.classList.add("valid");
  } else {
    passwordNumber.classList.remove("valid");
    passwordNumber.classList.add("invalid");
  }

  // Validate length
  if (myPasswordInput.value.length >= 8) {
    passwordLength.classList.remove("invalid");
    passwordLength.classList.add("valid");
  } else {
    passwordLength.classList.remove("valid");
    passwordLength.classList.add("invalid");
  }
}

export function PatientSignupComponent({ user, onFieldChange, onSubmit }) {
  return (
    <>
      <div className="signup-form">
        <h2 className="h2">LIFELINE</h2>
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

          <label>Password</label>
          <input
            type="password"
            id="myPasswordInput"
            placeholder="Enter your password"
            onFocus={passwordFocus}
            onBlur={passwordBlur}
            onKeyUp={passwordKeyUp}
            value={user.password}
            required={true}
            autoComplete="true"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => {
              onFieldChange("password", e.target.value);
            }}
          />
          <input type="checkbox" onClick={() => showPassword()} />
          <label className="show-passowrd-text">Show Password</label>
          <br />
          <br />
          <div id="message">
            <h3 id="passwordValidationPopup">
              Password must contain the following:
            </h3>
            <p id="passwordLetter" className="invalid">
              A <b>lowercase</b> letter
            </p>
            <p id="passwordCapital" className="invalid">
              A <b>capital (uppercase)</b> letter
            </p>
            <p id="passwordNumber" className="invalid">
              A <b>number</b>
            </p>
            <p id="passwordLength" className="invalid">
              Minimum <b>8 characters</b>
            </p>
          </div>

          <label>Re-type Password</label>
          <input
            type="password"
            id="myReTypeInput"
            placeholder="Re-type your password"
            value={user.rePassword}
            required={true}
            autoComplete="true"
            onChange={(e) => {
              onFieldChange("rePassword", e.target.value);
            }}
          />
          <input type="checkbox" onClick={() => showRetypePassword()} />
          <label className="show-passowrd-text">Show Password</label>
          <br />
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

          <br></br>
          <br></br>
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

          <span>
            By creating an account, you agree to our{" "}
            <a href="#/" rel="noopener">
              Terms & Privacy
            </a>{" "}
          </span>

          <br />
          <br />
          <input
            type="submit"
            className="user-signup-button"
            value="Signup"
          ></input>
        </form>
      </div>
      <div className="extra"></div>
    </>
  );
}
