<template>
    <div class="content scroll">
        <div class="table">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        width: 100%;
        overflow: auto;
        height: 100%;
    }
    .table {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: min-content;
        font-size: 14px;

        &__input {
            width: 100%;
            border: 1px solid gray;
            border-radius: 4px;
            height: 25px;

        }
    }
</style>