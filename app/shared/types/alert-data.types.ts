import AlertType from "../enums/alert-type.enums";

type AlertDataType = {
  type: AlertType;
  message: string;
  display: boolean;
  link?: {
    label: string;
    href: string;
  };
};

export default AlertDataType;
