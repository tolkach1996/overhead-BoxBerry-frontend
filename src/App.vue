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
            Orders: this.store.Orders,
            selectedOrders: [],
            selectedProduct: [],
            toggleOrders: false,
            toggleProductConsigment: false,
            urlDownload: ''
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
        },
        async downloadConsigmentExcel(selectedProduct) {
            try {
                const response = await axios.post('http://localhost:5000/downloadConsigmentExcel', { data: selectedProduct }, { responseType: 'blob' });
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


            /*await axios.post('http://localhost:5000/downloadConsigmentExcel', {
                data: selectedProduct
            })
                .then((res) => {
                    //console.log(res)
                    let test = res.data
                    //console.log(test)
                    //let blob = new Blob(test, { type: 'excel/xlsx' })
                    //console.log(blob)
                    let url = URL.createObjectURL(test)
                    console.log(url)
                })
                .catch(function (error) { console.log(error) });*/
        },
        sendConsigmentBoxBerry() {
            console.log('sendConsigmentBoxBerry')
        },
        async getFilterData() {
            try {
                const response = await axios.get('http://localhost:5000/getFilterData');
                //const { data, project } = response;
                console.log(response)
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
            </DataTable>
            <div class="consigment__button">
                <Button type="button" label="Скачать Excel" icon="pi pi-search" class="prime__button"
                    @click="downloadConsigmentExcel(selectedProduct)" />
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
