import React, { useState } from 'react';
import { getUserMedicines, saveUserMedicines } from '../utils';
import './MedicinePage.css'

function MedicineForm({ user }) {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  const handleAdd = () => {
    if (!name || !stock) {
      alert('Please enter both name and stock');
      return;
    }

    const medicines = getUserMedicines(user);

    if (medicines.length >= 5) {
      alert('Limit reached: Only 5 medicines allowed.');
      return;
    }

    const newMed = {
      id: Date.now(),
      name,
      stock,
      time: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      })
    };

    const updated = [...medicines, newMed];
    saveUserMedicines(user, updated);
    setName('');
    setStock('');
    window.location.reload();
  };

  return (
    <div className='container-fluid'>
      <div style={{ margin: '10px' }}>
        <h5>Add Medicine</h5>
        <div className='center'>
          <input
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button onClick={handleAdd} className='btn btn-info'>Add</button>
        </div>
      </div>
    </div>
  );
}

export default MedicineForm;