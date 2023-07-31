<script setup>
    import { onMounted } from 'vue';
    import { useApp } from '../hooks/useApp';

    const { 
        fetchFilter,
        searchData,
        filterProject, 
        selectedFilterProjects,
        filterStatus, 
        selectedFilterStatus,
        isLoadingSearch
    } = useApp;

    onMounted(async () => {
        await fetchFilter();
    });

/* import { getFilterData } from "../api/Service";

export default {
    props: {
        loadingSearch: {
            type: Boolean
        },
    },
    data() {
        return {
            metadata: [],
            projects: [],
            selectedMetadata: [],
            selectedProjects: [],
        }
    },
    methods: {
        postSelectedFilters() {
            this.$emit('postSelectedFilters', { selectedMetadata: this.selectedMetadata, selectedProjects: this.selectedProjects });
        },
        async filterData() {
            try {
                const data = await getFilterData();
                this.metadata = data.metadata;
                this.projects = data.projects;
            }
            catch (e) { console.log(e) }
        },
    },
    mounted() {
        this.filterData();
    }
} */
</script>

<template>
    <div class="search">
        <MultiSelect v-model="selectedFilterProjects" :options="filterProject" filter optionLabel="name" placeholder="Выберите проект"
            :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
        <MultiSelect v-model="selectedFilterStatus" :options="filterStatus" filter optionLabel="name" placeholder="Выберите статус"
            :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
        <Button type="button" label="Найти" icon="pi pi-search" class="prime__button" @click="searchData"
            :loading="isLoadingSearch" />
    </div>
</template>

<style></style>