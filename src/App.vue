<script setup>
    import Search from './components/Search.vue';
    import Table from './components/Table.vue';
    import ModalWindow from './components/ModalWindow.vue'
    import test from './components/test.vue'

    import { useApp } from './hooks/useApp';

    const { textError, toggleModalWindow, isShowModal, orders } = useApp;

/* export default {
    components: { Search, Table, Modal, test },
    data() {
        return {
            table: [],
            loadingSearch: false,
            modalVisible: false,
            modalSearch: false,
            modalError: false,
        }
    },
    methods: {
        async postSelectedFilters(filters) {
            this.table = []
            const { selectedMetadata, selectedProjects } = filters
            if (selectedMetadata.length == 0 || selectedProjects.length == 0) {
                this.modalVisible = true;
                this.modalSearch = true;
                return
            }
            try {
                this.loadingSearch = true;
                const res = await selectedFilters(filters);
                this.table = res;
                let i = 1;
                for (let item of this.table) {
                    item.index = i;
                    i++;
                }
                this.loadingSearch = false;
            }
            catch (e) { console.log(e) }
        },
        hideModal() {
            this.modalVisible = false;
            this.modalError = false;
            this.modalSearch = false;
        },
        swithModalError() {
            this.modalVisible = true;
            this.modalError = true;
        },
        deliteOrder(String) {
            this.table = this.table.filter(item => item.index !== String.index)
            let i = 1
            for (let item of this.table) {
                item.index = i
                i++
            }
        },
    }
} */
</script>

<template>
    <Search />
    <!-- <test :table="table" @swithModalError="swithModalError" v-if="this.table.length > 0" @deliteOrder="deliteOrder"></test> -->
    <Table :table="orders" @swithModalError="swithModalError"></Table>
    <ModalWindow :show="isShowModal" @click="toggleModalWindow">
        {{ textError }}
    </ModalWindow>
</template>

<style></style>
