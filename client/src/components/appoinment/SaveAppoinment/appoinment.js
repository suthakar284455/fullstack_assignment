import React, { Component } from "react";
import "./save.css";
import Service from "../../../services";
import * as endPoints from "../../../services/endpoint";
import countryList from "react-select-country-list";
import PatientDetails from "./patientDetails";
import DataOfBirth from "./dateOfBirth";
import AppoinmentDetails from "./appoinmentDetails";
import AddressDetails from "./addressDetails";
import ScanDetails from "./scanDetails";
import RenderAmount from "./renderAmount";
import ScanReport from "./scanReport";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";

class SaveAppoinment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      options: countryList().getData(),
      value: null,
      scan_details: {},
      discount_amount: null,
      warning: false,
      scan_report: [],
      scan_name: "",
      scan_amount: null,
      patient_discount_amount: "",
      appoinment: null,
      scanReport: {}
    };
  }



  changeDisountHandler(event) {
    this.setState({
      patient_discount_amount: Number(event.target.value)
    });
    if (Number(event.target.value) > this.state.discount_amount) {
      this.setState({
        warning: true
      });
    } else {
      this.setState({
        warning: false
      });
    }
  }

  calculatePatientAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  changeAgeHandler(event) {
    const dob = event.target.value.split("-");
    this.state.dob = event.target.value;
    this.setState({
      age: this.calculatePatientAge(new Date(...dob))
    });
  }

  changeAppoinmentHandler(event) {
    this.state.appoinment = event.target.value;

    console.log(event.target.value);
  }

  addPatientDetails() {
    var report = {
      scan_name: this.state.scan_name,
      scan_amount: this.state.scan_amount,
      discount_amount: this.state.patient_discount_amount
    };

    this.props.updateScanDetails(report);
    this.showAmoundHandler(this.state.scan_amount, this.state.patient_discount_amount, this.state.scan_name)
  }

  showAmoundHandler(scan_amount, discount_amount, scan_name) {
    this.setState({
      scan_amount,
      discount_amount,
      scan_name
    });

    this.state.scan_amount = scan_amount;
    this.state.discount_amount = discount_amount;
    this.state.scan_name = scan_name;

    if (!discount_amount) {
     
      this.setState({
        patient_discount_amount: "",
        warning: false
        
      });
    }
  }

  componentDidMount() {
    this.props.updateAppoinment(false);
    this.props.updateStatus(false);
    Service.getInstance()
      .fetchScanDetails(endPoints.BASE_URL + endPoints.SCAN_DETAILS)
      .then(response => {
        this.setState({
          scan_details: response
        });
      });
  }

  salutionHandler(event, index) {
    this.props.updateGender(event.target.selectedIndex);
  }

  render() {
    const {
      options,
      scan_details,
      scan_amount,
      warning,
      patient_discount_amount
    } = this.state;

    return (
      <div className="container">
        {this.props.isAppoinmentDone && (
          <Alert
            severity="success"
            style={{
              backgroundColor: "#D7F4FF",
              position: "absolute",
              top: 0,
              width: "90%"
            }}
          >
            Appoinment created successfully!
          </Alert>
        )}
        <h3>Patient Details</h3>
        <hr />

        <div className="patient-details">
          <PatientDetails
            onSautionChange={this.salutionHandler.bind(this)}
            state={this.state}
            formikProps={this.props.formikProps}
          />

          <DataOfBirth
            changeHandler={this.changeAgeHandler.bind(this)}
            age={this.state.age}
            formikProps={this.props.formikProps}
          />

          <AppoinmentDetails
            changeAppoinmentHandler={this.changeAppoinmentHandler.bind(this)}
            phoneNumber={this.state.phoneNumber}
            formikProps={this.props.formikProps}
          />

          <AddressDetails
            options={options}
            address={this.state.address}
            formikProps={this.props.formikProps}
          />
        </div>

        <h3>Medical Scan Details</h3>
        <hr className="line" />

        <div className="scan-details">
          <ScanDetails
            scan_details={scan_details}
            clickHandler={this.showAmoundHandler.bind(this)}
          />

          <RenderAmount
            scan_amount={scan_amount}
            patient_discount_amount={patient_discount_amount}
            warning={warning}
            discountHandler={this.changeDisountHandler.bind(this)}
          />

          <button
            onClick={() => {
              this.props.formikProps.setFieldValue("action", "add");
              setTimeout(() => {
                if (
                  this.state.patient_discount_amount > 0 &&
                  !this.state.warning
                ) {
                  this.props.formikProps.isValid && this.addPatientDetails();
                }

                this.props.formikProps.isValid
                  ? this.props.updateStatus(true)
                  : "";
              }, 100);
            }}
          >
            Add
          </button>

          {warning && this.props.formikProps.dirty && this.props.formikProps.isValid && (
            <span className="Warning-message">Discount amount is exceeded</span>
          )}
        </div>
        <br />
        <br />
        {this.props.scan_record.length >= 1 && this.props.status && (
          <ScanReport scan_record={this.props.scan_record}/>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateScanDetails: data =>
      dispatch({ type: "UDATE_SCAN_REPORT", payload: data }),
    updateAppoinment: data =>
      dispatch({ type: "UPDATE_APPOINMENT", payload: data }),
    updateGender: data => dispatch({ type: "UPDATE_GENDER", payload: data }),
    updateStatus: data => dispatch({ type: "UPDATE_STATUS", payload: data })
  };
};

const mapStateToProps = state => {
  return {
    patient: state.patientName,
    scan_record: state.scan_record,
    isAppoinmentDone: state.isAppoinmentDone,
    gender: state.gender,
    status: state.status
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveAppoinment);
