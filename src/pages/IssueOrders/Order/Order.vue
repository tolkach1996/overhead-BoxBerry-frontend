<template>
    <h1>Вывача заказа</h1>
    <div class="order">
        <div class="order__column order__column_size_fixed">
            <div class="card">
                <span class="card__name">Клиент</span>
                <div class="user">
                    <div class="user__avatar"></div>
                    <div class="user-info">
                        <div class="user-info__name">Смирнов Михаил Анатольевич</div>
                        <div class="user-info__phone">+7 903 734-64-65</div>
                    </div>
                </div>
            </div>
            <div class="card"></div>
        </div>
        <div class="order__column">
            <div class="order-table">
                <div class="order-table__row order-table__row_header">
                    <div class="order-table__col">Наименование товара</div>
                    <div class="order-table__col order-table__col_align_right">Стоимость</div>
                    <div class="order-table__col order-table__col_align_center">Количество</div>
                    <div class="order-table__col order-table__col_align_right">Сумма</div>
                </div>
                <div class="order-table__row">
                    <div class="order-table__col">Наименование товара</div>
                    <div class="order-table__col order-table__col_align_right">Стоимость</div>
                    <div class="order-table__col order-table__col_align_center">Количество</div>
                    <div class="order-table__col order-table__col_align_right">Сумма</div>
                </div>
                <div class="order-table__row">
                    <div class="order-table__col">Наименование товара</div>
                    <div class="order-table__col order-table__col_align_right">Стоимость</div>
                    <div class="order-table__col order-table__col_align_center">Количество</div>
                    <div class="order-table__col order-table__col_align_right">Сумма</div>
                </div>
                <div class="order-table__row">
                    <div class="order-table__col">Наименование товара</div>
                    <div class="order-table__col order-table__col_align_right">Стоимость</div>
                    <div class="order-table__col order-table__col_align_center">Количество</div>
                    <div class="order-table__col order-table__col_align_right">Сумма</div>
                </div>
            </div>
            <div class="order__summary">
                <span>ИТОГО</span>
                <span>200 000</span>
            </div>
        </div>
    </div>
</template>

<script setup>

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