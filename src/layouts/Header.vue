<template>
    <header class="header">
        <nav class="header-menu">
            <RouterLink :to="{ name: 'Main' }" class="link">
                <div class="header-menu__item">Выгрузка в BoxBerry</div>
            </RouterLink>
            <RouterLink :to="{ name: 'Cities' }" class="link">
                <div class="header-menu__item">Стоимость доставки</div>
            </RouterLink>
            <RouterLink :to="{ name: 'IssueOrders' }" class="link">
                <div class="header-menu__item">Сканирование товаров</div>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 40px;
        background-color: white;
        border-bottom: 2px solid #D0DAE4;
        min-height: 70px;
        height: 70px;

        &-menu {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;

            &__item {
                font-size: 16px;
            }
        }
    }
</style>