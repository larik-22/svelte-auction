<script>
    import {handleRegistrationResponse} from "../utils/auth.js";
    import page from "page";

    /*
        TODO: Add validation, error handling, and if registration unsuccessful remove token
     */
    let email = "";
    let password = "";
    let confirmPassword = "";

    const register = async () => {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        try {
            await handleRegistrationResponse(response)
        } catch (error) {
            console.log(error)
            if (response.status === 409) {
                alert("User already exists")
            }
        }
    }

</script>

<main class="min-h-[600px] flex flex-col justify-center items-center">
    <div class="flex flex-col max-w-4xl gap-6 m-auto p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 class="text-2xl font-medium mb-2 text-center">Register</h1>
        <div class="flex flex-col gap-1">
            <label for="email" class="text-base font-medium">Email</label>
            <input type="email" placeholder="Enter your email"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={email}>
        </div>
        <div class="flex flex-col gap-1">
            <label for="password" class="text-base font-medium">Password</label>
            <input type="password" placeholder="Enter your password"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={password}>
        </div>
        <div class="flex flex-col gap-1">
            <label for="confirmPassword" class="text-base font-medium">Confirm Password</label>
            <input type="password" placeholder="Confirm your password"
                   class="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   required bind:value={confirmPassword}>
        </div>
        <button type="submit"
                class="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                on:click={register}>Register
        </button>
    </div>
</main>
