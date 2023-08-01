<template>
    <div class="column" :class="className">
        <slot></slot>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        align: { type: String, default: 'left' }
    })

    const className = computed(() => {
        return `column_align_${props.align}`;
    })

</script>

<style lang="scss" scoped>
    .column {
        display: flex;
        align-items: center;
        padding: 5px 10px;

        &_icon {
            cursor: pointer;
            opacity: 0.6;

            &:hover {
                opacity: 1;
            }
        }

        &_align {
            &_left {
                justify-content: flex-start;
                text-align: left;
            }
            &_center {
                justify-content: center;
                text-align: center;
            }
            &_right {
                justify-content: flex-end;
                text-align: right;
            }
        }
    }
</style>