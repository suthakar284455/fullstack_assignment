import React, { Component } from 'react'
import { connect } from "react-redux";
 class PatientReport extends Component {

  clickPayHandler(id, event){
    event.preventDefault();
    this.props.updatePatientId(id);
    this.props.enableBilling(true);
  }

  render() {
    return (
      <div className="patient-report">
        <table border="1">
          <tbody>
          <tr>
            <th>S.No</th>
            <th>Patient Name</th>
            <th>Age Gender</th>
            <th>Appoinment Date</th>
            <th>Balance Amount</th>
            <th>Ation</th>
          </tr>

          {this.props.patientdata.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.patientname}</td>
                <td>{item.age} - {item.gender}</td>
                <td>{item.appoimentdate}</td>
                { item.scan[0] ? <td>{item.total_amount}</td> : <td>{0}</td>}
                <td><a href="#" onClick={this.clickPayHandler.bind(this, item._id)}>{item.scan[0] && "Click to Pay"}</a></td>
              </tr>
            );
          })}
          </tbody>
        </table>
    </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updatePatientId: data => dispatch({ type: "UPDATE_PATIENT_ID", payload: data }),
    enableBilling: data => dispatch({ type: "ENABLE_BILLING", payload: data })
  };
};

const mapStateToProps = state => {
  return {
    id: state.id,
    isBillEnable: state.isBillEnable

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientReport);
