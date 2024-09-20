<script>
    import {handleRegistrationResponse} from "../utils/auth.js";
    import page from "page";

    let email = "";
    let password = "";

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
        } catch (error){
            //error handling
            console.log(error)
            if(response.status === 409){
                alert("User already exists")
            }
        }
    }

</script>

<main class="flex flex-col max-w-4xl gap-4 m-auto">
    <h1>Register</h1>
    <label for="email">Email</label>
    <input type="email" class="border" required bind:value={email}>
    <label for="password">Password</label>
    <input type="text" class="border" required bind:value={password}>
    <button type="submit" class="border" on:click={register}>Register</button>
</main>
