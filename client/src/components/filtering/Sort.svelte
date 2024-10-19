<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let sortBy = 'name';
    let sortOrder = 'asc';

    const toggleSortOrder = () => {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch('sortChange', { sortBy, sortOrder });
    };

    const handleSortByChange = (event) => {
        sortBy = event.target.value;
        dispatch('sortChange', { sortBy, sortOrder });
    };
</script>

<div class="relative flex items-center w-full">
    <label for="sort-by" class="sr-only">Sort by:</label>

    <div class="flex items-center w-full border border-gray-300 rounded-2xl overflow-hidden">
        <select id="sort-by" bind:value={sortBy} on:change={handleSortByChange} class="flex-grow px-3 py-2 text-gray-600 focus:ring focus:ring-gray-300 appearance-none rounded-l-2xl">
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>

        <button on:click={toggleSortOrder} class="p-2 bg-gray-100 hover:bg-gray-200 transition-colors border-l border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 transform transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 style="transform: rotate({sortOrder === 'asc' ? '0deg' : '180deg'})">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
    </div>
</div>


