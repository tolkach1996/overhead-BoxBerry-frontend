<template>
    <Table>
        <Row class="row_header row_cities">
            <Column>№</Column>
            <Column>Название города</Column>
            <Column>Стоимость</Column>
            <Column>Дата изменения</Column>
            <Column></Column>
        </Row>
        <Row class="row_cities" v-for="(item, index) in cities" :key="item.id">
            <Column>{{ index + 1 }}</Column>
            <Column>{{ item.name }}</Column>
            <Column>
                <span v-if="!item.isEdit">{{ item.price }}</span>
                <input v-else v-model="item.price" class="table__input" />
            </Column>
            <Column>{{ dateFormat(item.dateEdit) }}</Column>
            <Column>
                <EditIcon v-if="!item.isEdit" @click="() => toggleEditRow(index)" />
                <SaveIcon v-else @click="() => toggleEditRow(index)" /> 
            </Column>
        </Row>
    </Table>
</template>

<script setup>
    import { Table, Row, Column } from './Table';
    import { EditIcon, SaveIcon } from './Icons';
    import { useApp } from '../hooks/useApp';

    const { cities, updatePriceById } = useApp;

    function dateFormat(date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
    }
    async function toggleEditRow(index) {
        const isEdit = cities.value[index].isEdit;
        if (isEdit) {
            const { _id, price } = cities.value[index];
            await updatePriceById(_id, { price });
        }
        return cities.value[index].isEdit = !isEdit;
    }

</script>

<style lang="scss" scoped>

</style>