<template>
    <div class="table" v-if="orders">
        <Row class="row_header">
            <Column></Column>
            <Column>№</Column>
            <Column>Номер заказа</Column>
            <Column>Проект</Column>
            <Column>ФИО</Column>
            <Column>Телефон</Column>
            <Column align="right">Сумма заказа</Column>
            <Column>Комментарий</Column>
            <Column>Дата посылки (ГГГГММДД)</Column>
            <Column align="center">Вид доставки</Column>
            <Column align="right">Стоимость доставки</Column>
            <Column align="right">Оплата доставки</Column>
            <Column align="right">Объявленная стоимость</Column>
            <Column align="center">Код пункта поступления</Column>
            <Column align="center">Код ПВЗ</Column>
            <Column>Вес 1 места (грамм)</Column>
            <Column>Текст Ошибки</Column>
            <Column></Column>
            <Column></Column>
        </Row>
        <template v-for="(item, index) in orders" :key="item.id">
            <Row :class="{ 'row_open row_bold': item.show, [className(item)]: item.reqStatus }">
                <Column :class="{ 'column_icon': item.orders.length > 1 }">
                    <ArrowRightIcon v-if="item.orders.length > 1" :class="{ 'arrow-bottom': item.show }"
                        @click="() => toggleRow(item)" />
                </Column>
                <Column>{{ index + 1 }}</Column>
                <Column>
                    {{ item.numberOrder }}
                </Column>
                <Column>{{ item.project }}</Column>
                <Column>{{ item.fio }}</Column>
                <Column>{{ item.phone }}</Column>
                <Column align="right">{{ summarizeAmount(item.orders) }}</Column>
                <Column>{{ item.comment }}</Column>
                <Column>
                    <span v-if="!item.isEdit">{{ item.dataPackage }}</span>
                    <input v-else v-model="item.dataPackage" class="table__input" />
                </Column>
                <Column align="center">
                    <span v-if="!item.isEdit">{{ item.typeTransfer }}</span>
                    <input v-else v-model="item.typeTransfer" class="table__input" />
                </Column>
                <Column align="right">{{ item.deliverySum }}</Column>
                <Column align="right">
                    <span v-if="!item.isEdit">{{ item.paySum }}</span>
                    <input v-else v-model="item.paySum" class="table__input" />
                </Column>
                <Column align="right">{{ summarizeDeclared(summarizeAmount(item.orders)) }}</Column>
                <Column align="center">
                    <span v-if="!item.isEdit">{{ item.departurePointCode }}</span>
                    <input v-else v-model="item.departurePointCode" class="table__input" />
                </Column>
                <Column align="center">
                    <span v-if="!item.isEdit">{{ item.codePWZ }}</span>
                    <input v-else v-model="item.codePWZ" class="table__input" />
                </Column>
                <Column>
                    <span v-if="!item.isEdit">{{ item.weightPackage }}</span>
                    <input v-else v-model="item.weightPackage" class="table__input" />
                </Column>
                <Column>{{ item.reqStatus }}</Column>
                <Column align="center" class="column_icon">
                    <EditIcon v-if="!item.isEdit" @click="() => toggleEditRow(index)" />
                    <SaveIcon v-else @click="() => toggleEditRow(index)" />
                </Column>
                <Column align="center" class="column_icon">
                    <DeleteIcon @click="() => removeItem(index)" />
                </Column>
            </Row>
            <template v-if="item.orders.length > 1 && item.show">
                <Row v-for="(row, subIndex) in item.orders" :key="index + row.id" :class="{ 'row_open': item.show }">
                    <Column></Column>
                    <Column>{{ subIndex + 1 }}</Column>
                    <Column>{{ row.numberOrder }}</Column>
                    <Column>{{ row.project }}</Column>
                    <Column>{{ row.fio }}</Column>
                    <Column>{{ row.phone }}</Column>
                    <Column align="right">{{ row.sumOrder }}</Column>
                    <Column>{{ row.comment }}</Column>
                    <Column align="center">-</Column>
                    <Column align="center">-</Column>
                    <Column align="right">-</Column>
                    <Column align="right">-</Column>
                    <Column align="right">-</Column>
                    <Column align="center">{{ row.departurePointCode }}</Column>
                    <Column align="center">{{ row.codePWZ }}</Column>
                    <Column>{{ row.weightPackage }}</Column>
                    <Column></Column>
                    <Column align="center"></Column>
                    <Column align="center" class="column_icon">
                        <DeleteIcon @click="() => removeItem(index, subIndex)" />
                    </Column>
                </Row>
            </template>
        </template>
    </div>
</template>

<script setup>
import Row from './Row/Row.vue';
import Column from './Column/Column.vue';
import { ArrowRightIcon, DeleteIcon, EditIcon, SaveIcon } from '../Icons';
import { useApp } from '../../hooks/useApp';
const { orders } = useApp;

function toggleRow(row) {
    row.show = !row.show;
}
function removeItem(index, subIndex = null) {
    if (subIndex !== null) {
        const deleted = orders.value[index].orders.splice(subIndex, 1);
        if (orders.value[index].id === deleted[0].id) {
            // Если удалили из заказов, тот, который основной, то основной должны изменить
            Object.keys(orders.value[index].orders[0]).map(key => {
                orders.value[index][key] = orders.value[index].orders[0][key];
            })
        }
        if (orders.value[index].orders.length === 1) {
            orders.value[index].show = false;
        }
        return;
    }
    orders.value.splice(index, 1);
}
function toggleEditRow(index, subIndex = null) {
    if (subIndex !== null) {
        return orders.value[index].orders[subIndex].isEdit = !orders.value[index].orders[subIndex].isEdit;
    }
    return orders.value[index].isEdit = !orders.value[index].isEdit;
}

function summarizeAmount(array) {
    if (array.length > 1) {
        return array.reduce((pre, cur) => {
            return pre += cur.sumOrder;
        }, 0)
    }
    return array[0].sumOrder;
}
function summarizeDeclared(amount) {
    return amount > 10000 ? amount : 5;
}
function className(item) {
    if (!item.reqStatus) return null;
    return item.reqStatus == "Ок" ? 'succefully' : 'warning'
}
</script>

<style lang="scss" scoped>
.table {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__input {
        width: 100%;
        border: 1px solid gray;
        border-radius: 4px;
        height: 25px;

    }
}

.arrow-bottom {
    transform: rotate(90deg);
}

.succefully {
    background-color: #00C200;
}

.warning {
    background-color: #FF5555;
}
</style>