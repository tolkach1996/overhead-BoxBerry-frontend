<script>
import Actions from "./Actions.vue";
import { downloadConsigmentExcel, sendConsigmentBoxBerry } from "../api/Service";

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
            loadingDownloadExcel: false,
            loadingSendBoxberry: false,
            ordersTable: [],
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
                if (item.fio == newData.fio) item.orders[index] = newData;
            }
        },
        async loadConsigmentExcel() {
            this.loadingDownloadExcel = true;
            try {
                const data = await downloadConsigmentExcel(this.table);
                const href = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'fileName.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
            catch (e) { console.log(e) }
            this.loadingDownloadExcel = false;
        },
        async pushConsigmentBoxBerry() {
            this.loadingSendBoxberry = true;
            for (let item of this.table) {
                item.reqStatus = ''
            }
            try {
                const res = await sendConsigmentBoxBerry(this.table);
                let index = 0;
                for (let item of this.table) {
                    if (res[index].res == 'Ок') {
                        item.reqStatus = res[index].res
                    }
                    else {
                        item.reqStatus = res[index].err
                    }
                    index++;
                }
                console.log(this.table);
            }
            catch (e) {
                this.$emit('swithModalError')
            }
            finally {
                this.loadingSendBoxberry = false;
            }
        },
        rowStyle(item) {
            if (item.reqStatus) {
                if (item.reqStatus == 'Ок') {
                    return {
                        'background-color': '#00C200', 'color': 'white'
                    }
                }
                else return { 'background-color': '#FF5555' }
            }
        }
    }
}

</script>

<template>
    <div class="table" v-if="table.length > 0">
        <div class="title">Заказы покупателей</div>
        <DataTable v-model:expandedRows="expandedRows" v-model:editingRows="selectedOrder" :value="table" dataKey="phone"
            scrollable tableClass="editable-cells-table" editMode="row" @row-edit-save="onRowEditSave"
            tableStyle="min-width: 100%" :rowStyle="rowStyle">
            <Column expander />
            <Column field="fio" header="ФИО">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile1" v-model="data[field]" />
                </template>
            </Column>
            <Column field="phone" header="Номер телефона">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile2" v-model="data[field]" />
                </template>
            </Column>
            <Column field="dataPackage" header="Дата посылки (ГГГГММДД)">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile3" v-model="data[field]" />
                </template>
            </Column>
            <Column field="typeTransfer" header="Вид доставки">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile4" v-model="data[field]" />
                </template>
            </Column>
            <Column field="deliverySum" header="Стоимость доставки">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile3" v-model="data[field]" />
                </template>
            </Column>
            <Column field="paySum" header="Сумма к оплате"></Column>
            <Column field="departurePointCode" header="Код пункта поступления">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile3" v-model="data[field]" />
                </template>
            </Column>
            <Column field="codePWZ" header="Код ПВЗ">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile3" v-model="data[field]" />
                </template>
            </Column>
            <Column field="weightPackage" header="Вес 1-ого места">
                <template #editor="{ data, field }">
                    <InputText class="table-input-stile3" v-model="data[field]" />
                </template>
            </Column>
            <Column field="reqStatus" header="Текст Ошибки">
            </Column>
            <template #expansion="orders">
                <div class="p-3">
                    <h5>Заказы {{ orders.data.fio }}</h5>
                    <DataTable :value="orders.data.orders" v-model:editingRows="selectedOrder" dataKey="number"
                        tableClass="editable-cells-table" editMode="row" @row-edit-save="onSubRowEditSave"
                        tableStyle="min-width: 100%">
                        <Column field="number" header="Номер заказа в ИМ">
                            <template #editor="{ data, field }">
                                <InputText class="table-input-stile3" v-model="data[field]" />
                            </template>
                        </Column>
                        <Column field="declaredSum" header="Объявленная стоимость">
                            <template #editor="{ data, field }">
                                <InputText class="table-input-stile3" v-model="data[field]" />
                            </template>
                        </Column>
                        <Column field="dataTransfer" header="Дата передачи ЗП">
                            <template #editor="{ data, field }">
                                <InputText class="table-input-stile3" v-model="data[field]" />
                            </template>
                        </Column>
                        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                        </Column>
                    </DataTable>
                </div>
            </template>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
        <Actions @loadConsigmentExcel="loadConsigmentExcel" @pushConsigmentBoxBerry="pushConsigmentBoxBerry"
            :loadingDownloadExcel="loadingDownloadExcel" :loadingSendBoxberry="loadingSendBoxberry">
        </Actions>
    </div>
</template>

<style></style>