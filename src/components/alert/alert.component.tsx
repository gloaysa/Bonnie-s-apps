import React, { FunctionComponent } from "react";
import { Alert } from "@mui/material";

interface AlertComponentProps {
  style: any;
  options: any;
  message: any;
  close: any;
}

const AlertComponent: FunctionComponent<AlertComponentProps> = ({
  style,
  options,
  message,
  close,
}): JSX.Element => (
  <Alert style={style} severity={options.type} onClose={close}>
    {message}
  </Alert>
);

export default AlertComponent;
