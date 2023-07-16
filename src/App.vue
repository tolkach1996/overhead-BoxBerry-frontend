<script >
import { useStore } from "./stores/index"
import axios from "axios"

export default {
    setup() {
        const store = useStore();
        return { store }
    },
    data() {
        return {
            test: [
                {
                    fio: 'Сапрыкина Ирина Сергеевна',
                    phone: '+79032838889',
                    dataPackage: '20230715',
                    typeTransfer: '1',
                    deliverySum: 189.2,
                    paySum: 200,
                    departurePointCode: '010',
                    codePWZ: '50221',
                    weightPackage: '3000',
                    orders: [
                        {
                            fio: 'Сапрыкина Ирина Сергеевна',
                            number: 's952',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        },
                        {
                            fio: 'Сапрыкина Ирина Сергеевна',
                            number: 's88882',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        }
                    ]
                },
                {
                    dataPackage: '20230715',
                    paySum: 250,
                    deliverySum: 237.2,
                    typeTransfer: '1',
                    codePWZ: '01423',
                    departurePointCode: '010',
                    fio: 'Жемчужникова Светлана Николаевна',
                    phone: '+7(916) 546-91-51',
                    weightPackage: '3000',
                    orders: [
                        {
                            fio: 'Жемчужникова Светлана Николаевна',
                            number: 's112',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        },
                        {
                            fio: 'Жемчужникова Светлана Николаевна',
                            number: 's122',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        }
                    ]
                },
                {
                    dataPackage: '20230715',
                    paySum: 200,
                    deliverySum: 189.2,
                    typeTransfer: '1',
                    codePWZ: '00981',
                    departurePointCode: '010',
                    fio: 'Тришина Виктория Алексеевна',
                    phone: '+7(926) 287-16-80',
                    weightPackage: '3000',
                    orders: [
                        {
                            fio: 'Тришина Виктория Алексеевна',
                            number: 's212',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        }
                    ]
                },
                {
                    dataPackage: '20230715',
                    paySum: 250,
                    deliverySum: 242,
                    typeTransfer: '1',
                    codePWZ: '16469',
                    departurePointCode: '010',
                    fio: 'Медведева Елена Николаевна',
                    phone: '79649983096',
                    weightPackage: '3000',
                    orders: [
                        {
                            fio: 'Медведева Елена Николаевна',
                            number: 's312',
                            declaredSum: 5,
                            dataTransfer: '20230715',
                        }
                    ]
                }
            ],
            metadata: [],
            projects: [],
            selectedMetadata: [],
            selectedProjects: [],
            table: [],
            selectedOrder: [],
            expandedRows: [],
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
        onRowEditSave(event) {
            let { newData, index } = event;
            this.table[index] = newData;
        },
        onSubRowEditSave(event) {
            console.log(event)
            let { newData, index } = event;
            for (let item of this.table) {
                if (item.fio == newData.fio) item.orders[index] = newData
            }
        },
        async postSelectedFilters() {
            try {
                const response = await axios.post('http://localhost:5000/postSelectedFilters', { data: { selectedMetadata: this.selectedMetadata, selectedProjects: this.selectedProjects } })
                this.table = response.data
                console.log(this.table)
            }
            catch (e) { console.log(e) }
        },
        async downloadConsigmentExcel() {
            try {
                const response = await axios.post('http://localhost:5000/downloadConsigmentExcel', { data: this.table }, { responseType: 'blob' });
                const { status, data } = response;
                const href = window.URL.createObjectURL(new Blob([data]))
                const link = document.createElement('a')
                link.href = href
                link.setAttribute('download', 'fileName.xlsx');
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
            catch (e) { console.log(e) }
        },
        sendConsigmentBoxBerry() {
            console.log('sendConsigmentBoxBerry')
        },
        async getFilterData() {
            try {
                const response = await axios.get('http://localhost:5000/getFilterData');
                this.metadata = response.data.metadata
                this.projects = response.data.projects
            }
            catch (e) { console.log(e) }
        },
    },
    mounted() {
        this.getFilterData()
    }
}

</script>

<template>
    <div class="App">
        <div class="search">
            <MultiSelect v-model="selectedProjects" :options="projects" filter optionLabel="name"
                placeholder="Выберите проект" :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <MultiSelect v-model="selectedMetadata" :options="metadata" filter optionLabel="name"
                placeholder="Выберите статус" :maxSelectedLabels="3" class="prime__multiselect w-full md:w-20rem" />
            <Button type="button" label="Найти" icon="pi pi-search" class="prime__button" :loading="loading"
                @click="postSelectedFilters" />
        </div>
        <div class="orders block-table" v-if="table.length > 0">
            <div class="title">Заказы покупателей</div>
            <DataTable v-model:expandedRows="expandedRows" v-model:editingRows="selectedOrder" :value="table"
                dataKey="phone" tableClass="editable-cells-table" editMode="row" @row-edit-save="onRowEditSave"
                tableStyle="min-width: 100%">
                <Column expander style="width: 5rem" />
                <Column field="fio" header="ФИО">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="phone" header="Номер телефона">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="dataPackage" header="Дата посылки (ГГГГММДД)">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="typeTransfer" header="Вид доставки">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="deliverySum" header="Стоимость доставки">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="paySum" header="Сумма к оплате"></Column>
                <Column field="departurePointCode" header="Код пункта поступления">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="codePWZ" header="Код ПВЗ">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="weightPackage" header="Вес 1-ого места">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <template #expansion="orders">
                    <div class="p-3">
                        <h5>Заказы {{ orders.data.fio }}</h5>
                        <DataTable :value="orders.data.orders" v-model:editingRows="selectedOrder" dataKey="number"
                            tableClass="editable-cells-table" editMode="row" @row-edit-save="onSubRowEditSave"
                            tableStyle="min-width: 100%">
                            <Column field="number" header="Номер заказа в ИМ">
                                <template #editor="{ data, field }">
                                    <InputText v-model="data[field]" />
                                </template>
                            </Column>
                            <Column field="declaredSum" header="Объявленная стоимость">
                                <template #editor="{ data, field }">
                                    <InputText v-model="data[field]" />
                                </template>
                            </Column>
                            <Column field="dataTransfer" header="Дата передачи ЗП">
                                <template #editor="{ data, field }">
                                    <InputText v-model="data[field]" />
                                </template>
                            </Column>
                            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                            </Column>
                        </DataTable>
                    </div>
                </template>
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            </DataTable>
            <div class="consigment__button">
                <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button"
                    @click="downloadConsigmentExcel()" />
                <Button type="button" label="Отправить в BoxBerry" icon="pi pi-search" class="prime__button"
                    @click="sendConsigmentBoxBerry" />
            </div>
        </div>
    </div>
</template>

<style>
.App {
    display: flex;
    flex-direction: column;
    gap: 55px;
    min-width: 100%;
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
