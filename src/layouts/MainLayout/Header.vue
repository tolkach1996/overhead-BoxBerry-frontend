<template>
    <header class="header">
        <nav class="header-menu">
            <RouterLink :to="{ name: ROUTES_NAME.MAIN }" class="link">
                <div class="header-menu__item">Выгрузка в BoxBerry</div>
            </RouterLink>
            <RouterLink 
                :to="{ name: ROUTES_NAME.CITIES }" 
                class="link"
            >
                <div class="header-menu__item">Стоимость доставки</div>
            </RouterLink>
            <RouterLink 
                :to="{ name: ROUTES_NAME.ORDERS_MOVE_ACCEPT }" 
                class="link"
                :class="{ 'router-link-exact-active': isActive }"
            >
                <div class="header-menu__item">Заказы</div>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useOrderStore } from '@/store/order.store';
    import { useNoticeStore } from '@/store/notice.store';
    import { ROUTES_NAME } from '../../constants/routesName';
    import { storeToRefs } from 'pinia';

    const pagesScaner = [ROUTES_NAME.ORDERS_MOVE_ACCEPT, ROUTES_NAME.ORDERS_MOVE_EXTRADITION];
    const pageOrders = [...pagesScaner];

    const route = useRoute();
    const orderStore = useOrderStore();
    const { textError } = storeToRefs(orderStore);
    const noticeStrore = useNoticeStore();

    const numberOrder = ref('');

    const isActive = computed(() => pageOrders.includes(route.name));

    async function onInput(e) {
        const key = e.key;

        console.log(key);

        if (!key || (key.length > 1 && key !== 'Enter')) return;

        if (key === 'Enter') {
            await orderStore.updateOrder(numberOrder.value);
            numberOrder.value = '';
            console.log(textError.value);
            if (textError.value) {
                noticeStrore.setText(`ОШИБКА! ${textError.value}`);
            } else {
                noticeStrore.setText('УСПЕШНО! Статус заказа изменен')
                await orderStore.getOrders();
            }
        } else {
            numberOrder.value += String(key);
        }
    }

    watch(route, value => {

        if (pagesScaner.includes(value.name)) {
            window.addEventListener('keyup', onInput);
        } else {
            window.removeEventListener('keyup', onInput);
            orderStore.newScaning();
        }
    })

    onMounted(() => {
        if (pagesScaner.includes(route.name)) {
            window.addEventListener('keyup', onInput);
        }
    })
    onUnmounted(() => {
        if (pagesScaner.includes(route.name)) {
            window.addEventListener('keyup', onInput);
        }
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