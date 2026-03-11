import axios from 'axios';

const BASE_URL = 'https://shopp-backend-arrd.onrender.com/api/products';

async function check() {
    try {
        console.log("Fetching all products...");
        const res = await axios.get(BASE_URL);
        const data = res.data.data || res.data;
        if (data && data.length > 0) {
            const first = data[0];
            console.log("First product structure:", JSON.stringify(first, null, 2));
            const id = first.id || first._id;
            console.log(`Testing fetch for single product with ID: ${id}`);
            const singleRes = await axios.get(`${BASE_URL}/${id}`);
            console.log("Single product response:", JSON.stringify(singleRes.data, null, 2));
        } else {
            console.log("No products found.");
        }
    } catch (error) {
        console.error("Error during check:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    }
}

check();
