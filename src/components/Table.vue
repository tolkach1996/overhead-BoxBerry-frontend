<script>
import Actions from "./Actions.vue";
import { downloadConsigmentExcel, sendConsigmentBoxBerry } from "../api/Service"

export default {
    components: { Actions },
    props: {
        table: {
            type: Array
        },
    },
    data() {
        return {
            selectedOrder: [],
            expandedRows: [],
        }
    },
    methods: {
        onRowEditSave(event) {
            let { newData, index } = event;
            this.table[index] = newData;
        },
        onSubRowEditSave(event) {
            let { newData, index } = event;
            for (let item of this.table) {
                if (item.fio == newData.fio) item.orders[index] = newData
            }
        },
        async loadConsigmentExcel() {
            try {
                const data = await downloadConsigmentExcel(this.table);
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
        async pushConsigmentBoxBerry() {
            try {
                const res = await sendConsigmentBoxBerry(this.table)
                console.log(res)
            }
            catch (e) { console.log(e) }
        },
    },
}
</script>

<template>
    <div class="table" v-if="table.length > 0">
        <div class="title">Заказы покупателей</div>
        <DataTable v-model:expandedRows="expandedRows" v-model:editingRows="selectedOrder" :value="table" dataKey="phone"
            tableClass="editable-cells-table" editMode="row" @row-edit-save="onRowEditSave" tableStyle="min-width: 100%">
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
        <Actions @loadConsigmentExcel="loadConsigmentExcel" @pushConsigmentBoxBerry="pushConsigmentBoxBerry">
        </Actions>
    </div>
</template>

<style></style>