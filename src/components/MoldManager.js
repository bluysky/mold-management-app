import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './MoldManager.css';

const MoldManager = () => {
  const [molds, setMolds] = useState([]);
  const [newMold, setNewMold] = useState({ mold_id: '', status: '', inspection_status: '', inspector: '' });
  const [selectedMold, setSelectedMold] = useState(null);

  useEffect(() => {
    console.log('MoldManager 컴포넌트 마운트'); // 로그 추가
    fetchMolds();
  }, []);

  const fetchMolds = async () => {
    const { data, error } = await supabase.from('molds').select('*');
    if (error) console.error(error);
    else setMolds(data);
  };

  const handleCreate = async () => {
    const { error } = await supabase.from('molds').insert(newMold);
    if (error) console.error(error);
    else {
      await fetchMolds();
      setNewMold({ mold_id: '', status: '', inspection_status: '', inspector: '' });
    }
  };

  const handleUpdate = async () => {
    if (!selectedMold) return;
    const { error } = await supabase.from('molds').update(selectedMold).eq('id', selectedMold.id);
    if (error) console.error(error);
    else {
      await fetchMolds();
      setSelectedMold(null);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('molds').delete().eq('id', id);
    if (error) console.error(error);
    else fetchMolds();
  };

  return (
    <div className="mold-manager-container">
      <h2>Mold Management</h2>

      <div className="mold-form">
        <input placeholder="Mold ID" value={newMold.mold_id} onChange={(e) => setNewMold({ ...newMold, mold_id: e.target.value })} />
        <input placeholder="Status" value={newMold.status} onChange={(e) => setNewMold({ ...newMold, status: e.target.value })} />
        <input placeholder="Inspection Status" value={newMold.inspection_status} onChange={(e) => setNewMold({ ...newMold, inspection_status: e.target.value })} />
        <input placeholder="Inspector" value={newMold.inspector} onChange={(e) => setNewMold({ ...newMold, inspector: e.target.value })} />
        <button onClick={handleCreate}>Create</button>
      </div>

      <table className="mold-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mold ID</th>
            <th>Status</th>
            <th>Inspection Status</th>
            <th>Inspector</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {molds.map((mold) => (
            <tr key={mold.id}>
              <td>{mold.id}</td>
              <td>{mold.mold_id}</td>
              <td>{mold.status}</td>
              <td>{mold.inspection_status}</td>
              <td>{mold.inspector}</td>
              <td>
                <button onClick={() => setSelectedMold(mold)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(mold.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMold && (
        <div className="mold-form edit-form">
          <input value={selectedMold.mold_id} onChange={(e) => setSelectedMold({ ...selectedMold, mold_id: e.target.value })} />
          <input value={selectedMold.status} onChange={(e) => setSelectedMold({ ...selectedMold, status: e.target.value })} />
          <input value={selectedMold.inspection_status} onChange={(e) => setSelectedMold({ ...selectedMold, inspection_status: e.target.value })} />
          <input value={selectedMold.inspector} onChange={(e) => setSelectedMold({ ...selectedMold, inspector: e.target.value })} />
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={() => setSelectedMold(null)} className="cancel-button">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MoldManager;
