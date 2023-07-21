<script>
export default {
    data() {
        return {
            table: [],
            selectedOrder: [],
            expandedRows: [],
        }
    },
    methods: {
        loadConsigmentExcel() {
            this.$emit('loadConsigmentExcel')
        },
        pushConsigmentBoxBerry() {
            this.$emit('pushConsigmentBoxBerry')
        },
    },
}
</script>

<template>
    <div class="actions">
        <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button"
            @click="loadConsigmentExcel" />
        <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
            @click="pushConsigmentBoxBerry" />
    </div>
</template>

<style></style>