<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('hideModal')
        }
    }
}
</script>

<template>
    <div class="modal" v-if="show">
        <div class="content">
            <slot></slot>
            <Button type="button" label="Ок" icon="pi pi-search" class="prime__button" @click="hideDialog" />
        </div>
    </div>
</template>

<style>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(1, 1, 1, 0.5);
    position: fixed;
    display: flex;
    z-index: 2;
}

.content {
    margin: auto;
    background-color: white;
    border-radius: 15px;
    min-width: 300px;
    max-width: 500px;
    min-height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 15px;
}
</style>