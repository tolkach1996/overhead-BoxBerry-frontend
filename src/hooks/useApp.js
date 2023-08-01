import { ref } from 'vue';
import { getFilterData, fetchOrdersByFilters } from '../api/Service';

const app = () => {
    const isLoadingSearch = ref(false);
    const isLoadingDownloadExcel = ref(false);
    const isLoadingSendBoxberry = ref(false);

    const textError = ref(null);
    const isShowModal = ref(false);

    const filterProject = ref(null);
    const filterStatus = ref(null);

    const selectedFilterProjects = ref([]);
    const selectedFilterStatus = ref([]);

    const orders = ref(null);

    function toggleModalWindow() {
        isShowModal.value = !isShowModal.value;
    }

    async function fetchFilter() {
        try {
            const { metadata, projects } = await getFilterData();
            filterProject.value = projects;
            filterStatus.value = metadata;
        } catch(e) {
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
        } catch(e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingSearch.value = false;
        }
    }

    async function downloadExcel() {
        isLoadingDownloadExcel.value = true;
        
        try {

        } catch(e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingDownloadExcel.value = false
        }
    }
    async function sendBoxberry() {
        isLoadingSendBoxberry.value = true;

        try {

        } catch(e) {
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingSendBoxberry.value = false;
        }
    }

    return {
        filterProject,
        filterStatus,
        textError,
        isShowModal,
        isLoadingSearch,
        selectedFilterProjects,
        selectedFilterStatus,
        orders,
        toggleModalWindow,
        fetchFilter,
        searchData
    }
}

export const useApp = app();