// src/api/servicing.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/servicing";

export const uploadServicingRecord = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading servicing record:", error.response || error.message);
    throw error;
  }
};
