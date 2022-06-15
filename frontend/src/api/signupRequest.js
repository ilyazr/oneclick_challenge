export const signupRequest = async (userData) => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return await fetch(`/api/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userData)
    });
}