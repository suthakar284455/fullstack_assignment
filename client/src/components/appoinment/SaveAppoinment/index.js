import React from "react";
import SaveAppoinment from "./appoinment";
import { Formik } from "formik";
import * as Yup from "yup";
import Service from "../../../services";
import * as endPoints from "../../../services/endpoint";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

const Application = (props, dispatch) => {
  return (
    <div>
      <Formik
        initialValues={{
          action: "",
          patientname: "",
          phonenumber: "",
          street: "",
          town: "",
          city: "",
          state: "",
          postal: "",
          country: "",
          dob: "",
          appoimentdate: "",
        }}
        onChange={() => {
          console.log("CHANGED");
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          if (values.action === "save") {
            window.scrollTo(0, 0);
            props.updateAppoinment(true);
          }

          setTimeout(() => {
            if (values.action !== "add") {
              var __dob = values.dob.split("-");
              var diff_ms = Date.now() - new Date(__dob).getTime();
              var age_dt = new Date(diff_ms);
              var age = Math.abs(age_dt.getUTCFullYear() - 1970);
              if (age > -1) {
                values.age = age;
              }
              window.props = props;
              values.gender = props.gender === 1 ? "Female" : "Male";
              values.scan = props.scan_record;
              var total_amount = 0;
              var discount_amount = 0;
              var balance_amount = 0;
              var paid_amount = 0;
              for(var i=0;i<props.scan_record.length;i++){
                total_amount+=Number(props.scan_record[i].scan_amount);
                discount_amount+=Number(props.scan_record[i].discount_amount);

              }

              values.total_amount = total_amount;
              values.discount_amount = discount_amount;
              values.balance_amount = balance_amount;
              values.paid_amount = paid_amount;
              values.transaction = [{}];
 
              let config = {
                headers: {
                  ContentType: "application/json"
                }
              };
              let url = endPoints.BASE_URL + endPoints.PATIENT_DETAILS;
              Service.getInstance()
                .SaveScanDetails(url, values, config)
                .then(response => {

                });
            }
          });
        }}
        validationSchema={Yup.object().shape({
          patientname: Yup.string()
            .required("This field is required")
            .matches(/(?=.*[a-z])/, "Name should contain only character"),

          phonenumber: Yup.string().required("This field is required"),
          street: Yup.string().required("This field is required"),
          town: Yup.string().required("This field is required"),
          city: Yup.string().required("This field is required"),
          state: Yup.string().required("This field is required"),
          postal: Yup.string()
            .required("This field is required")
            .matches(/(?=.*[0-9])/, "Postal code must be a Number"),
          country: Yup.string().required("This field is required"),
          dob: Yup.string().required("This field is required"),
          appoimentdate: Yup.string().required("This field is required")
        })}
      >
        {props => {
          const {
            isSubmitting,
            handleSubmit,
            setFieldValue,
            handleReset,
            dirty
          } = props;

          const buttonStyle = {
            backgroundColor: "#008CFF",
            top: 20,
            left: 300
          };

          return (
            <form onSubmit={handleSubmit}>
              <SaveAppoinment formikProps={props} />
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                className="save-button"
                disabled={isSubmitting}
                style={buttonStyle}
                onClick={() => {
                  setFieldValue("action", "save");
                  setTimeout(() => {
                    if (dirty) {
                      handleReset();
                      window.props.updateStatus(false);
                      window.props.updateScanDetails(null);
                      window.props.updateAppoinment(false);
                      window.props.updateScanDetails(null);
                    }
                  }, 1500);
                }}
              >
                Save
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateAppoinment: data =>
      dispatch({ type: "UPDATE_APPOINMENT", payload: data }),
    updateStatus: data => dispatch({ type: "UPDATE_STATUS", payload: data }),
    updateScanDetails: data =>
      dispatch({ type: "UDATE_SCAN_REPORT", payload: data })
  };
};

const mapStateToProps = state => {
  return {
    patient: state.patientName,
    age: state.age,
    gender: state.gender,
    status: state.status,
    scan_record: state.scan_record
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
