<script >
import { useStore } from "./stores/index"


export default {
    setup() {
        const store = useStore();
        return { store }
    },
    data() {
        return {
            Orders: this.store.Orders,
            selectedOrders: [],
            selectedProduct: [],
            toggleOrders: false,
            toggleProductConsigment: false
        }
    },
    methods: {
        onCellEditComplete(event) {
            let { data, newValue, field } = event;
            switch (field) {
                default:
                    if (newValue.trim().length > 0) data[field] = newValue;
                    else event.preventDefault();
                    break;
            }
        },
        switchToggleOrders() {
            if (this.selectedOrders.length > 0) {
                this.toggleOrders = true
            }
        },
        switchToggleProductConsigment() {
            if (this.selectedOrders.length > 0) {
                this.toggleProductConsigment = true
            }
        }
    },
}
</script>

<template>
    <div class="App">
        <div class="search">
            <MultiSelect v-model="selectedOrders" :options="Orders" filter optionLabel="name" placeholder="Выберите заказ"
                :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <Button type="button" label="Найти" icon="pi pi-search" class="prime__button" @click="switchToggleOrders" />
        </div>
        <div class="orders block-table" v-if="toggleOrders">
            <div class="title">Заказы покупателей</div>
            <DataTable v-model:selection="selectedProduct" :value="selectedOrders" dataKey="id"
                tableStyle="min-width: 50rem" class="prime-table">
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="name" header="Имя заказа"></Column>
                <Column field="column1" header="Колонка 1"></Column>
                <Column field="column2" header="Колонка 2"></Column>
                <Column field="column3" header="Колонка 3"></Column>
                <Column field="column4" header="Колонка 4"></Column>
            </DataTable>
            <Button type="button" label="Сформировать файл" icon="pi pi-search" class="prime__button"
                @click="switchToggleProductConsigment" />
        </div>
        <div class="consigment block-table" v-if="toggleProductConsigment && selectedProduct.length > 0">
            <div class="title">Накладная BoxBerry</div>
            <DataTable :value="selectedProduct" dataKey="id" editMode="cell" tableStyle="min-width: 50rem"
                @cell-edit-complete="onCellEditComplete" class="prime-table">
                <Column field="column1" header="Колонка 1">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="column2" header="Колонка 2">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="column3" header="Колонка 3">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="column4" header="Колонка 4">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>


                <!--<Column field="code" header="Code">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="name" header="Name">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="category" header="Category">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>
                <Column field="quantity" header="quantity">
                    <template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template>
                </Column>-->
            </DataTable>
            <div class="consigment__button">
                <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button" @click="load" />
                <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
                    @click="load" />
            </div>
        </div>
    </div>
</template>

<style>
.App {
    display: flex;
    flex-direction: column;
    gap: 55px;
}

.search {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 30px;
}

.prime__multiselect {
    width: 1000px;
    height: 60px;
    display: flex;
    align-items: center;
}

.prime__button {
    width: 200px;
    height: 60px;
}

.block-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.title {
    font-weight: 400;
    font-size: 42px;
    line-height: 32px;
    width: 100%;
    text-align-last: left;
}

.consigment__button {
    display: flex;
    gap: 25px;
}

.prime-table {
    width: 100%;
}
</style>
