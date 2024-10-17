<script>
    import ListItem from "./StickItem.svelte";
    export let items = [];

</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 py-8 gap-6">
    {#if (items.length === 0)}
        <div class="col-span-1 lg:col-span-9 flex justify-center text-gray-600">
            <p class="text-2xl">No items found...</p>
        </div>
    {:else}
        {#each items as item, i (item.id)}
            <div class="col-span-1 lg:col-span-3 flex">
                <ListItem item={item}/>
            </div>
        {/each}
    {/if}

</div>
