<script>
    import Button from "../../Button.svelte";

    export let auctions = [];
    export let error = null;
    export let deleteAuction;
    export let openModal;

</script>

<table class="w-full border">
    <thead>
    <tr>
        <th class="border">ID</th>
        <th class="border">Name</th>
        <th class="border">Start Date</th>
        <th class="border">End Date</th>
        <th class="border">Actions</th>
    </tr>
    </thead>
    <tbody>
    {#if error}
        <tr>
            <td class="border px-4 py-5" colspan="5">
                <p class="text-red-500 text-center text-sm p-2 bg-red-50 border border-red-500 rounded-md">{error}</p>
            </td>
        </tr>
    {:else}
        {#each auctions as auction}
            <tr>
                <td class="border px-4 py-2 text-gray-600">{auction.id}</td>
                <td class="border px-4 py-2">
                    <a href="/stick/{auction.id}" class="underline underline-offset-2 text-gray-600">
                        {auction.name}
                    </a>
                </td>
                <td class="border px-4 py-2">
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {new Date(auction.startDate).toLocaleString()}
                        </span>
                </td>
                <td class="border px-4 py-2">
                        <span class="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {new Date(auction.endDate).toLocaleString()}
                        </span>
                </td>
                <td class="border border-transparent px-4 py-2 flex flex-col md:flex-row justify-center gap-2">
                    <Button className="w-full md:w-1/2 border-blue-500 bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2" on:click={() => openModal(auction)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z"/>
                        </svg>
                        Edit
                    </Button>
                    <Button className="w-full md:w-1/2 flex items-center gap-2" variant="danger" on:click={() => deleteAuction(auction.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                        </svg>
                        Delete
                    </Button>
                </td>
            </tr>
        {/each}
    {/if}
    </tbody>
</table>