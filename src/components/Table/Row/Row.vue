<template>
    <div class="row">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .row {
        width: 100%;
        display: grid;
        grid-template-columns: 
            44px // Иконка раскрытия заказов
            30px // Номер по порядку
            minmax(100px, 150px) // Номер заказа
            minmax(100px, 1fr) // Проект
            minmax(100px, 200px) // ФИО
            minmax(100px, 150px) // Телефон
            minmax(50px, 150px) // Сумма заказа
            minmax(250px, 2fr) // Комментарии
            minmax(100px, 200px) // Дата посылки
            minmax(50px, 100px) // Вид доставки
            minmax(100px, 1fr) // Стоимость доставки
            minmax(100px, 1fr) // Оплата доставки
            minmax(100px, 200px) // Объявленная стоимость
            minmax(100px, 150px) // Код пункта поступления
            minmax(100px, 150px) // Код ПВЗ
            minmax(100px, 1fr) // Вес 1 места (грамм)
            minmax(100px, 1fr) // Текст Ошибки
            44px // Иконка редактирования заказа
            44px // Иконка удаления заказа
            ;
        border-bottom: 1px solid lightgray;

        &:hover:not(&_header) {
            background-color: #0400ff10;
        }

        &_header {
            position: sticky;
            top: 0px;
            background-color: lightgray;
            font-weight: bold;
            z-index: 1;
        }

        &_open {
            background-color: rgb(231, 231, 231);
        }
        &_bold {
            font-weight: bold;
        }
    }
</style>