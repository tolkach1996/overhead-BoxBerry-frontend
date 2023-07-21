import httpClient from "./client"


export const selectedFilters = async (filters) => {
    let { selectedMetadata, selectedProjects } = filters;
    return await httpClient.post('/postSelectedFilters', { data: { selectedMetadata: selectedMetadata, selectedProjects: selectedProjects } })
}

export const getFilterData = async () => {
    return await httpClient.get('/getFilterData');
}

export const downloadConsigmentExcel = async (table) => {
    return await httpClient.post('/downloadConsigmentExcel', { data: table }, { responseType: 'blob' })
}

export const sendConsigmentBoxBerry = async (table) => {
    return await httpClient.post('/sendConsigmentBoxBerry', { data: table })
}