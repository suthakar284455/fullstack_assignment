const initialState = {
  patientName: "Suthakar",
  patientObject: {},
  scan_record: [],
  isAppoinmentDone: false,
  gender: 0,
  status: false,
  searchData: "",
  id:null,
  isBillEnable:false,
  balance_amount:0,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "UPDATE_APPOINMENT":
      newState.isAppoinmentDone = action.payload;
      break;

    case "UPDATE_PATIENT_ID":
        newState.id = action.payload;
        break;

    case "ENABLE_BILLING":
      newState.isBillEnable = action.payload;
      break;

    case "UDATE_SCAN_REPORT":
      if (action.payload == null) {
        newState.scan_record = [];
      } else {
        newState.scan_record.push(action.payload);
      }
      break;

    case "UPDATE_GENDER":
      newState.gender = action.payload;
      break;

    case "UPDATE_STATUS":
      newState.status = action.payload;
      break;

    case "UPDATE_SEARCH":
      newState.searchData = action.payload;
      break;

    case "UPDATE_BALANCE":
      newState.balance_amount = action.payload;
      break;

    case "UPDATE_TRANSACTION":
      newState.transaction_count = action.payload;
      break;

    default:
  }

  return newState;
};

export default reducer;
