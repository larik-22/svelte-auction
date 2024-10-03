<script>
    import Button from "./Button.svelte";
    import page from "page";

    export let item = {};

    let currentDate = new Date();
    let auctionStarted = new Date(item.startDate) < currentDate;
    let auctionEnded = new Date(item.endDate) < currentDate;


</script>
<div class="relative p-4 pt-8 shadow-md rounded-md flex flex-col items-start justify-items-start flex-grow gap-2">
    <div class="absolute left-0 right-0 top-0">
        {#if auctionStarted && !auctionEnded}
            <div class="bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-tl rounded-br-md">Auction Live
            </div>
        {:else if auctionEnded}
            <div class="bg-gray-400 text-white text-xs font-semibold px-2 py-1 rounded-tl rounded-br-md">Auction Ended
            </div>
        {/if}
    </div>
    <img src={item.image} alt={item.name} class="w-full h-48 object-cover rounded"/>
    <div class="self-stretch flex flex-col items-start gap-1 pb-4">
        <div class="self-stretch flex justify-between gap-2 items-start">
            <h2 class="text-xl font-medium">{item.name}</h2>
            <p class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700 border border-gray-400">
                {new Date(item.startDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric'})}
            </p>
        </div>
        <p class="mt-1 text-sm text-gray-400">{item.description}</p>
    </div>
    <div class="mt-auto">
        <Button variant="secondary" on:click={() => {
            page(`/stick/${item.id}`)
        }}>View Details
        </Button>
    </div>
</div>