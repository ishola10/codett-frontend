import axios from "axios";

// const APP_ENV = process.env.APP_ENV;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const ASSETS_URL = process.env.ASSET_URL;

export const API_ROUTES = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};

export const getIcons = async () => {
  const response = await axios.get(`${BASE_URL}/symbol`);
  return response.data;
}

export const getWeapons = async () => {
  const response = await axios.get(`${BASE_URL}/weapons`);
  return response.data;
};

export const getWeaponById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/weapons/${id}`);
  return response.data;
};

export const getWeatherConditions = async () => {
  const response = await axios.get(`${BASE_URL}/weather`);
  return response.data;
};

export const getWeatherConditionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/weather/${id}`);
  return response.data;
};

export const getConditions = async () => {
  const response = await axios.get(`${BASE_URL}/conditions`);
  return response.data;
};

export const getConditionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/conditions/${id}`);
  return response.data;
};

export const getRegions = async () => {
  const response = await axios.get(`${BASE_URL}/region`);
  console.log(response.data);
  return response.data;
};

export const getRegionById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/region/${id}`);
  return response.data;
};

export const getEquipments = async () => {
  const response = await axios.get(`${BASE_URL}/equipments`);
  return response.data;
};

export const getEquipmentById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/equipments/${id}`);
  return response.data;
};

export const createMission = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/missions`, data);
  return response.data;
};

export const getMissions = async () => {
  const response = await axios.get(`${BASE_URL}/mission`);
  return response.data;
};

export const getMission = async (id: any) => {
  const response = await axios.get(`${BASE_URL}/mission/${id}`);
  return response.data;
};

export const getMissionLogs = async (id: any) => {
  const response = await axios.get(`${BASE_URL}/mission-logs?mission_id=${id}`);
  return response.data;
};

export const updateMissionParticipant = async (id: any, query: any) => {
  const response = await axios.post(`${BASE_URL}/mission/add-participants?mission_id=${id}`, query);
  return response.data;
};

export const updateMissionParticipantPosition = async (id: any, query: any) => {
  const response = await axios.post(`${BASE_URL}/mission/update-participants?mission_id=${id}`, query);
  return response.data;
};

