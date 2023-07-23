<script>
export default {
    props: {
        loadingDownloadExcel: {
            type: Boolean
        },
        loadingSendBoxberry: {
            type: Boolean
        },
    },
    data() {
        return {
            table: [],
            selectedOrder: [],
            expandedRows: [],
        }
    },
    methods: {
        loadConsigmentExcel() {
            this.$emit('loadConsigmentExcel');
        },
        pushConsigmentBoxBerry() {
            this.$emit('pushConsigmentBoxBerry');
        },
    },
}
</script>

<template>
    <div class="actions">
        <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button" @click="loadConsigmentExcel"
            :loading="loadingDownloadExcel" />
        <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
            @click="pushConsigmentBoxBerry" :loading="loadingSendBoxberry" />
    </div>
</template>

<style></style>