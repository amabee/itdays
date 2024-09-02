import { MASTER_MAIN } from "@/globals/ENDPOINTS";
import axios from "axios";

export const addHandler = async (hid, fname, lname, email, pwd) => {
  const formData = new FormData();
  formData.append("operation", "addHandler");
  formData.append(
    "json",
    JSON.stringify({
      hid: hid,
      h_fname: fname,
      h_lname: lname,
      h_email: email,
      h_pwd: pwd,
    })
  );

  try {
    const res = await axios({
      url: MASTER_MAIN,
      method: "POST",
      data: formData,
    });

    if (res.status === 200) {
      if (res.data.success) {
        console.log("Success");
        return { success: true, message: JSON.stringify(res.data.success) };
      }else{
        console.log("Error");
        return { success: false, message: "Something went wrong!" };
      }
    } else {
      return { success: false, message: res.statusText };
    }
  } catch (error) {
    return { success: false, message: error };
  }
};
