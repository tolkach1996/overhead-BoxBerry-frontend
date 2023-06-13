<script >
import { useStore } from "./stores/index"


const store = useStore()
export default {
    data() {
        return {
            Order: store.Orders,
            //Orders: [{ id: 1, name: "Заказ #1" }, { id: 2, name: "Заказ #2" }, { id: 3, name: "Заказ #3" }, { id: 4, name: "Заказ #4" }, { id: 5, name: "Заказ #5" }, { id: 6, name: "Заказ #6" }, { id: 7, name: "Заказ #7" }, { id: 8, name: "Заказ #8" }, { id: 9, name: "Заказ #9" }, { id: 10, name: "Заказ #10" }],
            selectedOrders: [],
            tableProducts: [
                { id: 1, code: "Стр 1 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
                { id: 2, code: "Стр 2 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
                { id: 3, code: "Стр 3 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
                { id: 4, code: "Стр 4 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
                { id: 5, code: "Стр 5 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
                { id: 6, code: "Стр 6 Поле 1", name: "Поле 2", category: "Поле 3", quantity: "Поле 4" },
            ],
            selectedProductConsigment: [
                { id: 1, field: "code", header: "code" },
                { id: 1, field: "name", header: "name" },
                { id: 1, field: "category", header: "category" },
                { id: 1, field: "test", header: "test" },
            ],
            selectedProduct: [],
            toggleOrders: false,
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
            console.log("123")
            this.toggleOrders = !this.toggleOrders
        }
    },
}
</script>

<template>
    <div class="App">
        <div class="search">
            <MultiSelect v-model="this.selectedOrders" :options="this.Order" filter optionLabel="name"
                placeholder="Выберите заказ" :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <Button type="button" label="Найти" icon="pi pi-search" class="prime__button" :loading="loading"
                @click="this.toggleOrders" />
        </div>
        <div class="orders block-table" v-if="this.toggleOrders">
            <div class="title">Заказы покупателей</div>
            <DataTable v-model:selection="selectedProduct" :value="this.tableProducts" dataKey="id"
                tableStyle="min-width: 50rem" class="prime-table">
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
            <Button type="button" label="Сформировать файл" icon="pi pi-search" class="prime__button" :loading="loading"
                @click="load" />
        </div>
        <div class="consigment block-table">
            <div class="title">Накладная BoxBerry</div>
            <DataTable :value="this.tableProducts" dataKey="id" editMode="cell" tableStyle="min-width: 50rem"
                @cell-edit-complete="this.onCellEditComplete" class="prime-table">
                <Column field="code" header="Code">
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
                </Column>
            </DataTable>
            <div class="consigment__button">
                <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button" :loading="loading"
                    @click="load" />
                <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
                    :loading="loading" @click="load" />
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
