// AuthToken.js
// Function to set the authentication token in local storage
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Function to get the authentication token from local storage
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Function to remove the authentication token from local storage
export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};

// Function to handle user logout
export const logoutUser = () => {
    removeAuthToken(); // Remove the token from storage
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token; // Convert token existence to boolean
};

// To check if the user is authenticated
if (isAuthenticated()) {
    // User is authenticated, you can take appropriate actions
    console.log("User is authenticated");
} else {
    // User is not authenticated, you can handle it accordingly
    console.log("User is not authenticated");
}
