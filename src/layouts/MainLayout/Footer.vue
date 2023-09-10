<template>
    <footer class="footer">
        <template v-if="isOrdersActions">
            <Button type="button" label="Скачать Excel" icon="pi pi-download" class="prime__button" @click="downloadExcel"
                :loading="isLoadingDownloadExcel" :disabled="!isActiveActionsOrder" />
            <Button type="button" label="Отправить в BoxBerry" icon="pi" class="prime__button" @click="sendBoxberry"
                :loading="isLoadingSendBoxberry" :disabled="!isActiveActionsOrder" />
        </template>
        <template v-if="isCitiesActions">
            <Button type="button" label="Скачать Прайс" icon="pi pi-box" class="prime__button" @click="downloadCities"
                :loading="isLoadingDownloadCities" />
        </template>
    </footer>
</template>

<script setup>
    import { useApp } from '@/hooks/useApp';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    import { ROUTES_NAME } from '@/constants/routesName';

    const { 
        orders, selectedOrders, cities, downloadExcel, isLoadingDownloadExcel, sendBoxberry, isLoadingSendBoxberry, downloadCities, isLoadingDownloadCities
    } = useApp;
    const route = useRoute();

    const isOrdersActions = computed(() => {
        return orders.value && route.name === ROUTES_NAME.MAIN;
    })
    const isCitiesActions = computed(() => {
        return cities.value && route.name === ROUTES_NAME.CITIES;
    })
    const isActiveActionsOrder = computed(() => {
        return selectedOrders.value.length;
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