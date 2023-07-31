<template>
    <div class="loader" :class="{ [clasName]: clasName }">
        <span class="loader__element"></span>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({ 
        size: { type: String, default: 'default' }
    })

    const clasName = computed(() => {
        return {
            'default': '',
            'small': 'loader_size_small',
            'medium': 'loader_size_medium'
        }[props.size]
    })

</script>

<style lang="scss" scoped>

    .loader {

        --size: 120px;
        --thickness: 14px;
        --font-size: 36px;
        --gap: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap);
        font-size: var(--font-size);
        font-weight: 600;
        background-color: transparent;

        &_size {
            &_small {
                --size: 60px;
                --thickness: 8px;
                --font-size: 20px;
                --gap: 10px;
            }
            &_medium {
                --size: 90px;
                --thickness: 11px;
                --font-size: 24px;
                --gap: 15px;
            }
        }
        
        &__element {

            display: block;
            position: relative;
            width: var(--size);
            height: var(--size);
            animation: lds-dual-ring 1.5s linear infinite;

            border-radius: 50%;
            border: var(--thickness) solid transparent;
            background:conic-gradient(from 180deg at 50% 50%, blue 0deg, rgba(217, 217, 217, 0) 360deg) border-box;
            -webkit-mask:
                linear-gradient(#fff 0 0) padding-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;

            &::after {
                content: "";
                position: absolute;
                background-color: blue;
                width: var(--thickness);
                height: var(--thickness);
                border-radius: 50%;
                top: 100%;
                left: calc(50% - var(--thickness)/2);
            }
        }
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }

    
</style>