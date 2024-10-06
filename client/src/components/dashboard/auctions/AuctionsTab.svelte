<script>
    import {afterUpdate, onMount} from "svelte";
    import {jwtDecode} from "jwt-decode";
    import {authToken} from "../../../stores/auth.js";
    import {fetchWithAuth, getApiData} from "../../../utils/api.js";
    import {BASE_BACKEND_URL} from "../../../config.js";
    import Loading from "../../Loading.svelte";
    import Button from "../../Button.svelte";
    import AuctionsTable from './AuctionsTable.svelte';
    import Modal from "../../Modal.svelte";
    import AuctionForm from "./AuctionForm.svelte";

    let auctions = [];
    let loadError = null;
    let addError = null;
    let loading = true;
    let isModalOpen = false;
    let currentAuction = null;

    onMount(async () => {
        try {
            auctions = await fetchData();

        } catch (err) {
            loadError = err.message;
        } finally {
            loading = false;
        }
    });

    const fetchData = async () => {
        fetchWithAuth(`${BASE_BACKEND_URL}/users`)
        const fetchPromise = fetchWithAuth(`${BASE_BACKEND_URL}/sticks`);
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 300));

        return Promise.all([fetchPromise, delayPromise]).then(([data]) => {
            return data;
        });
    };

    const deleteAuction = async (id) => {
        loading = true;
        try {
            await fetchWithAuth(`${BASE_BACKEND_URL}/sticks/${id}`, {
                method: 'DELETE'
            });

            await new Promise((resolve) => setTimeout(resolve, 200))
            auctions = auctions.filter(auction => auction.id !== id);
        } catch (err) {
            loadError = err.message;
        } finally {
            loading = false;
        }
    };

    const openModal = (auction = { id: null, name: '', startDate: '', endDate: '' }) => {
        currentAuction = auction;
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };

    const saveAuction = async (auction) => {
        loading = true;
        try {
            if (auction.id) {
                await fetchWithAuth(`${BASE_BACKEND_URL}/sticks/${auction.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(auction)
                });
            } else {
                await fetchWithAuth(`${BASE_BACKEND_URL}/sticks`, {
                    method: 'POST',
                    body: JSON.stringify(auction)
                });
            }

            auctions = await fetchData();
        } catch (err) {
            console.log(err)
            addError = err.message;
        } finally {
            closeModal();
            await new Promise((resolve) => setTimeout(resolve, 500))

            currentAuction = null;
            loading = false;
        }
    };
</script>

<style>
    @media (max-width: 768px) {
        table {
            font-size: 0.875rem;
        }
        th, td {
            padding: 0.5rem;
        }
    }

    .table-scrollbar {
        overflow-x: auto;
    }

    .table-scrollbar::-webkit-scrollbar {
        height: 4px;
    }

    .table-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .table-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    .table-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>

<div class="w-full p-1 md:p-4 overflow-hidden">
    <div class="flex justify-between items-center pb-4 border-b border-gray-200">
        <div class="flex flex-col gap-2">
            <h2 class="text-3xl font-bold text-gray-700">Auctions</h2>
            <p>To view full information, go to auction page.</p>
        </div>
        <Button variant="icon" className="hover:bg-blue-600 px-4 py-2 rounded-md shadow-md" on:click={() => openModal()}>
            Add Auction
        </Button>
    </div>
    <div class="mt-6 overflow-x-auto {!loading ? 'table-scrollbar' : ''}">
        <div class="w-[700px] lg:w-full">
            {#if loading}
                <div class="flex justify-center items-center">
                    <div class="w-40 h-40">
                        <Loading />
                    </div>
                </div>
            {:else}
                {#if auctions.length > 0}
                    <AuctionsTable {auctions} error={loadError} {deleteAuction} {openModal}/>
                {:else}
                    <p class="text-lg text-center text-gray-500">No auctions found...</p>
                {/if}
            {/if}
        </div>
    </div>
    <Modal isOpen={isModalOpen} title={currentAuction?.id ? 'Edit Auction' : 'Add Auction'} onClose={closeModal}>
        {#key currentAuction?.id}
            <AuctionForm auction={currentAuction} onSave={saveAuction} onCancel={closeModal} />
        {/key}
    </Modal>
</div>
