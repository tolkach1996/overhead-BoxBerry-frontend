<script setup>
    import { useApp } from '../hooks/useApp';
    const { orders } = useApp;
</script>

<template>
    <div class="actions" v-if="orders">
        <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button" @click="loadConsigmentExcel"
            :loading="loadingDownloadExcel" />
        <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
            @click="pushConsigmentBoxBerry" :loading="loadingSendBoxberry" />
    </div>
</template>

<style scoped lang="scss">
    .actions {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px 0px;
        box-shadow: -3px 0px 10px lightgray;
    }
</style>