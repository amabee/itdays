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
      } else {
        console.log(res.data);
        return { success: false, message: "Something went wrong!" };
      }
    } else {
      return { success: false, message: res.statusText };
    }
  } catch (error) {
    return { success: false, message: error };
  }
};

export const getHandler = async () => {
  try {
    const res = await axios.get(MASTER_MAIN, {
      params: {
        operation: "getHandlers",
        json: "",
      },
    });

    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong while fetching the handlers",
          data: null,
        };
      }
    } else {
      return { success: false, message: res.statusText, data: null };
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const getTribus = async () => {
  try {
    const res = await axios.get(MASTER_MAIN, {
      params: {
        operation: "getTribu",
        json: "",
      },
    });

    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong while fetching the tribu list",
          data: null,
        };
      }
    } else {
      return { success: false, message: res.statusText, data: null };
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const getTribuDetails = async () => {
  try {
    const res = await axios.get(MASTER_MAIN, {
      params: {
        operation: "getTribuDetails",
        json: "",
      },
    });

    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong while fetching the tribu details",
          data: null,
        };
      }
    } else {
      return { success: false, message: res.statusText, data: null };
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const addTribu = async (tribu_name, handler_id) => {
  const formData = new FormData();
  formData.append("operation", "addTribu");
  formData.append(
    "json",
    JSON.stringify({
      tribu_name: tribu_name,
      handler_id: handler_id,
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
        return { success: true, message: "Tribu Added", data: null };
      } else {
        return {
          success: false,
          message: JSON.stringify(res.data.error),
          data: null,
        };
      }
    } else {
      return { success: false, message: res.statusText, data: null };
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const assignedTeacher2Tribu = async (hid, pid) => {
  const formData = new FormData();
  formData.append("operation", "assignTeacher2Tribu");
  formData.append(
    "json",
    JSON.stringify({
      hid: hid,
      pid: pid,
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
        return { success: true, message: JSON.stringify(res.data.success) };
      } else {
        return {
          success: false,
          // message: "Something went wrong assigning the teacher to the tribu",
          message: JSON.stringify(res.data),
        };
      }
    } else {
      return { success: false, message: "Status Error" };
    }
  } catch (error) {
    return { success: false, message: "Exception error: " + error };
  }
};
