import * as patientActions from "./patientActions";
import { bindActionCreators } from "redux";


const actions = bindActionCreators(
  {
    ...patientActions
  },
  store.dispatch
);


export default actions;