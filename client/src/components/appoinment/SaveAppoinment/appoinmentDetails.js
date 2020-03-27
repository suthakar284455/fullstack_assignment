import React from "react";
import Cleave from "cleave.js/react";
import CleavePhone from "cleave.js/dist/addons/cleave-phone.us";

const AppoinmentDetails = props => {
  return (
    <div className="appoinment-date">
      <div className="content">Appoinment Date</div>
      <div className="app-date">
        <input
          type="date"
          className={
            props.formikProps.errors.appoimentdate &&
            props.formikProps.touched.appoimentdate &&
            "error"
          }
          name="appoimentdate"
          value={props.formikProps.values.appoimentdate}
          onChange={props.formikProps.handleChange}
          onBlur={props.formikProps.handleBlur}
        />
      </div>
      {props.formikProps.errors.appoimentdate &&
        props.formikProps.touched.appoimentdate && (
          <div className="input-feedback appointmentdate-error">
            {props.formikProps.errors.appoimentdate}
          </div>
        )}

      <div className="phone-number">
        <span className="content">Phone Number</span>
        <Cleave
          placeholder="Phone number"
          options={{
            phone: true,
            phoneRegionCode: "US"
          }}
          className={
            props.formikProps.errors.phonenumber &&
            props.formikProps.touched.phonenumber &&
            "error"
          }
          name="phonenumber"
          value={props.formikProps.values.phonenumber}
          onChange={props.formikProps.handleChange}
          onBlur={props.formikProps.handleBlur}
        />
        {props.formikProps.errors.phonenumber &&
          props.formikProps.touched.phonenumber && (
            <div className="input-feedback phone-error">
              {props.formikProps.errors.phonenumber}
            </div>
          )}
      </div>
    </div>
  );
};

export default AppoinmentDetails;
