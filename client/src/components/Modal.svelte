<script>
    import {onDestroy, onMount} from "svelte";

    export let isOpen = false;
    export let title = '';
    export let onClose = () => {};

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    $: if (isOpen){
        document.addEventListener('keydown', handleKeyDown);
    } else {
        document.removeEventListener('keydown', handleKeyDown);
    }
</script>

<div class="fixed overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[3px] z-40" class:invisible={!isOpen}>
    <div class="custom-scrollbar bg-white px-6 py-8 rounded-md shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">{title}</h2>
            <button on:click={onClose}>&times;</button>
        </div>
        <div class="mt-4 relative z-50">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .invisible {
        display: none;
    }
</style>