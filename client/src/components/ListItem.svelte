<script>
    import Button from "./Button.svelte";
    import page from "page";

    export let item = {};

</script>
<div>
    <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center">
            <img src={item.image} alt={item.name} class="w-20 h-20 rounded-lg object-cover"/>
            <div class="ml-4">
                <p class="text-lg font-semibold">{item.name}</p>
                <p class="text-sm text-gray-500">{item.description}</p>
            </div>
        </div>
        <div class="flex items-center">
            <p class="text-lg font-semibold">${item.estimatedPrice}</p>
            <Button variant="primary">
                Join
            </Button>
        </div>
    </div>
</div>