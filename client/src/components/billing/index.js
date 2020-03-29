import React, { Component } from 'react'
import "./index.css"
import { connect } from "react-redux";
import Service from "../../services";
import * as endPoints from "../../services/endpoint"
import CardValidation from './cardValidation'


 class Billing extends Component {
    constructor(props){
        super(props);
        var _this=this;
        this.state = {
            patient : {},
            scan: {},
            paid_amount:0,
            balance_amount:0,
            previous_transation:[]
        }
    }

    calculatePaidAmount(){
        let paid_amount = 0;
        let obj;
        let transaction = []
        for(var i=1; i<this.state.patient.transaction.length;i++){
            paid_amount+=Number(this.state.patient.transaction[i][0].payment);
            obj = {
                s_no : i,
                Date : new Date().toLocaleDateString(),
                paid_amount: Number(this.state.patient.transaction[i][0].payment),
                payment_mode: this.state.patient.transaction[i][0].payment_mode

            }
            transaction.push(obj)
        }

        this.props.updateTransaction(transaction.length)
        this.setState({
            previous_transation : transaction
        })

        this.setState({
            paid_amount
        }, () =>{
            this.calulateBalanceAmount();
        })

    }

    calulateBalanceAmount(){
        var balance = (this.state.patient.total_amount - this.state.patient.discount_amount)
        this.setState({
            balance_amount: balance - Number(this.state.paid_amount)
        }, () =>{
            this.props.updateBalanceAmount(this.state.balance_amount);
        })
     
    }

    updatePreviousTransaction(values){
        let obj = {
            s_no: this.state.previous_transation.length,
            Date : new Date().toLocaleDateString(),
            paid_amount: values.payment,
            payment_mode: values.payment_mode

        }
       
        var temp = [...this.state.previous_transation]
        temp.push(obj)
        this.props.updateTransaction(temp.length);
        this.setState({
            previous_transation: temp
        })
    }

    setBalanceAmount(values, amount){
        let paid = Number(this.state.paid_amount);
        let current_amount = paid + amount;
        if(current_amount>=0){
            this.setState({
                paid_amount: current_amount
            }, () =>{
                this.calulateBalanceAmount();
                this.updatePreviousTransaction(values)
            })
        }
    }

    componentDidMount(){
        var queryParams= {
            params : {
              id : this.props.id,
            }
          }
        Service.getInstance()
        .fetchPatient(endPoints.BASE_URL + endPoints.GET_PATIENT, queryParams)
        .then(response => {
            this.setState({
                patient : response.data[0],
                scan : response.data[0].scan[0]
            }, () =>{
                this.calculatePaidAmount();
            })

        });
    }


    render() {
    return (
        <div className="billing-container">
            <h3>Billing</h3>
                <hr />
            <div className="payment-part">
                
                <div className="billing-status">
                    <label htmlFor="Current billing Status:">Current billing Status:</label>
                    <table border="1" className="patient-payment-details">
                        <tbody>
                            <tr>
                                <td>Patient Name</td>
                                <td>{this.state.patient.patientname}</td>
                            </tr>
                            <tr>
                                <td>PatientID</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Age/Gender</td>
                                <td>{this.state.patient.age+"/"+this.state.patient.gender}</td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td>{this.state.patient.total_amount}</td>
                            </tr>
                            <tr>
                                <td>Disount Amount</td>
                                <td>{this.state.patient.discount_amount}</td>
                            </tr>
                            <tr>
                                <td>Paid Amount</td>
                                <td>
                                {this.state.paid_amount}
                                </td>
                            </tr>
                            <tr>
                                <td>Balance</td>
                                <td>
                                {
                                    this.state.balance_amount
                                }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CardValidation _id={this.state.patient._id} balance_amount={ this.state.balance_amount}  callback={this.setBalanceAmount.bind(this)}/>
            </div>

            {
                this.state.previous_transation.length>0 &&
            <div className="previous-transaction">
                <label htmlFor="Previous Transation:">Previous Transation:</label>
                <table border="1">
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Paid Amount</th>
                        <th>Payment Mode</th>
                    </tr>

                    {this.state.previous_transation.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Date}</td>
                            <td>{item.paid_amount}</td>
                            <td>{item.payment_mode}</td>
                        </tr>
                    );
                    })}
                    </tbody>
                </table>
            </div>
            }
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateBalanceAmount: data => dispatch({ type: "UPDATE_BALANCE", payload: data }),
      updateTransaction: data => dispatch({ type: "UPDATE_TRANSACTION", payload: data }),
    };
  };
  
  const mapStateToProps = state => {
    return {
      id: state.id,
      balance_amount: state.balance_amount,
      transaction_count: state.transaction_count
  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Billing)