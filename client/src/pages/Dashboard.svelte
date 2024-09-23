<script>
    import {fetchWithAuth} from "../utils/api.js";

    let test = "Dashboard for secure admin";
    let data = fetchWithAuth("http://localhost:3000/api/sticks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Test Stick",
            description: "This is a test stick",
            price: 100,
            stock: 10
        })
    });

    console.log(data.then(res => console.log(res)))
</script>

<h1>{test}</h1>