<script>
    export let bids = [];
    export let hasEnded;

    let wonStyles = 'bg-green-100 text-green-800 border-green-300';
    // Sort the bids by amount in descending order
    $: bids.sort((a, b) => b.amount - a.amount);
</script>

<style>
    /* Custom scrollbar styles */
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #dfdfdf;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #a0a0a0;
    }

    .bid-item:last-child{
        border-bottom: none;
    }
</style>

{#if bids.length !== 0}
    <div class="border rounded-md bg-gray-50">
        <div class="bg-gray-100 p-4 text-lg font-semibold">
            All bids
        </div>

        <div class="overflow-y-auto custom-scrollbar max-h-64 bg-gray-50 shadow rounded-md">
            <div class="">
                {#each bids as bid, index}
                    {#if index === 0}
                        <div class="px-4 bid-item flex justify-between items-center py-4 border-b {hasEnded ? wonStyles : ''}">
                            <span class="font-semibold text-gray-800">User #{bid.userId}</span>
                            <span class="font-semibold text-lg text-blue-700 bg-blue-200 px-2 rounded {hasEnded ? wonStyles : ''}">{bid.amount}</span>
                        </div>
                    {:else}
                        <div class="px-4 bid-item flex justify-between items-center py-4 border-b">
                            <span class="font-semibold text-gray-800">User #{bid.userId}</span>
                            <span class="font-bold text-lg text-blue-400 bg-blue-100 px-2 rounded">{bid.amount}</span>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
    {:else}
    <div class="py-10 text-center border rounded-md bg-gray-50 shadow">
        <p class="text-gray-600 font-semibold text-xl">No bids yet... Make first bid now!</p>
    </div>
{/if}



