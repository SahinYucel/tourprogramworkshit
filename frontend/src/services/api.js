import axios from 'axios';

// Production API URL
const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // CORS için gerekli
});

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Company endpoints
export const saveCompany = (data) => api.post('/company', data);
export const companyLogin = (credentials) => api.post('/company/login', credentials);
export const getCompanies = () => api.get('/company');
export const updateCompany = (id, data) => api.put(`/company/${id}`, data);
export const deleteCompany = (id) => api.delete(`/company/${id}`);

// Agency role member endpoints
export const registerAgencyRoleMember = (data) => api.post('/agency/register', data);
export const loginAgencyRoleMember = (data) => api.post('/agency/login', data);
export const getAgencyMembers = (companyId) => api.get(`/agency/members/${companyId}`);
export const deleteAgencyMember = (memberId) => api.delete(`/agency/members/${memberId}`);
export const updateAgencyMemberRole = (memberId, newRole) => api.put(`/agency/members/${memberId}/role`, { newRole });
export const updateAgencyMemberUsername = (memberId, newUsername) => api.put(`/agency/members/${memberId}/username`, { newUsername });

// Agency providers endpoints
export const saveProviders = (providers) => api.post('/agencyAddCompanies/providers', {providers});
export const getProviders = (companyId) => api.get(`/agencyAddCompanies/providers/${companyId}`);

// Role permissions endpoints
export const getRolePermissions = (companyId) => api.get(`/agency/role-permissions/${companyId}`);
export const updateRolePermissions = (companyId, permissions) => api.put(`/agency/role-permissions/${companyId}`, { permissions });

// Tour endpoints
export const saveTourData = (companyId, data) => api.post('/tourlist/save', { companyId, ...data });

// Backup endpoints
export const backupDatabase = async (companyId) => {
  try {
    const response = await api.post(`/company/backup/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createBackup = (companyId, companyName) => api.post(`/backup/backup/${companyId}`, { companyName });
export const restoreBackup = (formData) => api.post('/backup/restore', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const getAutoBackupStatus = (companyId) => api.get(`/backup/auto-backup/${companyId}/status`);
export const toggleAutoBackup = (companyId, enabled) => api.post(`/backup/auto-backup/${companyId}`, { enabled }, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;