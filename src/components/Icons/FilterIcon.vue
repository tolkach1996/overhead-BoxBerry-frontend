<template>
    <span class="filter-icon" :class="{ 'filter-icon_desc': desc, 'filter-icon_active': active }">

    </span>
</template>

<script setup>
    defineProps({
        desc: Boolean,
        active: Boolean
    })
</script>

<style lang="scss" scoped>

    .filter-icon {

        --color: gray;
        --after-top: 0%;

        position: relative;
        min-width: 16px;
        height: 14px;
        display: flex;
        border-bottom: 2px solid var(--color);
        cursor: pointer;
        box-sizing: content-box;

        &::after, &::before {
            content: "";
            position: absolute;
            left: 0px;
            height: 2px;
            background-color: var(--color);
        }

        &::after {
            top: var(--after-top);
            transform: translateY(-50%);
            width: 35%;
        }
        &::before {
            top: 50%;
            width: 65%;
            transform: translateY(-50%);
        }

        &:hover {
            opacity: 0.7;
        }

        &_active {
            --color: black;
        }
        &_desc {
            border-bottom: none;
            border-top: 2px solid var(--color);

            --after-top: 100%;
        }
    }
</style>