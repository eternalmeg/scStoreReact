export async function wakeServer(url, retries = 6, delay = 3000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, { method: "GET" });

            if (res.ok) {
                console.log("Backend is awake!");
                return true;
            }
        } catch (err) {

        }

        console.log(`Server sleeping... retry ${attempt}/${retries}`);
        await new Promise(r => setTimeout(r, delay));
    }

    return false;
}
