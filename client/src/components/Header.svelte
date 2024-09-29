<script>
    import {authToken} from "../stores/auth.js";
    import {isUserAdmin} from "../utils/auth.js";

    export let active;
    $: loggedIn = $authToken !== null;
    $: isAdmin = loggedIn && isUserAdmin();
</script>

<nav class="container-base flex justify-between items-center align-middle gap-4 py-4 border-b sticky top-0 z-50 bg-white">
    <a href="/" class="text-2xl font-bold">StickNation</a>
    <div class="flex gap-8 items-center">
        <a href="/" class:active={active === '/'}>Home</a>
        {#if loggedIn}
            {#if isAdmin}
                <a href="/dashboard" class="py-2 px-4 bg-blue-800 text-white rounded border-2 border-blue-800" class:active={active === '/dashboard'}>Dashboard</a>
            {/if}
        {:else}
            <div class="flex items-center gap-2">
                <a href="/login" class="py-2 px-4 border-2 border-blue-600 text-blue-800 rounded" class:active={active === '/login'}>Login</a>
                <a href="/register" class="py-2 px-4 bg-blue-600 text-white rounded border-2 border-blue-800" class:active={active === '/register'}>Register</a>
            </div>
        {/if}
    </div>
</nav>

<style>
    .active {
        @apply font-medium;
    }
</style>