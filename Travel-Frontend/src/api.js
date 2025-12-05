import axios from "axios";

export const API_BASE = "http://localhost:8080/api";

// 🔹 Automatically attach JWT token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =======================================================
   AUTH APIs
======================================================= */

// REGISTER
export async function registerUser(data) {
  return axios.post(`${API_BASE}/auth/register`, data).then((res) => res.data);
}

// LOGIN
export async function loginUser(data) {
  return axios.post(`${API_BASE}/auth/login`, data).then((res) => res.data);
}

/* =======================================================
   TOURIST APIs
======================================================= */

// GET RECOMMENDATIONS
export async function getRecommendations(touristId) {
  // const url = new URL(`${API_BASE}/tourist/${touristId}/recommendations`);
  return axios
    .get(`${API_BASE}/tourist/${touristId}/recommendations`)
    .then((res) => res.data);
}

// GET PACKAGE DETAILS
export async function fetchPackage(id) {
  return axios.get(`${API_BASE}/package/${id}`).then((res) => res.data);
}

// GET ALL PACKAGES
export async function fetchPackages() {
  return axios.get(`${API_BASE}/packages`).then((res) => res.data);
}

// GET PERSONAL PROFILE
export async function getTouristProfile(id) {
  return axios.get(`${API_BASE}/tourist/${id}/profile`).then((res) => res.data);
}

// UPDATE PERSONAL PROFILE
export async function updateTouristProfile(id, data) {
  return axios
    .put(`${API_BASE}/tourist/${id}/profile`, data)
    .then((res) => res.data);
}

// CHANGE PASSWORD
export async function changePassword(id, data) {
  return axios
    .put(`${API_BASE}/auth/${id}/change-password`, data)
    .then((res) => res.data);
}

// GET TRAVEL HISTORY
export async function getTravelHistory(id) {
  return axios.get(`${API_BASE}/tourist/${id}/history`).then((res) => res.data);
}

// BOOK A PACKAGE
export async function bookPackage(touristId, packageId, bookingData) {
  return axios.post(`${API_BASE}/tourist/${touristId}/book/${packageId}`, bookingData);
}

// SUBMIT REVIEW
export async function submitReview(touristId, packageId, rating, comment) {
  return axios
    .post(`${API_BASE}/review/${touristId}/${packageId}`, { rating, comment })
    .then((res) => res.data);
}

// FETCH REVIEWS FOR A PACKAGE
export async function fetchReviews(packageId) {
  return axios.get(`${API_BASE}/review/${packageId}`).then((res) => res.data);
}

/* =======================================================
   ADMIN APIs — PACKAGES
======================================================= */

// CREATE PACKAGE
export async function adminCreatePackage(pkg) {
  return axios.post(`${API_BASE}/admin/package`, pkg).then((res) => res.data);
}

// UPDATE PACKAGE
export async function adminUpdatePackage(id, pkg) {
  return axios
    .put(`${API_BASE}/admin/package/${id}`, pkg)
    .then((res) => res.data);
}

// DELETE PACKAGE
export async function deletePackage(id) {
  return axios
    .delete(`${API_BASE}/admin/package/${id}`)
    .then((res) => res.data);
}

// GET BOOKINGS
export async function fetchBookings() {
  return axios.get(`${API_BASE}/admin/bookings`).then((res) => res.data);
}

/* =======================================================
   ADMIN APIs — LANDSCAPES
======================================================= */

// GET LANDSCAPES
export async function fetchLandscapes() {
  return axios.get(`${API_BASE}/admin/landscapes`).then((res) => res.data);
}

// ADD LANDSCAPE
export async function addLandscape(data) {
  return axios
    .post(`${API_BASE}/admin/landscape`, data)
    .then((res) => res.data);
}

// UPDATE LANDSCAPE
export async function updateLandscape(id, body) {
  return axios
    .put(`${API_BASE}/admin/landscape/${id}`, body)
    .then((res) => res.data);
}

// DELETE LANDSCAPE
export async function deleteLandscape(id) {
  return axios
    .delete(`${API_BASE}/admin/landscape/${id}`)
    .then((res) => res.data);
}

/* =======================================================
   MASTER DATA APIs — AREA & SEASON
======================================================= */

// GET ALL AREAS
export async function fetchAreas() {
  return axios.get(`${API_BASE}/areas`).then((res) => res.data);
}

// GET ALL SEASONS
export async function fetchSeasons() {
  return axios.get(`${API_BASE}/seasons`).then((res) => res.data);
}
