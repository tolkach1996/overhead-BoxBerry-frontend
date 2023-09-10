<template>
    <div class="page">
        <DataFilter :data="orders" :loading="loading" @filter="changeDateFilter" />
        <DataTable :data="orders" v-if="orders && !loading" />
    </div>
    <template v-if="loading">
        <Loader />
    </template>
</template>

<script setup>
    import DataFilter from '@/components/OrdersMove/Filters/DataFilter.vue';
    import DataTable from '@/components/OrdersMove/DataTable/DataTable.vue';
    import Loader from '@/components/Loader/Loader.vue';
    import { storeToRefs } from 'pinia'
    import { useOrderStore } from '@/store/order.store';
    import { onMounted } from 'vue';

    const orderStore = useOrderStore();
    const { orders, loading } = storeToRefs(orderStore);

    function changeDateFilter(dates) {
        orderStore.setFilter('dates', dates);
    }

    onMounted(() => {
        orderStore.setFilter('type', 'accept');
        orderStore.setFilter('dates', [new Date(), null]);
    })
</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>