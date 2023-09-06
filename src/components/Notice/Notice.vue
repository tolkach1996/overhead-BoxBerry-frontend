<template>
    <div class="notice" v-if="show">
        {{ textMessage }}
    </div>
</template>

<script setup>
    import { useNoticeStore } from '@/store/notice.store';
    import { storeToRefs } from 'pinia';

    const store = useNoticeStore();
    const { show, textMessage } = storeToRefs(store);
</script>

<style lang="scss" scoped>
    .notice {
        position: fixed;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
        padding: 14px 16px;
        background-color: #9e9e9e;
        color: black;
        z-index: 10;
    }
</style>