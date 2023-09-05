<template>
    <WindowMessage v-if="false">
        <template #title>Начните сканирование для просмотра заказа</template>
        <template #content>
            <img :src="ScannerImg" alt="">
        </template>
    </WindowMessage>
    <WindowMessage v-else-if="false">
        <template #title>Товар не найден!<br />Начните новое сканирование</template>
        <template #content>
            <img :src="SadSearchImg" alt="">
        </template>
    </WindowMessage>
    <Order />
</template>

<script setup>
    import WindowMessage from './WindowMessage.vue';
    import ScannerImg from '@/assets/images/scanner.svg';
    import SadSearchImg from '@/assets/images/sadSearch.svg';

    import Order from './Order/Order.vue';
</script>

<style lang="scss" scoped>

</style>