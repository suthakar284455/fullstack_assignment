import React, { Component } from "react";
import "./index.css";
import { SaveAppoinment } from "../components";
import { ViewAppoinment } from "../components";
import { Billing } from "../components";
import { connect } from "react-redux";


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
    };
  }

  componentDidMount() {
    this.setState({
      show: true
    });
  }

  clickHandler(id, event) {
    this.props.enableBilling(false);
    this.setState({
      id
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="page-container">
        <div className="left-panel">
          <ul>
            <li>
              <a href="#" onClick={this.clickHandler.bind(this, 1)}>
                Save Appoinment
              </a>
            </li>
            <li>
              <a href="#" onClick={this.clickHandler.bind(this, 2)}>
                View Appoinment
              </a>
            </li>
          </ul>
        </div>
        <div className="right-panel">
          {
            this.props.isBillEnable ? <Billing/> : this.state.id === 1 ? <SaveAppoinment /> : <ViewAppoinment />
          }
          
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    enableBilling: data => dispatch({ type: "ENABLE_BILLING", payload: data })
  };
};

const mapStateToProps = state => {
  return {
    isBillEnable: state.isBillEnable

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);