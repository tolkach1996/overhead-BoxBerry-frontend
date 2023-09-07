<template>
    <WindowMessage v-if="!order && !notFound && !loading">
        <template #title>Начните сканирование для просмотра заказа</template>
        <template #content>
            <img :src="ScannerImg" alt="">
        </template>
    </WindowMessage>
    <WindowMessage v-else-if="notFound">
        <template #title>Товар не найден!<br />Начните новое сканирование</template>
        <template #content>
            <img :src="SadSearchImg" alt="">
        </template>
    </WindowMessage>
    <Order v-if="order" :order="order" />
    <Loader v-if="!order && loading" />
    <Notice />
</template>

<script setup>
    import WindowMessage from './WindowMessage.vue';
    import ScannerImg from '@/assets/images/scanner.svg';
    import SadSearchImg from '@/assets/images/sadSearch.svg';
    import Order from './Order/Order.vue';
    import Loader from '@/components/Loader/Loader.vue';
    import Notice from '@/components/Notice/Notice.vue';
    import { useOrderStore } from '@/store/order.store';
    import { storeToRefs } from 'pinia';

    const orderStore = useOrderStore();
    const { order, loading, notFound } = storeToRefs(orderStore);

</script>

<style lang="scss" scoped>

</style>