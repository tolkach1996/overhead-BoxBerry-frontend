<script >
import String from './String.vue';

export default {
    components: { String },
    data() {
        return {
            test: [{
                index: '1',
                fio: 'Сапрыкина Ирина Сергеевна',
                phone: '79032838889',
                number: 's952',
                dataPackage: '20230730',
                typeTransfer: '1',
                sum: 2320,
                deliverySum: 189.2,
                paySum: 200,
                departurePointCode: '010',
                codePWZ: '50221',
                weightPackage: '3000',
                reqStatus: '',
                orders: [{
                    fio: 'Сапрыкина Ирина Сергеевна',
                    number: 's95211',
                    project: 'РЕМИНИ2',
                    declaredSum: 1111,
                    dataTransfer: '20230730'
                }, {
                    fio: 'Сапрыкина Ирина Сергеевна',
                    number: 's952',
                    project: 'РЕМИНИ2',
                    declaredSum: 2320,
                    dataTransfer: '20230730'
                }]
            },
            {
                fio: 'Жемчужникова Светлана Николаевна',
                phone: '79165469151',
                number: 's895',
                dataPackage: '20230730',
                typeTransfer: '1',
                sum: 1160,
                deliverySum: 237.2,
                paySum: 250,
                departurePointCode: '010',
                codePWZ: '01423',
                weightPackage: '3000',
                reqStatus: '',
                index: '2',
                orders: [{
                    fio: 'Жемчужникова Светлана Николаевна',
                    number: 's895',
                    project: 'РЕМИНИ2',
                    declaredSum: 1160,
                    dataTransfer: '20230730'
                }]
            },
            {
                fio: 'Тришина Виктория Алексеевна',
                phone: '79262871680',
                number: 's822',
                dataPackage: '20230730',
                typeTransfer: '1',
                sum: 1232,
                deliverySum: 189.2,
                paySum: 200,
                departurePointCode: '010',
                codePWZ: '00981',
                weightPackage: '3000',
                reqStatus: '',
                index: '3',
                orders: [{
                    fio: 'Тришина Виктория Алексеевна',
                    number: 's822',
                    project: 'РЕМИНИ2',
                    declaredSum: 1232,
                    dataTransfer: '20230730'
                }]
            },
            {
                index: '4',
                fio: 'Медведева Елена Николаевна',
                phone: '79649983096',
                number: 's818',
                dataPackage: '20230730',
                typeTransfer: '1',
                sum: 1232,
                deliverySum: 242,
                paySum: 250,
                departurePointCode: '010',
                codePWZ: '03179',
                weightPackage: '3000',
                reqStatus: '',
                orders: [{
                    fio: 'Медведева Елена Николаевна',
                    number: 's818',
                    project: 'РЕМИНИ2',
                    declaredSum: 1232,
                    dataTransfer: '20230730'
                }]
            },
            {
                index: '5',
                fio: 'Богданова  Светлана  Геннадьевна',
                phone: '79299579138',
                number: 's819',
                dataPackage: '20230730',
                typeTransfer: '1',
                sum: 1232,
                deliverySum: 189.2,
                paySum: 200,
                departurePointCode: '010',
                codePWZ: '00180',
                weightPackage: '3000',
                reqStatus: '',
                /*orders: [{
                    fio: 'Богданова  Светлана  Геннадьевна',
                    number: 's819',
                    project: 'РЕМИНИ2',
                    declaredSum: 1232,
                    dataTransfer: '20230730'
                }]*/
            }],
        }
    },
    props: {
        table: {
            type: Array
        },
    },
    methods: {
        deliteOrder(String) {
            this.test = this.test.filter(item => item.index !== String.index)
            let i = 1
            for (let item of this.test) {
                item.index = i
                i++
            }
            /*
                        this.test.find(item => item.index == this.good.index){

                        }
                        this.$emit('deliteOrder', this.String)*/
        }
    }
}

</script>

<template>
    <table>
        <tr>
            <th>Допзаказы</th>
            <th>№</th>
            <th>ФИО</th>
            <th>Номер телефона</th>
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
            <th>Удалить</th>
        </tr>
        <String v-for="String of test" :String="String" @deliteOrder="deliteOrder"></String>
        <!--<tr v-for="item of this.test">
            <td>Допзаказы</td>
            <td>{{ item.index }}</td>
            <td>{{ item.fio }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.sum }}</td>
            <td>{{ item.dataPackage }}</td>
            <td>{{ item.typeTransfer }}</td>
            <td>{{ item.deliverySum }}</td>
            <td>{{ item.paySum }}</td>
            <td>{{ item.departurePointCode }}</td>
            <td>{{ item.codePWZ }}</td>
            <td>{{ item.weightPackage }}</td>
            <td>{{ item.reqStatus }}</td>
            <td>Удалить</td>
        </tr>-->
    </table>
</template>

<style></style>
