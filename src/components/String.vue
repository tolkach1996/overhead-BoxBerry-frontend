<script >
export default {
    data() {
        return {
            showSubTable: false
        }
    },
    props: {
        String: {
            type: Object
        },
    },
    methods: {
        deliteOrder() {
            this.$emit('deliteOrder', this.String)
        },
        toggleShowSubTable() {
            this.showSubTable = !this.showSubTable
        }
    }
}

</script>

<template>
    <tr v-if="!this.String.orders">
        <td>
        </td>
        <td>{{ this.String.index }}</td>
        <td>{{ this.String.fio }}</td>
        <td>{{ this.String.phone }}</td>
        <td>{{ this.String.number }}</td>
        <td>{{ this.String.sum }}</td>
        <td>{{ this.String.dataPackage }}</td>
        <td>{{ this.String.typeTransfer }}</td>
        <td>{{ this.String.deliverySum }}</td>
        <td>{{ this.String.paySum }}</td>
        <td>{{ this.String.departurePointCode }}</td>
        <td>{{ this.String.codePWZ }}</td>
        <td>{{ this.String.weightPackage }}</td>
        <td>{{ this.String.reqStatus }}</td>
        <td><img @click="deliteOrder" src="../assets/close.svg" alt=""></td>
    </tr>
    <tr v-if="this.String.orders">
        <td>
            <img @click="toggleShowSubTable" v-if="!showSubTable" src="../assets/arrowRight.svg" alt="">
            <img @click="toggleShowSubTable" v-if="showSubTable" src="../assets/arrowDown.svg" alt="">
        </td>
        <td>{{ this.String.index }}</td>
        <td>{{ this.String.fio }}</td>
        <td>{{ this.String.phone }}</td>
        <td>{{ this.String.number }}</td>
        <td>{{ this.String.sum }}</td>
        <td>{{ this.String.dataPackage }}</td>
        <td>{{ this.String.typeTransfer }}</td>
        <td>{{ this.String.deliverySum }}</td>
        <td>{{ this.String.paySum }}</td>
        <td>{{ this.String.departurePointCode }}</td>
        <td>{{ this.String.codePWZ }}</td>
        <td>{{ this.String.weightPackage }}</td>
        <td>{{ this.String.reqStatus }}</td>
        <td><img @click="deliteOrder" src="../assets/close.svg" alt=""></td>
    </tr>
    <tr v-if="showSubTable">
        <th></th>
        <th colspan="2">Номер Заказа</th>
        <th colspan="2">Проект</th>
        <th colspan="2">Сумма</th>
        <th colspan="2">Дата отправки</th>
    </tr>
    <tr v-for="item of this.String.orders" v-if="showSubTable">
        <th></th>
        <td colspan="2">{{ item.number }}</td>
        <td colspan="2">{{ item.project }}</td>
        <td colspan="2">{{ item.declaredSum }}</td>
        <td colspan="2">{{ item.dataTransfer }}</td>
    </tr>
</template>

<style>
img {
    width: 50px;
    height: 50px;
}

td {
    text-align: center;
}
</style>
