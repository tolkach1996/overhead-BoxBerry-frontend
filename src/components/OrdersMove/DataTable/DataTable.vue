<template>
    <div class="page-table">
        <div class="page-table__header page-table__row">
            <div class="page-table__col">№ заказа</div>
            <div class="page-table__col">Дата заказа</div>
            <div class="page-table__col">Контрагент</div>
            <div class="page-table__col">Сумма</div>
            <div class="page-table__col">Проект</div>
            <div class="page-table__col">Склад</div>
            <div class="page-table__col">Дата операции</div>
        </div>
        <div class="page-table__row" v-for="item in data" :key="item.id">
            <div class="page-table__col">
                <router-link class="page-table__link" :to="{ name: ROUTES_NAME.ORDER, params: { id: item.idMoysklad } }">{{ item.id }}</router-link>
            </div>
            <div class="page-table__col">{{ formatDate(item.date) }}</div>
            <div class="page-table__col">{{ item.client.name }}</div>
            <div class="page-table__col page-table__col_right">{{ item.summa }}</div>
            <div class="page-table__col">{{ item?.project?.name || '-' }}</div>
            <div class="page-table__col">{{ item?.stock?.name || '-' }}</div>
            <div class="page-table__col">{{ formatExpiredTime(item.dateMove) }}</div>
        </div>
    </div>
</template>

<script setup>
    import { formatDate, formatExpiredTime } from '@/helpers/formatter';
    import { ROUTES_NAME } from '@/constants/routesName';
    defineProps({
        data: { type: Array, default: () => [] }
    })
</script>

<style lang="scss" scoped>
    .page {
        &-table {
            display: flex;
            flex-direction: column;

            &__row {
                display: grid;
                grid-template-columns: 1fr 1fr 2fr repeat(4, 1fr);
                border-bottom: 1px solid #BFCFE0;
                background: #FFF;
            }
            &__col {
                padding: 10px 24px;
                font-size: 14px;
                display: flex;
                align-items: center;

                &_right {
                    justify-content: flex-end;
                }
            }
            &__link {
                text-decoration: none;
                color: #126CF3;
                cursor: pointer;
                font-weight: bold;

                &:hover {
                    text-decoration: underline;
                }
            }
            &__header {
                .page-table__col {
                    padding: 4px 16px;
                    color: #545454;
                    font-weight: bold;
                }
            }
        }
    }
</style>