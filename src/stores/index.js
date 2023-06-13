import { defineStore } from "pinia";

export const useStore = defineStore("store", {
    state: () => {
        Orders: [
            { id: 1, name: "Заказ #1" },
            { id: 2, name: "Заказ #2" },
            { id: 3, name: "Заказ #3" },
            { id: 4, name: "Заказ #4" },
            { id: 5, name: "Заказ #5" },
            { id: 6, name: "Заказ #6" },
            { id: 7, name: "Заказ #7" },
            { id: 8, name: "Заказ #8" },
            { id: 9, name: "Заказ #9" },
            { id: 10, name: "Заказ #10" }]
    },

    //actions

    //getters
}
)