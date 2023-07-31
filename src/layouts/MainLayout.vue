<template>
    <Header />
    <Content>
        <RouterView />
    </Content>
    <Footer />

    <ModalWindow :show="isShowModal" @click="toggleModalWindow">
        {{ textError }}
    </ModalWindow>
</template>

<script setup>
    import Header from './Header.vue';
    import Content from './Content.vue';
    import Footer from './Footer.vue';
    import ModalWindow from '../components/ModalWindow.vue';

    import { useApp } from '../hooks/useApp';
    
    const { textError, toggleModalWindow, isShowModal } = useApp;
</script>

<style lang="scss" scoped>

</style>