const request = require('supertest');
const app = require('../src/server'); // Your main app file

// Test cases for api/vehicles/available
test('GET /api/vehicles/available - should get available vehicles with filters', async () => {
    const response = await request(app)
        .get('/api/vehicles/available')
        .query({
            capacity: 500,
            fromPincode: '110001',
            toPincode: '110002',
            startTime: '2025-07-21'
        })
        .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
    expect(response.body.message.SearchItems).toBeDefined();
    expect(Array.isArray(response.body.message.SearchItems)).toBe(true);

    console.log('✓ GET /api/vehicles/available with filters works');
});


test('GET /api/vehicles/available - should not get available vehicles with filters', async () => {
    const response = await request(app)
        .get('/api/vehicles/available')
        .query({
            capacity: 500,
            fromPincode: '110001',
            toPincode: '110002',
            startTime: '2024-07-21'  // past date -- should get 400
        })
        .expect(400);

    expect(response.body).toBeDefined();
    expect(response.body.errors).toBeDefined();
});


// Test cases for /api/vehicles
test('POST /api/vehicles - should add vehicles', async () => {
    const response = await request(app)
        .post('/api/vehicles')
        .send(
            {
                name: "TATA Truck",
                capacityKg: 500,
                tyres: 8,
                status: 'available'
            })
        .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.newVehicle).toBeDefined();
    console.log('✓ GET /api/vehicles/available with filters works');
});

test('POST /api/vehicles - should get an error while add vehicles', async () => {
    const response = await request(app)
        .post('/api/vehicles')
        .send(
            {
                name: "TATA Truck",
                capacityKg: 500,
                tyres: 3,   // atleast 4 tyres hsould be there
                status: 'available'
            })
        .expect(411);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Inputs are not valid");
});


// Test cases for -- api/bookings
test('POST /api/bookings - should add the booking of the vehicle', async () => {
    const response = await request(app)
        .post('/api/bookings')
        .send(
            {
                vehicleId: "687caa9bb19e4f16812278a3",  // already present vehicle Id
                fromPincode: '567893', // atleast 6 digits should be here
                toPincode: '243561',   // atleast 6 digits should be here
                startTime: '2029-08-21', // make sure not already booked
                customerId: "094e1dff8c1af4dae4819f93"  // dummy generated customer id
            })
        .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Booking created successfully");
});

test('POST /api/bookings - should not add the booking if vehicle is already booked', async () => {
    const response = await request(app)
        .post('/api/bookings')
        .send({
            vehicleId: "687caa9bb19e4f16812278a3",
            fromPincode: '567893',
            toPincode: '243561',
            startTime: '2029-08-21',
            customerId: "094e1dff8c1af4dae4819f93"
        })
        .expect(409);

    expect(response.body).toBeDefined();
    expect(response.body.error).toBe("Vehicle is already booked during this time.");
});
