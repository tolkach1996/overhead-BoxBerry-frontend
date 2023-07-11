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
            metadata: [],
            projects: [],
            selectedMetadata: [],
            selectedProjects: [],
            table: [],
            selectedOrder: []
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
            //console.log(event.data)
            let { newData, index } = event;
            console.log(newData)
            console.log(index)
            this.table[index] = newData;
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
        }
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
            <DataTable v-model:editingRows="selectedOrder" :value="table" editMode="row" dataKey="number"
                @row-edit-save="onRowEditSave" tableClass="editable-cells-table" tableStyle="min-width: 50rem">
                <Column field="dataPackage" header="Дата посылки (ГГГГММДД)">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
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
                <Column field="paySum" header="Сумма к оплате">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="deliverySum" header="Стоимость доставки">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="dataTransfer" header="Дата передачи ЗП">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="typeTransfer" header="Вид доставки">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="codePWZ" header="Код ПВЗ">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="departurePointCode" header="Код пункта поступления">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
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
                <Column field="weightPackage" header="Вес 1-ого места">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            </DataTable>




            <!--<DataTable editMode="cell" v-model:selection="selectedProduct" :value="table" dataKey="name"
                tableStyle="min-width: 50rem" class="prime-table" @cell-edit-complete="onCellEditComplete">
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="dataPackage" header="Дата посылки (ГГГГММДД)"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="number" header="Номер заказа в ИМ"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="declaredSum" header="Объявленная стоимость"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="paySum" header="Сумма к оплате"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="deliverySum" header="Стоимость доставки"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="dataTransfer" header="Дата передачи ЗП"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="typeTransfer" header="Вид доставки"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="codePWZ" header="Код ПВЗ"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="departurePointCode" header="Код пункта поступления"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="fio" header="ФИО"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
                <Column field="phone" header="Номер телефона"><template #editor="slotProps">
                        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
                    </template></Column>
            </DataTable>-->
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
