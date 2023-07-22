import httpClient from "./client"


export const selectedFilters = async (filters) => {
    let { selectedMetadata, selectedProjects } = filters;
    return await httpClient.post('/ms/orders', { data: { selectedMetadata: selectedMetadata, selectedProjects: selectedProjects } })
}

export const getFilterData = async () => {
    return await httpClient.get('/filters');
}

export const downloadConsigmentExcel = async (table) => {
    return await httpClient.post('/excel/download', { data: table }, { responseType: 'blob' })
}

export const sendConsigmentBoxBerry = async (table) => {
    return await httpClient.post('/boxberry/consigment', { data: table })
}