import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getIcons = async () => {
  const response = await axios.get(`${BASE_URL}/symbol`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getWeapons = async () => {
  const response = await axios.get(`${BASE_URL}/weapons`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getWeaponById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/weapons/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getWeatherConditions = async () => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getWeatherConditionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/weather/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getConditions = async () => {
  const response = await axios.get(`${BASE_URL}/conditions`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getConditionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/conditions/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getRegions = async () => {
  const response = await axios.get(`${BASE_URL}/region`, {
    headers: getAuthHeaders(),
  });
  console.log(response.data);
  return response.data;
};

export const getRegionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/region/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getEquipments = async () => {
  const response = await axios.get(`${BASE_URL}/equipments`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getEquipmentById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/equipments/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createMission = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/mission/create`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getMissions = async () => {
  const response = await axios.get(`${BASE_URL}/mission`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getMission = async (id: any) => {
  const response = await axios.get(`${BASE_URL}/mission/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getMissionLogs = async (id: any) => {
  const response = await axios.get(`${BASE_URL}/mission-logs?mission_id=${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateMissionParticipant = async (id: any, query: any) => {
  const response = await axios.post(`${BASE_URL}/mission/add-participants?mission_id=${id}`, query, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateMissionParticipantPosition = async (id: any, query: any) => {
  const response = await axios.post(`${BASE_URL}/mission/update-participants?mission_id=${id}`, query, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
