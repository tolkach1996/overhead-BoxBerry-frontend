<template>
    <main class="content">
        <slot></slot>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .content {
        flex: 1 1 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 10px 40px;
        overflow: auto;
        background: #F1F5F9;
    }
</style>