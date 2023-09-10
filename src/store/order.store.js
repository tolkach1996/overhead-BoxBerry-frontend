import OrderService from "@/api/OrderService";

import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const useOrderStore = defineStore('orderStore', () => {
    const order = ref(null);
    const orders = ref([]);

    const filter = reactive({
        dates: [new Date(), null],
        type: null
    })

    const loading = ref(false);
    const notFound = ref(false);
    const textError = ref(null);

    const timer = ref(null);

    async function getOrderByDocumentId(id) {
        order.value = null;
        loading.value = true;
        notFound.value = false;
        try {
            const { order: data } = await OrderService.getOrderByDocumentId(id);
            order.value = data;
        } catch(e) {
            notFound.value = true;
        } finally {
            loading.value = false;
        }
    }
    async function updateOrder(id) {
        loading.value = true;
        textError.value = null;
        try {
            await OrderService.updateStatusById(id, { type: filter.type });
        } catch(e) {
            console.error(e);
            textError.value = e.message || 'Произошла ошибка';
        } finally {
            loading.value = false;
        }
    }
    async function getOrders() {
        orders.value = [];
        loading.value = true;
        textError.value = null;
        try {
            const { orders: data } = await OrderService.getOrdersMove(filter);
            orders.value = data;
        } catch(e) {
            textError.value = e.message || 'Ошибка сервера';
        } finally {
            loading.value = false
        }
    }

    function newScaning() {
        order.value = null;
        loading.value = false;
        notFound.value = false;
    }
    function setFilter(name, value) {
        filter[name] = value;
    }

    watch(filter, async value => {
        orders.value = [];
        loading.value = true;
        if (timer.value) clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            getOrders();
        }, 500)
    })

    return {
        order,
        orders,
        loading,
        notFound,
        textError,
        getOrderByDocumentId,
        updateOrder,
        newScaning,
        getOrders,
        setFilter
    }
})