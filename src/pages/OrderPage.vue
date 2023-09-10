<template>
    <template v-if="order">
        <h1>Информация о заказе</h1>
        <div class="order">
            <div class="order__column order__column_size_fixed">
                <div class="card">
                    <span class="card__name">Клиент</span>
                    <div class="user">
                        <div class="user__avatar"></div>
                        <div class="user-info">
                            <div class="user-info__name">{{ order.agent?.name }}</div>
                            <div class="user-info__phone">{{ formatPhone(order.agent?.phone) }}</div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-order__header">
                        <div class="card-order__row card-order__row_vertical">
                            <div class="card-order__title">Заказ №</div>
                            <div class="card-order__num-status">
                                <span class="card-order__number">{{ order.name }}</span>
                                <div class="card-order__status">{{ order.state?.name }}</div>
                            </div>
                        </div>
                        <div class="card-order__row">
                            <div class="card-order__sub-title">Дата заказа: <b>{{ formatDate(order?.created) }}</b></div>
                        </div>
                        <div class="card-order__row">
                            <div class="card-order__sub-title">Склад: <b>{{ order?.store?.name || 'нет' }}</b></div>
                        </div>
                        <div class="card-order__row">
                            <div class="card-order__sub-title">Проект: <b>{{ order?.project?.name || 'нет' }}</b></div>
                        </div>
                    </div>
                    <div class="card-order__comment">
                        <div class="card-order__title">Комментарий</div>
                        <div class="card-order__text">{{ order.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="order__column">
                <div class="order-table">
                    <div class="order-table__row order-table__row_header">
                        <div class="order-table__col">Наименование товара</div>
                        <div class="order-table__col order-table__col_align_right">Стоимость</div>
                        <div class="order-table__col order-table__col_align_center">Количество</div>
                        <div class="order-table__col order-table__col_align_right">Сумма</div>
                    </div>
                    <div class="order-table__row" v-for="item in order.positions?.rows" :key="item.id">
                        <div class="order-table__col">{{ item.assortment?.name }}</div>
                        <div class="order-table__col order-table__col_align_right">{{ formatPrice((item?.price || 0) / 100) }}</div>
                        <div class="order-table__col order-table__col_align_center">{{ item?.quantity }}</div>
                        <div class="order-table__col order-table__col_align_right">{{ formatPrice(sumProduct(item)) }}</div>
                    </div>
                </div>
                <div class="order__summary">
                    <span>ИТОГО</span>
                    <span>{{ formatPrice(sumProducts) }}</span>
                </div>
            </div>
        </div>
    </template>
    <template v-else-if="!order && !loading">
        <OrderNotFound />
    </template>
    <template v-if="loading">
        <Loader />
    </template>
</template>

<script setup>
    import OrderNotFound from '@/components/Order/OrderNotFound.vue';
    import { formatPhone, formatDate, formatPrice } from '@/helpers/formatter';
    import Loader from '@/components/Loader/Loader.vue';
    import { computed, onMounted } from 'vue';
    import { useOrderStore } from '@/store/order.store';
    import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const orderStore = useOrderStore();
    const { loading, order } = storeToRefs(orderStore);

    const sumProducts = computed(() => {
        return order.value.positions.rows.reduce((pre, cur) => {
            return pre += sumProduct(cur);
        }, 0)
    })

    function sumProduct(item) {
        return (item?.price || 0) * item.quantity / 100;
    }

    onMounted(() => {
        orderStore.getOrderByDocumentId(route.params.id);
    })
</script>

<style lang="scss" scoped>
    .order {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 20px;

        &__column {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;

            &_size {
                &_fixed {
                    width: 472px;
                    min-width: 472px;
                }
            }
        }

        &-table {
            display: flex;
            flex-direction: column;
            background-color: #fff;

            &__row {
                display: grid;
                grid-template-columns: 1fr repeat(3, 150px);
                border-bottom: 1px solid #BFCFE0;

                &:hover {
                    box-shadow: 0px 20px slo==ooll;
                }

                &_header {
                    font-weight: 600;
                }
            }

            &__col {
                padding: 16px 24px;

                &_align {
                    &_right {
                        text-align: right;
                    }
                    &_center {
                        text-align: center;
                    }
                }
            }
        }

        &__summary {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 31px;
            padding: 0px 24px;
            font-size: 22px;
            font-weight: 600;
        }
    }
    .card {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 24px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.03);

        &__name {
            color: #333;
            font-size: 18px;
            font-weight: 700;
            line-height: 22px; /* 122.222% */
        }

        &-order {
            &__header {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            &__num-status {
                display: flex;
                gap: 13px;
                align-items: center;
            }
            &__comment {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            &__action {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            &__row {
                display: flex;
                align-items: center;
                gap: 13px;

                &_vertical {
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    gap: 0px;
                }
            }
            &__status {
                padding: 6px 14px;
                border-radius: 64px;
                border: 1px solid gray;
                font-size: 12px;
                font-weight: 500;
                line-height: 14px;
                white-space: nowrap;
            }
            &__title {
                font-size: 18px;
                font-weight: 700;
            }
            &__number {
                font-size: 32px;
            }
            &__text {
                font-size: 14px;
                line-height: 22px;
            }
        }
    }
    .user {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 15px;

        &__avatar {
            min-width: 62px;
            height: 62px;
            background-color: lightgray;
            border-radius: 50%;
        }
        &-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;

            &__name {
                font-family: Manrope;
                font-size: 20px;
                font-weight: 500;
                line-height: 24px; /* 120% */
            }
            &__phone {
                color: #959595;
                font-size: 20px;
                font-weight: 500;
                line-height: 24px; /* 120% */
            }
        }
    }
</style>