// NavbarAPI.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/navbar';

export const fetchNavbarData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/data`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données de la navbar:", error);
        throw new Error('Impossible de récupérer les données de la barre de navigation.');
    }
};

export const updateNavbarItem = async (id, itemData) => {
    try {
        const formData = new FormData();
        for (const key in itemData) {
            formData.append(key, itemData[key]);
        }
        const response = await axios.put(`${BASE_URL}/data/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'élément de la navbar:", error);
        throw new Error('Impossible de mettre à jour l’élément de la barre de navigation.');
    }
};

export const addNavbarItem = async (itemData) => {
    try {
        const formData = new FormData();
        for (const key in itemData) {
            formData.append(key, itemData[key]);
        }
        const response = await axios.post(`${BASE_URL}/data`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'élément de la navbar:", error);
        throw new Error('Impossible d’ajouter l’élément de la barre de navigation.');
    }
};

export const deleteNavbarItem = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/data/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'élément de la navbar:", error);
        throw new Error('Impossible de supprimer l’élément de la barre de navigation.');
    }
};
