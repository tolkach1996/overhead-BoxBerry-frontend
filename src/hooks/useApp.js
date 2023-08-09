import { computed, ref } from 'vue';
import { 
    getFilterData, fetchOrdersByFilters, downloadConsigmentExcel, sendConsigmentBoxBerry, fetchAllCities, updateOneById, downloadPricelist
} from '../api/Service';

const app = () => {
    const isLoadingSearch = ref(false);
    const isLoadingDownloadExcel = ref(false);
    const isLoadingSendBoxberry = ref(false);
    const isLoadingCities = ref(false);
    const isLoadingDownloadCities = ref(false);

    const textError = ref(null);
    const isShowModal = ref(false);

    const filterProject = ref(null);
    const filterStatus = ref(null);

    const selectedFilterProjects = ref([]);
    const selectedFilterStatus = ref([]);

    const orders = ref(null);
    const cities = ref(null);

    const selectedOrders = computed(() => {
        return orders.value.filter(item => item.selected);
    })

    function toggleModalWindow() {
        isShowModal.value = !isShowModal.value;
    }

    async function fetchFilter() {
        try {
            const { metadata, projects } = await getFilterData();
            filterProject.value = projects;
            filterStatus.value = metadata;
        } catch (e) {
            console.error(e);
            textError.value = e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        }
    }
    async function searchData() {
        isLoadingSearch.value = true;
        orders.value = null;
        try {
            if (!selectedFilterProjects.value.length || !selectedFilterStatus.value.length) {
                textError.value = 'Не выбран один из фильтров';
                isShowModal.value = true;
            } else {
                const data = await fetchOrdersByFilters(selectedFilterProjects.value, selectedFilterStatus.value);
                orders.value = data;
            }
        } catch (e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingSearch.value = false;
        }
    }

    async function downloadExcel() {
        isLoadingDownloadExcel.value = true;
        try {
            const data = await downloadConsigmentExcel(selectedOrders.value);
            const href = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'fileName.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingDownloadExcel.value = false
        }
    }
    async function sendBoxberry() {
        isLoadingSendBoxberry.value = true;
        for (let item of orders.value) {
            item.reqStatus = ''
        }
        try {
            const { rows } = await sendConsigmentBoxBerry(selectedOrders.value);
            for (let row of rows) {
                const { id } = row;
                const index = orders.value.findIndex(item => item.id === id);
                if (index >= 0) {
                    orders.value[index] = row;
                }
            }

        } catch (e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingSendBoxberry.value = false;
        }
    }

    async function fetchCities() {
        isLoadingCities.value = true;
        try {
            const data = await fetchAllCities();
            cities.value = data.cities;
        } catch(e) {
            textError.value = e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingCities.value = false;
        }
    }
    function updatePriceById(id, { price }) {
        try {
            updateOneById(id, { price });
        } catch(e) {
            console.error(e);
        }
    }
    async function downloadCities() {
        isLoadingDownloadCities.value = true;
        try {
            const data = await downloadPricelist();
            const href = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'priceList.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingDownloadCities.value = false
        }
    }

    return {
        filterProject,
        filterStatus,
        textError,
        isShowModal,
        isLoadingSearch,
        isLoadingDownloadExcel,
        isLoadingSendBoxberry,
        selectedFilterProjects,
        selectedFilterStatus,
        orders,
        cities,
        isLoadingCities,
        isLoadingDownloadCities,
        toggleModalWindow,
        fetchFilter,
        searchData,
        downloadExcel,
        sendBoxberry,
        fetchCities,
        updatePriceById,
        downloadCities
    }
}

export const useApp = app();