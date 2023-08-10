<script setup>
    import ToggleButton from 'primevue/togglebutton';
    import { computed, onMounted, ref, watch } from 'vue';
    import { useApp } from '../hooks/useApp';

    const { 
        fetchFilter,
        searchData,
        filterProject, 
        selectedFilterProjects,
        filterStatus, 
        selectedFilterStatus,
        isLoadingSearch,
        declaredModel,
        openingModel,
        orders
    } = useApp;

    const isActive = computed(() => {
        return !!orders.value;
    })

    onMounted(async () => {
        await fetchFilter();
    });

    watch(declaredModel, value => {
        if (!orders.value) return;
        orders.value = orders.value.map(item => {
            item.declaredStatus = value;
            return item;
        })
    })
    watch(openingModel, value => {
        if (!orders.value) return;
        orders.value = orders.value.map(item => {
            item.openingStatus = value;
            return item;
        })
    })

</script>

<template>
    <div class="search">
        <div class="search__item">
            <MultiSelect v-model="selectedFilterProjects" :options="filterProject" filter optionLabel="name" placeholder="Выберите проект"
                :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <MultiSelect v-model="selectedFilterStatus" :options="filterStatus" filter optionLabel="name" placeholder="Выберите статус"
                :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <Button type="button" label="Найти" icon="pi pi-search" class="prime__button" @click="searchData"
                :loading="isLoadingSearch" />
        </div>
        <div class="search__item">
            <ToggleButton v-model="declaredModel" onLabel="Объявленная стоимость" offLabel="Объявленная стоимость"
                onIcon="pi pi-check" offIcon="pi pi-times" class="w-9rem" :disabled="!isActive" />
            <ToggleButton v-model="openingModel" onLabel="Вскрытие при получении" offLabel="Вскрытие при получении"
                onIcon="pi pi-check" offIcon="pi pi-times" class="w-9rem" :disabled="!isActive" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .search {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 5px 0px;

        &__item {
            flex: 1 1 auto;
            display: flex;
            gap: 10px;
        }
    }
</style>