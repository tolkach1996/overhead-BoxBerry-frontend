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
            this.showSubTable = false
        },
        toggleShowSubTable() {
            this.showSubTable = !this.showSubTable
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
        },
        changeСell(event) {
            console.log(event.target)
        }
    },
    computed: {
        className() {
            if (!this.String.reqStatus) return null;
            return this.String.reqStatus == "Ок" ? 'succefully' : 'warning'
        }
    }
}

</script>

<template>
    <tr v-if="this.String.orders.length < 2" :class="className">
        <td>
        </td>
        <td>{{ this.String.index }}</td>
        <td @dblclick="changeСell">{{ this.String.fio }}</td>
        <td>{{ this.String.phone }}</td>
        <td>{{ this.String.orders[0].project }}</td>
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
    <tr v-else :rowStyle="rowStyle">
        <td>
            <img @click="toggleShowSubTable" v-if="!showSubTable" src="../assets/arrowRight.svg" alt="">
            <img @click="toggleShowSubTable" v-if="showSubTable" src="../assets/arrowDown.svg" alt="">
        </td>
        <td>{{ this.String.index }}</td>
        <td>{{ this.String.fio }}</td>
        <td>{{ this.String.phone }}</td>
        <td>{{ this.String.orders[0].project }}</td>
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
        <th class="th-white"></th>
        <th colspan="2">Номер Заказа</th>
        <th colspan="2">Проект</th>
        <th colspan="2">Сумма</th>
        <th colspan="2">Дата отправки</th>
    </tr>
    <tr v-for="item of this.String.orders" v-if="showSubTable">
        <th class="th-white"></th>
        <td colspan="2">{{ item.number }}</td>
        <td colspan="2">{{ item.project }}</td>
        <td colspan="2">{{ item.declaredSum }}</td>
        <td colspan="2">{{ item.dataTransfer }}</td>
    </tr>
</template>

<style scoped>
.succefully {
    background-color: #00C200;
    color: white;
}

.warning,
.warning td {
    background-color: #FF5555;
}

.th-white {
    background-color: #fff;
}
</style>
