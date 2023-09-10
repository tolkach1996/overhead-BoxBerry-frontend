<template>
    <div class="message">
        <div class="message__title">
            <slot name="title"></slot>
        </div>
        <div class="message__image">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
    .message {
        flex: 1 1 auto;
        width: 100%;
        max-width: 900px;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 42px;

        &__title {
            color: #000;
            text-align: center;
            font-size: 62px;
            font-weight: 500;
            line-height: 72px;
        }
        &__image {
            position: relative;
            width: 277px;
            height: auto;
        }
    }
</style>