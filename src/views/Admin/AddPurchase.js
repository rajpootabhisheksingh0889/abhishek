import React, { useState } from 'react';

const AddPurchase = ({ onAdd }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        const newPurchase = {
            description,
            amount: parseFloat(amount),
            id: Date.now(), // Unique ID for the purchase
        };

        onAdd(newPurchase);
        setDescription('');
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Purchase</button>
        </form>
    );
};

export default AddPurchase;
