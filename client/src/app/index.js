import React, { Component, Fragment } from 'react'
import Menu from "../page"
// import Billing from '../components/billing'
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Billing/> */}
        <Menu></Menu>
       </React.Fragment>
    )
  }
}
