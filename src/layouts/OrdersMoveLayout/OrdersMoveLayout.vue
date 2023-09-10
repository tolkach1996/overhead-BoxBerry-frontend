<template>
    <div class="navigations">
        <RouterLink class="navigations__item" :to="{ name: ROUTES_NAME.ORDERS_MOVE_ACCEPT }" exact-active-class="navigations__item_active">
            Приёмка
        </RouterLink>
        <RouterLink class="navigations__item" :to="{ name: ROUTES_NAME.ORDERS_MOVE_EXTRADITION }" exact-active-class="navigations__item_active">
            Выдача
        </RouterLink>
    </div>
    <RouterView />
</template>

<script setup>
    import { ROUTES_NAME } from '../../constants/routesName';

</script>

<style lang="scss" scoped>
    .navigations {
        display: flex;
        gap: 60px;

        &__item {
            font-size: 42px;
            cursor: pointer;
            color: #878787;
            text-decoration: none;

            &_active {
                color: #126CF3;
            }
        }
    }
</style>