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
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useOrderStore } from '@/store/order.store';

    const route = useRoute();
    const orderStore = useOrderStore();

    const numberOrder = ref('');

    function onInput(e) {
        const key = e.key;

        console.log(key);

        if (!key || (key.length > 1 && key !== 'Enter')) return;

        if (key === 'Enter') {
            orderStore.getOrderById(numberOrder.value);
            numberOrder.value = '';
        } else {
            numberOrder.value += String(key);
        }
    }

    watch(route, value => {
        if (value.name === 'IssueOrders') {
            window.addEventListener('keyup', onInput);
        } else {
            console.log('Отписались от события почему то ...');
            window.removeEventListener('keyup', onInput);
            orderStore.newScaning();
        }
    })

    onMounted(() => {
        if (route.name === 'IssueOrders') {
            window.addEventListener('keyup', onInput);
        }
    })
    onUnmounted(() => {
        window.addEventListener('keyup', onInput);
    })
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