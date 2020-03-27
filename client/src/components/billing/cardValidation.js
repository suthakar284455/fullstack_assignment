import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Cleave from "cleave.js/react";
import Service from "../../services";
import * as endPoints from "../../services/endpoint";
import { connect } from "react-redux";

class CardValidation extends Component {
  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            payment: "",
            payment_mode:"",
            card_name:"",
            card_number:"",
            expiry:"",
            cvv:""


          }}
          onSubmit={(values, { setSubmitting }) => {
            let balance = this.props.balance_amount - Number(values.payment);

            if(balance<0){
              alert("The amount you have entered is higher than the balance amount.")
            }else{
                  let payment = Number(this.props.balance_amount);
                  let allowedAmount = (payment*20/100);
                  let user_amount = Number(values.payment);
                  
                  let config = {
                    headers: {
                      ContentType: "application/json"
                    }
                  };
                  const url = endPoints.BASE_URL + endPoints.UPDATE_PATIENT;
                  values.id=this.props._id;
                  if(this.props.transaction_count==2){
                    if(user_amount !== payment){
                      alert("Please settle the whole amount as you have already done 2 transations ");
                    }else{
                      setSubmitting(false);
                      this.props.callback(values, Number(values.payment));
                      setTimeout(() => {
                          Service.getInstance()
                          .updatePatientDetails(url, values, config)
                          .then(response => {
                              console.log(response)
                          });
                      });
                    }
                  }else{
                      if(user_amount>=allowedAmount){
                        setSubmitting(false);
                        this.props.callback(values, Number(values.payment));
                        setTimeout(() => {
                            Service.getInstance()
                            .updatePatientDetails(url, values, config)
                            .then(response => {
                                console.log(response)
                            });
                        });
                    }else{
                      alert("Please pay at least 20% of the balance amount");
                    }
                  }

                  
              }
          
          }}
          validationSchema={Yup.object().shape({
            payment: Yup.string().required("This field is required and must be a number"),
            payment_mode: Yup.string().required("This field is required"),
            card_name: Yup.string().required("This field is required"),
            card_number: Yup.string().required("This field is required"),
            expiry: Yup.string().required("This field is required"),
            cvv: Yup.string().required("This field is required and must be a number"),
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
              
            };

            return (
              <form onSubmit={handleSubmit}>
                <div className="card-details">
                  <span>Payable Amount:</span>
                  <div className="card-holder-name">
                    <Cleave
                        type="text"
                        options={{
                            blocks: [10],
                            numericOnly: true
                        }}
                        className={
                        props.errors.payment &&
                        props.touched.payment &&
                        "error"
                        }
                        name="payment"
                        value={props.values.payment}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    />
                        {props.errors.payment &&
                            props.touched.payment && (
                            <div className="input-feedback payment-error">
                                {props.errors.payment}
                            </div>
                        )}
                    </div>
                  <br />
                  <br />
                  <div className="payment-mode">
                    <span> Payment Mode:</span>
                    <select
                        className={
                            props.errors.payment_mode &&
                            props.touched.payment_mode &&
                            "error"
                        }
                        name="payment_mode"
                        value={props.values.payment_mode}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    >
                        <option></option>
                        <option>Card</option>
                        <option>Cash</option>
                    </select>
                        {props.errors.payment_mode &&
                            props.touched.payment_mode && (
                            <div className="input-feedback payment-error">
                                {props.errors.payment_mode}
                            </div>
                        )}
                    </div>
                 </div>
                 <div className="payment-mode">
                <div className="card-name">
                    <input 
                        placeholder="Cardholder's Name"
                        className={
                            `card-holder-name ${props.errors.card_name &&
                            props.touched.card_name &&
                            "error"}`
                        }
                        name="card_name"
                        value={props.values.card_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    
                    /> 
                    {props.errors.card_name &&
                            props.touched.card_name && (
                            <div className="input-feedback">
                                {props.errors.card_name}
                            </div>
                        )}
                  </div>
                  <div className="card-number">
                    <Cleave 
                            className={
                                `card-holder-name ${props.errors.card_number &&
                                props.touched.card_number &&
                                "error"}`
                            }
                            name="card_number"
                            value={props.values.card_number}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Card Number"
                            options={{
                                creditCard: true,
                                creditCardStrictMode: true
                            }}
                    />
                    {props.errors.card_number &&
                            props.touched.card_number && (
                            <div className="input-feedback">
                                {props.errors.card_number}
                            </div>
                        )}
                    </div>
                <div className="expiry-cvv">
                    <span>Expiry :</span><br />
                    <input 
                        type="date"
                        className={
                            `expiry ${props.errors.expiry &&
                            props.touched.expiry &&
                            "error"}`
                        }
                        name="expiry"
                        value={props.values.expiry}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    ></input>
                     {props.errors.expiry &&
                            props.touched.expiry && (
                            <div className="input-feedback expiry-error">
                                {props.errors.expiry}
                            </div>
                        )}
                    <Cleave 
                        options={{
                            blocks: [3],
                            numericOnly: true
                        }}
                        placeholder="CVV"
                        className={
                            `cvv ${props.errors.cvv &&
                            props.touched.cvv &&
                            "error"}`
                        }
                        name="cvv"
                        value={props.values.cvv}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                    />
                     {props.errors.cvv &&
                            props.touched.cvv && (
                            <div className="input-feedback cvv-error">
                                {props.errors.cvv}
                            </div>
                        )}
                </div>
                </div>

                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="save-button"
                  style={buttonStyle}
                  onClick = {() => {
                    setTimeout(() => {
                      if (dirty) {
                       handleReset();
                      }
                     }, 100);
                  }}
                 
                >
                  Save
                </Button>
              </form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    balance_amount: state.balance_amount,
    transaction_count: state.transaction_count

  };
};


export default connect(mapStateToProps)(CardValidation)