const JWT_HEADER_NAME = process.env.REACT_APP_ACCESS_TOKEN_NAME;

const addAuthHeaderToRequestOptions = (requestOptions) => {
    const accessToken = localStorage.getItem(JWT_HEADER_NAME);
    requestOptions.headers.set("Authorization", `Bearer ${accessToken}`);
    return requestOptions;
}

export const fetchWithAuth = async (path, requestOptions) => {
    return await fetch(path, addAuthHeaderToRequestOptions(requestOptions));
};
