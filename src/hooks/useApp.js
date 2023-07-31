import { ref } from 'vue';
import { getFilterData, fetchOrdersByFilters } from '../api/Service';

const app = () => {
    const isLoadingSearch = ref(false);
    const textError = ref(null);
    const isShowModal = ref(false);

    const filterProject = ref(null);
    const filterStatus = ref(null);

    const selectedFilterProjects = ref(null);
    const selectedFilterStatus = ref(null);

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
        try {

            if (!selectedFilterProjects.value || !selectedFilterStatus.value) {
                textError.value = 'Не выбран один из фильтров';
                isShowModal.value = true;
            } else {
                const data = await fetchOrdersByFilters(selectedFilterProjects.value, selectedFilterStatus.value);
                orders.value = data;
            }
        } catch(e) {
            console.error(e);
            textError.value = e?.response?.data?.message || e?.message || 'Ошибка сервера';
            isShowModal.value = true;
        } finally {
            isLoadingSearch.value = false;
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