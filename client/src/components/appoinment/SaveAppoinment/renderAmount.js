import React from "react";
import Cleave from "cleave.js/react";

const RenderAmount = props => {
  return (
    <div>
      <div className="scan-amount">
        <div>Scan amount</div>
        <div className="amount">{props.scan_amount}</div>
      </div>

      <div className="discount-amount">
        <div>Discount</div>
        <Cleave
          placeholder="Discount"
          className="scan-items"
          disabled={props.scan_amount > 0 ? false : true}
          onChange={props.discountHandler}
          value={props.patient_discount_amount}
          type="tel"
          options={{
            blocks: [3],
            numericOnly: true
          }}
        />
      </div>
    </div>
  );
};

export default RenderAmount;
