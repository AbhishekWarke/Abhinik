// src/api/contracts.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Upload a new contract
export const uploadContract = async (contractDetails) => {
  try {
    const formData = new FormData();
    formData.append('customerName', contractDetails.customerName);
    formData.append('customerEmail', contractDetails.customerEmail);
    formData.append('contractNumber', contractDetails.contractNumber);
    formData.append('startDate', contractDetails.startDate);
    formData.append('endDate', contractDetails.endDate);
    formData.append('contractType', contractDetails.contractType);
    formData.append('numberOfServices', contractDetails.numberOfServices);
    formData.append('contractPrice', contractDetails.contractPrice);
    formData.append('contractPDF', contractDetails.contractPDF);

    const response = await axios.post(`${API_BASE}/contracts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading contract:', error);
    throw error;
  }
};

// Delete a contract by ID
export const deleteContract = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contract:', error);
    throw error;
  }
};

// Fetch contract by user email
export const getContractByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE}/contracts/user`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contract by email:', error);
    throw error;
  }
};
