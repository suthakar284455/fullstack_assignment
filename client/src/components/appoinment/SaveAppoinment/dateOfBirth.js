import React, { Component } from "react";
import { connect } from "react-redux";
class DataOfBirth extends Component {

  calculate() {
    var __dob = this.props.formikProps.values.dob.split("-");
    var diff_ms = Date.now() - new Date(__dob).getTime();
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (age > -1) {
      return age;
    }
  }
  render() {
    return (
      <div className="date-of-birth">
        <div className="content">DOB</div>
        <div className="dob">
          <input
            type="date"
            className={
              this.props.formikProps.errors.dob &&
              this.props.formikProps.touched.dob &&
              "error"
            }
            name="dob"
            value={this.props.formikProps.values.dob}
            onChange={this.props.formikProps.handleChange}
            onBlur={this.props.formikProps.handleBlur}
          />
          {this.props.formikProps.errors.dob &&
            this.props.formikProps.touched.dob && (
              <div className="input-feedback dob-error">
                {this.props.formikProps.errors.dob}
              </div>
            )}
        </div>

        <div className="age">
          <span>Age</span>
          <div className="patient-age">{this.calculate()}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAge: data => dispatch({ type: "UPDATE_AGE", payload: data })
  };
};

const mapStateToProps = state => {
  return {
    age: state.age
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataOfBirth);
