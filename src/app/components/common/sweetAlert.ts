import Swal, { SweetAlertOptions } from "sweetalert2";

export const SweetAlerts = (Id?: string) => {
  return {
    SweetAlert(
      type: "success" | "error" | "info", 
      message: string,
      props?: SweetAlertOptions
    ) {
      return Swal.fire({
        icon: type,
        target: Id,
        heightAuto: false,
        showConfirmButton: false,
        text: message,
        width: "330px",
        timer: 3000,
        focusCancel: true,
        ...props,
      });
    },
    SweetPrompt(
      type: "question" | "warning",
      message: string,
      props?: SweetAlertOptions
    ) {
      return Swal.fire({
        icon: type,
        target: Id,
        heightAuto: false,
        text: message,
        width: "330px",
        showCancelButton: true,
        focusCancel: true,
        cancelButtonText: "Cancel",
        denyButtonText: "Continue",
        confirmButtonText: "Confirm",
        ...props,
      });
    },
    SweetSyncPrompt(
      type: "question" | "warning",
      heading:string,
      message: string,
      props?: SweetAlertOptions
    ) {
      return Swal.fire({
        icon: type,
        target: Id,
        heightAuto: false,
        text: message,
        width: "430px",
        title:heading,
        showCancelButton: true,
        focusCancel: true,
        cancelButtonText: "Cancel",
        denyButtonText: "Continue",
        confirmButtonText: "Confirm",
        ...props,
      });
    },
   
  };
};
