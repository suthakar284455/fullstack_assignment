import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  label: {
    display: "block"
  },
  input: {
    width: 150
  },
  listbox: {
    width: 150,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    overflow: "auto",
    maxHeight: 200,
    background: "white",
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer"
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white"
    }
  }
}));

export default function UseAutocomplete(props) {
  const classes = useStyles();
  let countriesList =
    props.scan_details &&
    props.scan_details.map((item, i) => {
      return {
        id: item._id,
        title: item.name,
        scan_amount: item.amount,
        discount_amount: item.discount
      };
    });

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: "autocomplete",
    options: countriesList,
    getOptionLabel: option => option.title,
    onChange: (event, value, reason) => {
 
      value
        ? props.clickHandler(
            value.scan_amount,
            value.discount_amount,
            value.title
          )
        : props.clickHandler("");
    }
  });

  
  return (
    <div>
      <div {...getRootProps()}>
        <input className={classes.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
