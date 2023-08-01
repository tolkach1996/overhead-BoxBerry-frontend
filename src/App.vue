<script setup>
    import Search from './components/Search.vue';
    import ModalWindow from './components/ModalWindow.vue'
    import Table from './components/Table/Table.vue';
    import Actions from './components/Actions.vue';
    import { useApp } from './hooks/useApp';

    const { textError, toggleModalWindow, isShowModal } = useApp;
</script>

<template>
    <Search />
    <Table />
    <ModalWindow :show="isShowModal" @click="toggleModalWindow">
        {{ textError }}
    </ModalWindow>
    <Actions />
</template>

<style></style>
