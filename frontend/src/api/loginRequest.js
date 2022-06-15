
export const loginRequest = async (credentials) => {
    const headers = new Headers();
    headers.append('Content-Type', "application/json");
    return await fetch(`/api/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(credentials)
    });
}
