import React from "react";
import { connect } from "react-redux";

const PatientDetails = props => {

  const handleChange = () =>{  }
  return (
    <div className="patient-name col-xs-4">
      <span className="content">Patient Name</span>
      <select className="salution" onChange={props.onSautionChange}>
        <option>Mr.</option>
        <option>Mrs.</option>
      </select>
      <div className="name-patient">
          <input
            type="text"
            className={`name ${props.formikProps.errors.patientname &&
              props.formikProps.touched.patientname &&
              "error"}`}
            name="patientname"
            value={props.formikProps.values.patientname}
            onChange={props.formikProps.handleChange}
            onBlur={props.formikProps.handleBlur}
            placeholder="Enter name"
          ></input>

          {props.formikProps.errors.patientname &&
            props.formikProps.touched.patientname && (
              <div className="input-feedback patientname-error">
                {props.formikProps.errors.patientname}
              </div>
            )}
        </div>

        <div className="gender">
          <span>Gender</span>
          <div className="check-box">
            <input type="radio" name="gender" onChange={handleChange} checked={props.gender === 0} />
            <label htmlFor="age1">Male</label>
            <input type="radio" checked={props.gender === 1} onChange={handleChange} name="gender" />
            <label htmlFor="age2">Female</label>
          </div>
        </div>


      <br />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    scan_name: state.scan_name,
    gender: state.gender,
  };
};

export default  connect(mapStateToProps)(PatientDetails);
