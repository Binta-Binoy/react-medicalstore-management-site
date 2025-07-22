import React, { useEffect, useState } from 'react';
import { getUserMedicines, saveUserMedicines } from '../utils';

function MedicineList({ user }) {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    setMedicines(getUserMedicines(user));
  }, [user]);

  const handleDelete = (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this item?');
  if (!confirmDelete) return;

  const updated = medicines.filter((med) => med.id !== id);
  saveUserMedicines(user, updated);
  setMedicines(updated);
};


  const handleEdit = (id) => {
    const updated = medicines.map((med) => {
      if (med.id === id) {
        const name = prompt('Edit name', med.name);
        const stock = prompt('Edit stock', med.stock);
        return { ...med, name, stock };
      }
      return med;
    });
    saveUserMedicines(user, updated);
    setMedicines(updated);
  };

  const filtered = medicines.filter((med) =>
  med?.name?.toLowerCase().includes(search.toLowerCase())
);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className='container-fluid'>
      <div style={{ margin: '10px' }}>
        <h3>Medicines</h3>
        <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <table border="1" cellPadding="5" style={{ marginTop: '10px', width: '100%' }}>
          <thead>
            <tr className='center'>
              <th>Name</th>
              <th>Stock</th>
              <th>Added Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((med) => (
              <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.stock}</td>
                <td>{med.time}</td>
                <td className='text-center'>
                  <div className='d-flex justify-content-center'>
                    <button onClick={() => handleEdit(med.id)} className='btn btn-info me-10'>Edit</button>
                    <button onClick={() => handleDelete(med.id)} className='btn btn-info'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '10px' }}>
          {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicineList;