<script>
    import {fetchWithAuth} from "../utils/api.js";
    import {jwtDecode} from "jwt-decode";
    import {authToken} from "../stores/auth.js";
    import Sidebar from "../components/dashboard/Sidebar.svelte";
    import UsersTab from "../components/dashboard/users/UsersTab.svelte";
    import AuctionsTab from "../components/dashboard/auctions/AuctionsTab.svelte";

    export let params;

    const token = $authToken;
    const decodedToken = jwtDecode(token);

    let activeTab = 0;
    let tabs = ["Auctions", "Users"];
    let tabComponents = [AuctionsTab, UsersTab];

    const changeTab = (index) => {
        activeTab = index;
    };
</script>

<section class="container-base grid grid-cols-12 py-10 gap-4">
    <Sidebar tabNames={tabs} {changeTab} className="col-span-full border p-2 rounded-md shadow lg:col-span-2" {activeTab}/>
    <div class="col-span-full lg:col-span-10 border p-2 rounded-md p-2">
        {#if tabComponents.length > 0}
            {#if activeTab >= 0 && activeTab < tabComponents.length}
                <svelte:component this={tabComponents[activeTab]} />
            {/if}
        {/if}
    </div>
    <!--sidebar with tabs: users and auctions -->
    <!--tabs users: delete users -->
    <!--tabs auctions: add, delete auctions -->
</section>