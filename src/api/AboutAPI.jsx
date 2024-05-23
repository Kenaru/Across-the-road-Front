import axios from 'axios';

const BASE_URL = 'http://localhost:5000/about/sections';

export const getAllSections = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des sections:", error);
        throw new Error('Impossible de récupérer les sections. Veuillez réessayer plus tard.');
    }
};

export const addSection = async (section) => {
    try {
        const response = await axios.post(BASE_URL, section);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une section:", error);
        throw new Error('Impossible d’ajouter la section. Veuillez réessayer plus tard.');
    }
};

export const updateSection = async (id, section) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, section);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la section:", error);
        throw new Error('Impossible de mettre à jour la section. Veuillez réessayer plus tard.');
    }
};

export const deleteSection = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la section:", error);
        throw new Error('Impossible de supprimer la section. Veuillez réessayer plus tard.');
    }
};

export const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error("Erreur lors du téléchargement de l'image:", error);
        throw new Error('Échec du téléchargement de l’image. Veuillez réessayer plus tard.');
    }
};
