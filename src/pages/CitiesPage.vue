<template>
    <TableCities v-if="!isLoadingCities" />
    <div class="backdrop" v-else>
        <Loader />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import TableCities from '../components/TableCities.vue';
    import Loader from '../components/Loader/Loader.vue';
    import { useApp } from '../hooks/useApp';

    const { fetchCities, isLoadingCities } = useApp;

    onMounted(async () => {
        await fetchCities();
    })

</script>

<style lang="scss" scoped>
    .backdrop {
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
</style>