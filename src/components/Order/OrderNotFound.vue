<template>
    <OrderMessage>
        <template #title>
            Заказ не найден
        </template>
        <template #content>
            <img :src="SadSearch" alt="">
        </template>
    </OrderMessage>
</template>

<script setup>
    import OrderMessage from './OrderMessage/OrderMessage.vue';
    import SadSearch from "@/assets/images/sadSearch.svg";
</script>