<script>
    import Counter from '../components/Counter.svelte';
    import { getApiData, deleteApiData } from "../utils/utils.js";

    export let params;

    let data = [];
    let error = null;

    const loadData = async () => {
        try {
            data = await getApiData("sticks");
        } catch (err) {
            error = err;
        }
    };

    const deleteItem = async (id) => {
        try {
            await deleteApiData("sticks", id);
            data = data.filter(item => item.id !== id);
        } catch (err) {
            error = err;
        }
    };

    loadData();
</script>

{#if error}
    <p style="color: red">{error.message}</p>
{:else}
    {#each data as item}
        <p>{item.name} + {item.id}</p>
        <button on:click={() => deleteItem(item.id)}>Delete</button>
    {/each}
{/if}