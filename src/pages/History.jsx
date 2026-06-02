import React, { useMemo, useState } from 'react';
import { useHistory } from '../hooks/useHistory.js';
import { Modal } from '../components/ui/Modal.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export const History = () => {
  const { history, filter, setFilter, clearFilter } = useHistory();
  const [selected, setSelected] = useState(null);

  const resultLabel = (category) => ({ Low: 'success', Medium: 'warning', High: 'danger' }[category]);

  const rows = useMemo(() => history, [history]);

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Patient history</h1>
            <p className="section-copy">Search and filter previous assessments to review patient outcomes and risk classifications.</p>
          </div>
        </div>
        <div className="grid grid-2" style={{ gap: 18, marginBottom: 18 }}>
          <div className="input-group">
            <label htmlFor="search">Search by name, email or date</label>
            <input id="search" value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} placeholder="Search records" />
          </div>
          <div className="input-group">
            <label htmlFor="category">Filter by risk</label>
            <select id="category" value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
              <option value="">All levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <Button variant="secondary" onClick={clearFilter}>Reset filters</Button>
      </section>

      <section className="section">
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Score</th>
                <th>Risk</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((record) => (
                <tr key={record.id}>
                  <td>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.score}</td>
                  <td><Badge label={record.category} variant={resultLabel(record.category)} /></td>
                  <td>
                    <Button variant="secondary" onClick={() => setSelected(record)}>View details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={Boolean(selected)} title={selected?.name || 'Record detail'} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <p><strong>Date</strong>: {selected.date}</p>
            <p><strong>Risk score</strong>: {selected.score} ({selected.category})</p>
            <p><strong>Top factors</strong>: {selected.factors.join(', ')}</p>
            <p><strong>Details</strong>: {selected.values && Object.entries(selected.values).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
          </div>
        )}
      </Modal>
    </main>
  );
};
