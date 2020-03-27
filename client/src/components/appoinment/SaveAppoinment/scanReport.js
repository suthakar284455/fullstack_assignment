import React, { Component } from 'react'
import { connect } from "react-redux";

class ScanReport extends Component {
  render() {
    console.log(this.props.scan_record)
    return (
      <div className="scan-report">
        <table border="1">
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Scan Name</th>
              <th>Scan Amount</th>
              <th>Discount</th>
              <th>Total Amount</th>
            </tr>
    
            {this.props.scan_record.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.scan_name}</td>
                  <td>{item.scan_amount}</td>
                  <td>{item.discount_amount}</td>
                  <td>{item.scan_amount - item.discount_amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}

export default ScanReport;

// const mapDispatchToProps = dispatch => {
//   return {
//     updateScanDetails: data =>
//       dispatch({ type: "UDATE_SCAN_REPORT", payload: data }),

//   };
// };
// const mapStateToProps = state => {
//   return {
//     scan_record: state.scan_record,
//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(ScanReport);


