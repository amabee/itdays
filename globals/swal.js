import Swal from "sweetalert2";

export const SuccessMessage = (message, callback) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof callback === "function") {
        callback();
      }
    }
  });
};

export const ErrorMessage = (message) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
};

export const WarningMessage = (message, callback) => {
    Swal.fire({
      title: "Warning!",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof callback === "function") {
          callback();
        }
      }
    });
  };
