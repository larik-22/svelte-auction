<script>
    import Button from "./Button.svelte";
    import page from "page";

    export let item = {};
</script>
<div class="p-4 shadow-md rounded-md flex flex-col items-start justify-items-start flex-grow gap-2">
    <img src={item.image} alt={item.name} class="w-full h-48 object-cover rounded"/>
    <div class="flex flex-col items-start gap-1 pb-4">
        <h2 class="text-xl font-medium">{item.name}</h2>
        <p class="text- text-gray-400">{item.description}</p>
    </div>
    <div class="mt-auto">
        <Button variant="secondary" on:click={() => {
            page(`/stick/${item.id}`)
        }}>View Details</Button>
    </div>
</div>