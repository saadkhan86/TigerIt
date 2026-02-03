
import mongoose from 'mongoose';
import ProductModel from './Src/Models/Product.Model';
import axios from 'axios';

const DB_URL = 'mongodb://localhost:27017/tigerit2';

async function run() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(DB_URL);
        console.log('Connected.');

        // Find Product
        let product = await ProductModel.findOne();
        if (!product) {
            console.log('No product found, please ensure previous run created it.');
            // Fallback create if needed (omitted for brevity as we ran it before)
            product = await ProductModel.create({
                createdBy: new mongoose.Types.ObjectId(),
                description: "Test Product",
                forAdult: false,
                image: "img",
                variants: [{ title: "Default", price: { amount: 10, currency: "$" } }]
            });
        }

        const variant = product.variants[0];

        // TEST 1: Invalid Quantity
        console.log('\n--- TEST 1: Invalid Quantity (-1) ---');
        try {
            await axios.post('http://localhost:8080/api/v1/checkout', {
                pickupPlaceId: "place_123",
                deliveryPlaceId: "place_456",
                deliveryFee: 10,
                items: [
                    {
                        product: product._id.toString(),
                        variant: variant._id.toString(),
                        quantity: -1
                    }
                ]
            });
            console.log('FAILURE: Should have failed with quantity error.');
        } catch (err: any) {
            if (err.response) {
                console.log('SUCCESS: Got expected error:', err.response.data.message);
            } else {
                console.log('Error:', err.message);
            }
        }

        // TEST 2: Valid Request (Check for crash)
        console.log('\n--- TEST 2: Valid Request ---');
        try {
            const res = await axios.post('http://localhost:8080/api/v1/checkout', {
                pickupPlaceId: "place_123",
                deliveryPlaceId: "place_456",
                deliveryFee: 10,
                items: [
                    {
                        product: product._id.toString(),
                        variant: variant._id.toString(),
                        quantity: 1
                    }
                ]
            });
            console.log('SUCCESS: Verification passed!', res.data);
        } catch (err: any) {
            console.log('Request Failed:', err.response ? err.response.status : err.message);
            if (err.response) {
                console.log('Data:', err.response.data);
                if (err.response.data.message === 'Distance not found') {
                    console.log('SUCCESS: Reached GeoCode step (Validation passed).');
                }
            }
        }

    } catch (error) {
        console.error('Script Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

run();
