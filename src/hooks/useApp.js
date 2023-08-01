import { ref } from 'vue';
import { getFilterData, fetchOrdersByFilters, downloadConsigmentExcel, sendConsigmentBoxBerry } from '../api/Service';

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
            const data = await downloadConsigmentExcel(orders.value);
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
            const res = await sendConsigmentBoxBerry(orders.value);
            let index = 0;
            for (let item of orders.value) {
                if (res[index].res == 'Ок') {
                    item.reqStatus = res[index].res
                }
                else {
                    item.reqStatus = res[index].err
                }
                index++;
            }

        } catch (e) {
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
        isLoadingDownloadExcel,
        isLoadingSendBoxberry,
        selectedFilterProjects,
        selectedFilterStatus,
        orders,
        toggleModalWindow,
        fetchFilter,
        searchData,
        downloadExcel,
        sendBoxberry,
    }
}

export const useApp = app();