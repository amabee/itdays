import { HANDLER_MAIN } from "@/globals/ENDPOINTS";
import axios from "axios";
import { data } from "jquery";

export const getTribuMembers = async (hid, event_id) => {
  try {
    const res = await axios.get(HANDLER_MAIN, {
      params: {
        operation: "getTribuMembers",
        json: JSON.stringify({
          hid: hid,
          event_id: event_id,
        }),
      },
    });

    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong fetching tribu members",
          data: JSON.stringify(res.data),
        };
      }
    } else {
      return { success: false, message: "Status Error", data: null };
    }
  } catch (error) {
    return { success: false, message: error, data: data };
  }
};

export const getEvents = async () => {
  try {
    const res = await axios.get(HANDLER_MAIN, {
      params: {
        operation: "getEvents",
        json: "",
      },
    });
    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong fetching events",
          data: res.data,
        };
      }
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const getStudentsWitoutTribu = async () => {
  try {
    const res = await axios.get(HANDLER_MAIN, {
      params: {
        operation: "getStudentsWithoutTribu",
        json: "",
      },
    });
    if (res.status === 200) {
      if (res.data.success) {
        return { success: true, message: "", data: res.data.success };
      } else {
        return {
          success: false,
          message: "Something went wrong fetching students",
          data: res.data,
        };
      }
    }
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};

export const updateStudentTribuId = async (tribu_id, stud_id) => {
  const formData = new FormData();
  formData.append("operation", "updateStudentTribuId");
  formData.append(
    "json",
    JSON.stringify({
      tribu_id: tribu_id,
      stud_id: stud_id,
    })
  );

  try {
    const res = await axios({
      url: HANDLER_MAIN,
      method: "POST",
      data: formData,
    });

    if (res.status !== 200) {
      return {
        success: false,
        message: `Request failed with status ${res.status}`,
      };
    }
    if (res.data.success) {
      return {
        success: true,
        message: "Student's Tribu ID updated successfully.",
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Failed to update student's Tribu ID.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.message || "An error occurred while updating the Tribu ID.",
    };
  }
};
