import {fetchWithAuth} from "../util/fetchWithAuth";

export const getPreviousCalculations = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return await fetchWithAuth(`/api/calc`, {
        method: 'GET',
        headers,
    });
}