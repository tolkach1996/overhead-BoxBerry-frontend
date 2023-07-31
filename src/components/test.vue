<script >
import String from './String.vue';
import Actions from "./Actions.vue";
import { downloadConsigmentExcel, sendConsigmentBoxBerry } from "../api/Service";

export default {
    components: { String, Actions },
    props: {
        table: {
            type: Array
        },
    },
    methods: {
        deliteOrder(String) {
            this.$emit('deliteOrder', String)
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
    }
}

</script>

<template>
    <table>
        <tr>
            <th></th>
            <th>№</th>
            <th>ФИО</th>
            <th>Номер телефона</th>
            <th>Проект</th>
            <th>Номер Заказа</th>
            <th>Общая стоимость</th>
            <th>Дата посылки (ГГГГММДД)</th>
            <th>Вид доставки</th>
            <th>Стоимость доставки</th>
            <th>Сумма к оплате</th>
            <th>Код пункта поступления</th>
            <th>Код ПВЗ</th>
            <th>Вес 1-ого места</th>
            <th>Текст Ошибки</th>
            <th></th>
        </tr>
        <String v-for="String of table" :String="String" @deliteOrder="deliteOrder"></String>
    </table>
    <Actions @loadConsigmentExcel="loadConsigmentExcel" @pushConsigmentBoxBerry="pushConsigmentBoxBerry"
        :loadingDownloadExcel="loadingDownloadExcel" :loadingSendBoxberry="loadingSendBoxberry">
    </Actions>
</template>

<style></style>
