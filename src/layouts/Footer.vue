<template>
    <footer class="footer">
        <template v-if="isOrdersActions">
            <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button" @click="downloadExcel"
                :loading="isLoadingDownloadExcel" />
            <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button" @click="sendBoxberry"
                :loading="isLoadingSendBoxberry" />
        </template>
        <template v-if="isCitiesActions">
            <Button type="button" label="Скачать Прайс" icon="pi pi-search" class="prime__button" @click="downloadCities"
                :loading="isLoadingDownloadCities" />
        </template>
    </footer>
</template>

<script setup>
    import { useApp } from '../hooks/useApp';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    const { orders, cities, downloadExcel, isLoadingDownloadExcel, sendBoxberry, isLoadingSendBoxberry, downloadCities, isLoadingDownloadCities } = useApp;
    const route = useRoute();

    const isOrdersActions = computed(() => {
        return orders.value && route.name === 'Main';
    })
    const isCitiesActions = computed(() => {
        return cities.value && route.name === 'Cities';
    })
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
        padding: 0px 40px;
        box-shadow: -3px 0 10px #d3d3d3;
        background-color: white;
        gap: 10px;
    }

    .p-button {
        height: 30px !important;
        font-weight: 400;

        &-label {
            font-size: 14px !important;
            font-weight: 400;
        }
    }
</style>