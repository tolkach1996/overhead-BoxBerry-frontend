<template>
    <div class="page-filter">
        <div class="page-filter__item">
            <Dropdown v-model="filter.pickupPoint" :options="pickupPoints" />
        </div>
        <div class="page-filter__item">Заказов за</div>
        <div class="page-filter__item">
            <label class="page-filter__button">
                <Calendar v-model="dates" selectionMode="range" :manualInput="false" date-format="dd.mm.yy" />
                <!-- <ArrowBottomIcon /> -->
            </label>
        </div>
        <div class="page-filter__item">
            <b>{{ countOrders }}</b>
            на сумму
            <b>{{ summOrders }}</b>
        </div>
    </div>
</template>

<script setup>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { computed, ref, watch } from "vue";
import { useOrderStore } from "@/store/order.store";
import { storeToRefs } from "pinia";

const orderStore = useOrderStore();
const { filter } = storeToRefs(orderStore);

const props = defineProps({
    data: { type: Array, default: () => [] },
    loading: Boolean,
});
const emits = defineEmits(["filter"]);

const dates = ref(new Date().toLocaleDateString("ru-RU"));

const pickupPoints = ref(["ПВЗ Дубровка", "ПВЗ Петровско-Разумовская"]);

const countOrders = computed(() => (props.loading ? "..." : props.data.length));
const summOrders = computed(() => {
    if (props.loading) return "...";
    return props.data.reduce((pre, cur) => {
        return (pre += cur.summa);
    }, 0);
});

watch(dates, (value) => {
    emits("filter", value);
});
</script>

<style lang="scss" scoped>
.page {
    &-filter {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        font-size: 24px;

        &__button {
            position: relative;
            padding: 8px 10px;
            background-color: #d5e7f9;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
}
</style>
