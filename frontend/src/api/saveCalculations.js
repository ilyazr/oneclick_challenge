import {fetchWithAuth} from "../util/fetchWithAuth";

export const saveCalculations = async (calculations) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return await fetchWithAuth(`/api/calc`, {
        method: 'POST',
        headers,
        body: JSON.stringify(calculations)
    });
}
