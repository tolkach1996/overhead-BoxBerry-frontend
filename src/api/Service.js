import httpClient from "./client";


export const fetchOrdersByFilters = async (selectedProjects, selectedMetadata) => {
    return await httpClient.post('/ms/orders', { selectedMetadata, selectedProjects });
}

export const getFilterData = async () => {
    return await httpClient.get('/filters');
}

export const downloadConsigmentExcel = async (table) => {
    return await httpClient.post('/excel/download', { data: table }, { responseType: 'blob' });
}

export const sendConsigmentBoxBerry = async (table) => {
    return await httpClient.post('/boxberry/consigment', { data: table });
}