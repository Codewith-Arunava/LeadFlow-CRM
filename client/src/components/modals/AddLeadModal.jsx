import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import api from '../../api';

export function AddLeadModal({ isOpen, onClose, onLeadAdded }) {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/leads', formData);
      onLeadAdded(response.data);
      onClose();
      // Reset form
      setFormData({
        clientName: '',
        company: '',
        email: '',
        phone: '',
        status: 'New',
        notes: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead">
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Client Name" 
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required 
            placeholder="Jane Doe" 
          />
          <Input 
            label="Company" 
            name="company"
            value={formData.company}
            onChange={handleChange}
            required 
            placeholder="Acme Corp" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Email" 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="jane@acme.com" 
          />
          <Input 
            label="Phone" 
            name="phone"
            type="tel" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Lead Source</label>
            <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Website</option>
              <option>Referral</option>
              <option>Cold Call</option>
              <option>Trade Show</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Notes</label>
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any additional context or notes here..."
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
