<template>
    <Table v-if="orders">
        <Row class="row_header">
            <Column><input type="checkbox" v-model="selectedAllModel"></Column>
            <Column></Column>
            <Column>№</Column>
            <Column>Номер заказа</Column>
            <Column>Проект</Column>
            <Column>ФИО</Column>
            <Column>Телефон</Column>
            <Column align="right">Сумма заказа</Column>
            <Column>Комментарий</Column>
            <Column>Дата посылки</Column>
            <Column align="center">Вид доставки</Column>
            <Column align="center">Вскрытие получаетелем</Column>
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
                <Column><input type="checkbox" v-model="item.selected"></Column>
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
                <Column align="center">{{ item.openingStatus ? 'Да' : 'Нет' }}</Column>
                <Column align="right">{{ item.deliverySum }}</Column>
                <Column align="right">
                    <span v-if="!item.isEdit">{{ item.paySum }}</span>
                    <input v-else v-model="item.paySum" class="table__input" />
                </Column>
                <Column align="right">{{ summarizeDeclared(summarizeAmount(item.orders), item.declaredStatus) }}</Column>
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
                    <!-- <DeleteIcon @click="() => removeItem(index)" /> -->
                    <span class="pi pi-ellipsis-h icon" @click.stop="(e) => openMenu(e, index)"></span>
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
    </Table>

    <div class="table-menu" v-if="menuParams.isOpen" ref="menuRef" :style="styleMenu">
        <div class="table-menu__item" @click="toggleDeclaredStatus">
            <span class="table-menu__icon pi" :class="{ 'pi-times': !menuParams.declaredStatus, 'pi-check': menuParams.declaredStatus }"></span>
            <span>Объявленная стоимость</span>
        </div>
        <div class="table-menu__item" @click="toggleOpeningStatus">
            <span class="table-menu__icon pi" :class="{ 'pi-times': !menuParams.openingStatus, 'pi-check': menuParams.openingStatus }"></span>
            <span>Вскрытие при получении</span>
        </div>
        <div class="table-menu__split"></div>
        <div class="table-menu__item table-menu__item_trash" @click="removeItemFromMenu">
            <span class="table-menu__icon pi pi-trash"></span>
            <span>Удалить</span>
        </div>
    </div>
</template>

<script setup>
    import clickOutside from '../directives/clickOutside';
    import { Table, Row, Column } from './Table';
    import { ArrowRightIcon, DeleteIcon, EditIcon, SaveIcon } from './Icons';
    import { useApp } from '../hooks/useApp';
    import { ref, watch, reactive, computed } from 'vue';
    const { orders } = useApp;

    const selectedAllModel = ref(false);
    const menuRef = ref(null);

    const indexMenuRow = ref(-1);

    const menuParams = reactive({
        declaredStatus: computed(() => indexMenuRow.value > -1 && orders.value[indexMenuRow.value]?.declaredStatus),
        openingStatus: computed(() => indexMenuRow.value > -1 && orders.value[indexMenuRow.value]?.openingStatus),
        coordinates: {
            x: 0,
            y: 0
        },
        isOpen: false,
    })

    const styleMenu = computed(() => {
        return {
            'top': `${menuParams.coordinates.y}px`,
            'left': `${menuParams.coordinates.x - menuRef?.value?.offsetWidth + 24}px`
        }
    })

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
    function summarizeDeclared(amount, status) {
        if (status) return amount;
        return amount > 10000 ? amount : 5;
    }
    function className(item) {
        if (!item.reqStatus) return null;
        return item.reqStatus == "Ок" ? 'succefully' : 'warning'
    }

    function openMenu(e, index) {

        const coords = e.target.getBoundingClientRect();

        menuParams.coordinates.x = coords.x;
        menuParams.coordinates.y = coords.y;

        menuParams.isOpen = true;

        indexMenuRow.value = index;
    }
    function closeMenu() {
        menuParams.isOpen = false;
    }
    function toggleDeclaredStatus() {
        orders.value[indexMenuRow.value].declaredStatus = !orders.value[indexMenuRow.value].declaredStatus;
    }
    function toggleOpeningStatus() {
        orders.value[indexMenuRow.value].openingStatus = !orders.value[indexMenuRow.value].openingStatus;
    }
    function removeItemFromMenu() {
        removeItem(indexMenuRow);
        closeMenu();
    }

    watch(selectedAllModel, (value) => {
        orders.value = orders.value.map(item => {
            item.selected = value;
            return item;
        })
    })

    clickOutside(menuRef, closeMenu);

</script>

<style lang="scss" scoped>
    .icon {
        min-width: 24px;
        height: 24px;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table-menu {
        position: absolute;
        width: auto;
        background-color: white;
        box-shadow: 0px 0px 3px 0px gray;
        padding: 7px 0px;
        z-index: 999;
        user-select: none;

        &__item {
            width: 100%;
            color: rgb(41, 41, 41);
            padding: 8px 10px;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;

            opacity: 0.75;

            &_trash {
                color: rgba(255, 0, 0);
            }

            &:hover {
                opacity: 1;
                background-color: rgb(235, 235, 235);
            }
        }
        &__split {
            width: 100%;
            margin: 10px 0px;
            border-bottom: 1px solid lightgray;
        }
    }
</style>