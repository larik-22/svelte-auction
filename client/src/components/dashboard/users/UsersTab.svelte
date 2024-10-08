<script>
    import {afterUpdate, onMount} from "svelte";
    import {authToken} from "../../../stores/auth.js";
    import {fetchWithAuth, getApiData} from "../../../utils/api.js";
    import {BASE_BACKEND_URL} from "../../../config.js";
    import Loading from "../../Loading.svelte";
    import Button from "../../Button.svelte";
    import {jwtDecode} from "jwt-decode";

    const token = $authToken;
    const decodedToken = jwtDecode(token);
    let users = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            users = await fetchData();
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });

    const fetchData = async () => {
        const fetchPromise = fetchWithAuth(`${BASE_BACKEND_URL}/users`);
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

        return Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            // show all users, except yourself:
            const userId = decodedToken.id;
            data = data.filter(user => user.id !== userId);

            return data;
        });
    };

    const deleteUser = async (id) => {
        loading = true;
        try {
            await fetchWithAuth(`${BASE_BACKEND_URL}/users/${id}`, {
                method: 'DELETE'
            });

            await new Promise((resolve) => setTimeout(resolve, 200))
            users = users.filter(user => user.id !== id);
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    };
</script>

<div class="p-1 md:p-4">
    <div class="flex justify-between items-center pb-4 border-b border-gray-200">
        <div class="">
            <h2 class="text-3xl font-bold text-gray-700">Users</h2>
        </div>
    </div>
    {#if loading}
        <div class="flex justify-center items-center">
            <div class="w-40 h-40">
                <Loading />
            </div>
        </div>
    {:else}
        <table class="w-full border mt-4">
            <thead>
            <tr>
                <th class="border">ID</th>
                <th class="border">Email</th>
                <th class="border">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#if error}
                <tr>
                    <td class="border px-4 py-5" colspan="3">
                        <p class="text-red-500 text-center text-sm p-2 bg-red-50 border border-red-500 rounded-md">{error}</p>
                    </td>
                </tr>
            {:else}
                {#each users as user}
                    <tr>
                        <td class="border px-4 py-2 text-gray-600">{user.id}</td>
                        <td class="border px-4 py-2">{user.email}</td>
                        <td class="border px-4 py-2 flex flex-col md:flex-row justify-center gap-2">
                            <Button className="w-full md:w-1/2 flex items-center gap-2" variant="danger" on:click={() => deleteUser(user.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5
                                    L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22
                                    L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672
                                    L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5
                                    L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                                </svg>
                                Delete
                            </Button>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    {/if}
</div>