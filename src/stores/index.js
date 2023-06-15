import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => ({
        Orders: [
            { id: 1, name: "Заказ #1", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 2, name: "Заказ #2", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 3, name: "Заказ #3", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 4, name: "Заказ #4", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 5, name: "Заказ #5", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 6, name: "Заказ #6", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 7, name: "Заказ #7", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 8, name: "Заказ #8", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 9, name: "Заказ #9", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' },
            { id: 10, name: "Заказ #10", column1: 'Колонка1', column2: 'Колонка2', column3: 'Колонка3', column4: 'Колонка4' }]
    }),

    //actions

    //getters
}
)