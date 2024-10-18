<script>
    export let tabNames = [];
    export let className;
    export let activeTab = 0;
    export let changeTab = (index) => {};
</script>

<div class="{className}">
    <ul class="flex flex-col gap-2">
        {#each tabNames as tabName, index}
            <li class="cursor-pointer p-2 rounded transition-colors duration-200 {index === activeTab ? 'bg-gray-100' : 'hover:bg-gray-100'}"
                on:click={() => changeTab(index)}>{tabName}</li>
        {/each}
    </ul>
</div>