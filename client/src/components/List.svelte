<script>
    import ListItem from "./ListItem.svelte";
    export let items = [];
</script>

<div>
    {#each items as item, i (item.id)}
        <ListItem {item}/>
    {/each}
</div>