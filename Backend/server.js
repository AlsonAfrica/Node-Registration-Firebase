const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize Firebase Admin SDK with the service account key
const serviceAccount = require('../Backend/node-registration-server-firebase-adminsdk-7yhna-e89d3eabd5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // The databaseURL is optional for Firestore
    // databaseURL: 'https://node-registration-server.firebaseio.com' 
});

const db = admin.firestore(); // Firestore reference

// Create (POST) - Add new user
app.post('/users', async (req, res) => {
    try {
        // Destructure the new fields from the request body
        const { name, email, id, phoneNumber, position, image,idNumber } = req.body;

        // Generate a new document reference in the 'users' collection
        const userRef = db.collection('users').doc(); // Generate unique ID

        // Save the new user data to Firestore
        await userRef.set({ name, email, id, phoneNumber, position, image,idNumber });

        // Send a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Read (GET) - Get all users
app.get('/users', async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(usersList);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Read (GET) - Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ id: userDoc.id, ...userDoc.data() });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Update (PUT) - Update user data
app.put('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const { name, email, phoneNumber, position, image, idNumber} = req.body; // Updated fields
        await userRef.update({ name, email, phoneNumber, position, image,idNumber }); // Update fields
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Delete (DELETE) - Remove a user
app.delete('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.delete();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error deleting user' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
