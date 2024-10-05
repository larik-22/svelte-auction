<script>
    export let label;
    export let options = [];
    export let selectedOptions = [];
    import { capitalizeFirstLetter } from "../../utils/utils.js";
</script>

<div class="flex flex-col gap-3">
    <label class="text-lg font-semibold text-gray-700 pb-2">{label}</label>
    {#each options as option}
        <div class="flex items-center gap-3">
            <input
                    class="custom-checkbox"
                    type="checkbox"
                    id={label + option}
                    name={label}
                    value={option}
                    bind:group={selectedOptions}
            />
            <label for={label + option} class="text-gray-600 select-none">{capitalizeFirstLetter(option)}</label>
        </div>
    {/each}
</div>

<style>
    .custom-checkbox {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s, border-color 0.2s;
    }

    .custom-checkbox:checked {
        @apply bg-blue-500;
        @apply border-blue-700;
    }

    .custom-checkbox:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3); /* blue-300 */
    }
</style>