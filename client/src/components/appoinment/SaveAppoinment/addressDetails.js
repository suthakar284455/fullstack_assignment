import React from "react";

const AddressDetails = props => {
  return (
    <div className="address">
      <div className="content">Address</div>
      <div className="patient-address">
        <div className="address-part-1">
          <input
            type="text"
            placeholder="Street address"
            className={
              props.formikProps.errors.street &&
              props.formikProps.touched.street &&
              "error"
            }
            name="street"
            value={props.formikProps.values.street}
            onChange={props.formikProps.handleChange}
            onBlur={props.formikProps.handleBlur}
          />
          {props.formikProps.errors.street &&
            props.formikProps.touched.street && (
              <div className="input-feedback">
                {props.formikProps.errors.street}
              </div>
            )}

          <input
            type="text"
            placeholder="Street address2"
            className={
              props.formikProps.errors.town &&
              props.formikProps.touched.town &&
              "error"
            }
            name="town"
            value={props.formikProps.values.town}
            onChange={props.formikProps.handleChange}
            onBlur={props.formikProps.handleBlur}
          />
          {props.formikProps.errors.town && props.formikProps.touched.town && (
            <div className="input-feedback">
              {props.formikProps.errors.town}
            </div>
          )}
        </div>

        <div className="address-part-2">
          <div className="city-state-container">
            <input
              type="text"
              placeholder="City"
              className={`city ${props.formikProps.errors.city &&
                props.formikProps.touched.city &&
                "error"}`}
              name="city"
              value={props.formikProps.values.city}
              onChange={props.formikProps.handleChange}
              onBlur={props.formikProps.handleBlur}
            />
            {props.formikProps.errors.city &&
              props.formikProps.touched.city && (
                <div className="input-feedback">
                  {props.formikProps.errors.city}
                </div>
              )}
            <input
              type="text"
              placeholder="State"
              className={
                props.formikProps.errors.state &&
                props.formikProps.touched.state &&
                "error"
              }
              name="state"
              value={props.formikProps.values.state}
              onChange={props.formikProps.handleChange}
              onBlur={props.formikProps.handleBlur}
            />
            {props.formikProps.errors.state &&
              props.formikProps.touched.state && (
                <div className="input-feedback state">
                  {props.formikProps.errors.state}
                </div>
              )}
          </div>
          <div className="postal-country-container">
            <input
              type="text"
              placeholder="Postal / Zip Code"
              className={`postal-code ${props.formikProps.errors.postal &&
                props.formikProps.touched.postal &&
                "error"}`}
              name="postal"
              value={props.formikProps.values.postal}
              onChange={props.formikProps.handleChange}
              onBlur={props.formikProps.handleBlur}
            />
            {props.formikProps.errors.postal &&
              props.formikProps.touched.postal && (
                <div className="input-feedback">
                  {props.formikProps.errors.postal}
                </div>
              )}

            <select
              className={
                props.formikProps.errors.country &&
                props.formikProps.touched.country &&
                "error"
              }
              name="country"
              value={props.formikProps.values.country}
              onChange={props.formikProps.handleChange}
              onBlur={props.formikProps.handleBlur}
            >
              country
              <option value="" disabled>
                Select Country
              </option>
              {props.options.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            {props.formikProps.errors.country &&
              props.formikProps.touched.country && (
                <div className="input-feedback country-error">
                  {props.formikProps.errors.country}
                </div>
              )}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
