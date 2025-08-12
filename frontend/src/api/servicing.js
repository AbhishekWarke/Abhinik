// src/api/servicing.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = `${API_BASE}/servicing`;

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
