<script >
import Search from './components/Search.vue';
import Table from './components/Table.vue';
import { selectedFilters } from "./api/Service";
import Modal from './components/Modal.vue'
import test from './components/test.vue'

export default {
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
    }
}
</script>

<template>
    <Search @postSelectedFilters="postSelectedFilters" :loadingSearch="loadingSearch"></Search>
    <test :table="table"></test>
    <Table :table="table" @swithModalError="swithModalError"></Table>
    <Modal v-model:show="modalVisible" @click="hideModal">
        <slot v-if="modalSearch">
            Выберите все фильтры!
        </slot>
        <slot v-if="modalError">
            Ошибка сервера!
        </slot>
    </Modal>
</template>

<style></style>
