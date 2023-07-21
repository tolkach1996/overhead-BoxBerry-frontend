<script >
import axios from "axios"
import Search from './components/search.vue'
import Table from './components/Table.vue'
import { selectedFilters } from "./api/Service"

export default {
    components: { Search, Table },
    data() {
        return {
            table: [],
        }
    },
    methods: {
        async postSelectedFilters(filters) {
            try {
                const response = await selectedFilters(filters)
                this.table = response
            }
            catch (e) { console.log(e) }
        },
    }
}

</script>

<template>
    <Search @postSelectedFilters="postSelectedFilters"></Search>
    <Table :table="table"></Table>
</template>

<style></style>
