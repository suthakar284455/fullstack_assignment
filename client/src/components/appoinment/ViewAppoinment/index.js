import React, { Component } from "react";
import "./view.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientReport from './patientReport'
import Service from "../../../services";
import * as endPoints from "../../../services/endpoint";
import Button from "@material-ui/core/Button";


export default class ViewAppoinment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date(),
      patientdata : null,
      error:false,

    };
  }

  parse(date){
      var temp = date.split("/");

      var str = temp.map((item) =>{
        if(item.length === 1){
          return "0"+item;
        }

        return item;
      })
      str.unshift(str.pop());
      return str.join("-");
  }

  makeQueyParams(){
    var queryParams= {
      params : {
        from : this.parse(this.state.fromDate.toLocaleDateString()),
        to : this.parse(this.state.toDate.toLocaleDateString())
      }
    }

   
    this.getPatientDetails(queryParams)
  }
 
  handleFromDateChange = date => {
    this.setState({
      fromDate: date
    });
  };

  handleToDateChange = date => {
    this.setState({
      toDate: date
    });
  };

  getPatientDetails(param){
    this.setState({
      error:false
    })
      const url = endPoints.BASE_URL + endPoints.FECTCH_PATIENT_DETAILS
      Service.getInstance()
      .fetchPatientDetails(url, param)
      .then(patientdata   => {
          if(patientdata.data.length==0){
              this.setState({
                error:true
              })
          }
          this.setState({
            patientdata
          })
  
      });
  }
  render() {

    const buttonStyle = {
      backgroundColor: "#008CFF",
      left: 52
    };
    
    return (
      <div className="view-container">
        <h2>View Appoinment</h2>
          <hr/>
          <br/>
          <div className="date-container">
          
                <div className="from-date">
                <label>From Date  </label>
                <DatePicker
                    selected={this.state.fromDate}
                    onChange={this.handleFromDateChange}
                />
                </div>
                <div className="to-date">
                <label>To Date  </label>
                <DatePicker
                    selected={this.state.toDate}
                    onChange={this.handleToDateChange}
                />

              
              <br/><br/>
              {this.state.error && <div className="error">No Recourds found!</div>}
                </div>
            </div>

            < Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="button"
                  className="save-button"
                  style={buttonStyle}
                  onClick={() => {
                    this.makeQueyParams();
                  }}
                >
                  Search
              </Button>
        
       
            {this.state.patientdata!=null && this.state.patientdata.data.length>0 && <PatientReport patientdata={this.state.patientdata} />}

      </div>
    );
  }
}
