import OrderService from "@/api/OrderService";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore('orderStore', () => {
    const order = ref(null);

    const loading = ref(false);
    const notFound = ref(false);
    const textError = ref(null);

    async function getOrderById(id) {
        order.value = null;
        loading.value = true;
        notFound.value = false;
        try {
            const { order: data } = await OrderService.getOrderById(id);
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
            await OrderService.updateStatusById(id);
        } catch(e) {
            console.error(e);
            textError.value = e.message || 'Произошла ошибка';
        } finally {
            loading.value = false;
        }
    }

    function newScaning() {
        order.value = null;
        loading.value = false;
        notFound.value = false;
    }

    return {
        order,
        loading,
        notFound,
        textError,
        getOrderById,
        updateOrder,
        newScaning
    }
})