import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Filter, MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { AddLeadModal } from '../components/modals/AddLeadModal';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  'New': 'blue',
  'Contacted': 'yellow',
  'Negotiation': 'purple',
  'Won': 'green',
  'Lost': 'red'
};

// Three-dot dropdown menu per row
function RowActions({ lead, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        title="More actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-30 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">{lead.clientName}</p>
          </div>

          <button
            onClick={() => { setOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-500" />
            View Details
          </button>

          <button
            onClick={() => { setOpen(false); onEdit(lead); }}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-amber-500" />
            Edit Lead
          </button>

          <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
            <button
              onClick={() => { setOpen(false); onDelete(lead._id); }}
              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeadManagementPage() {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (error.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadAdded = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        setLeads(prev => prev.filter(lead => lead._id !== id));
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    setIsModalOpen(true);
  };

  const filteredLeads = leads.filter(lead =>
    lead.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Lead Management</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track your client pipeline</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm text-slate-900 dark:text-slate-100 transition-colors"
            />
          </div>
          <Button variant="secondary" icon={Filter} className="hidden sm:flex">
            Filter
          </Button>
        </div>

        <Button icon={Plus} onClick={() => { setEditLead(null); setIsModalOpen(true); }}>
          Add Lead
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Client Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Follow-up Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredLeads.map((lead) => (
            <TableRow key={lead._id}>
              <TableCell>
                <div className="font-medium text-slate-900 dark:text-white">{lead.clientName}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{lead.email}</div>
              </TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>
                <Badge variant={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>{lead.assignedTo?.name || 'Unassigned'}</TableCell>
              <TableCell>{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell className="text-right">
                <RowActions lead={lead} onDelete={handleDelete} onEdit={handleEdit} />
              </TableCell>
            </TableRow>
          ))}
          {filteredLeads.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="flex flex-col items-center gap-2">
                  <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  <p className="font-medium">No leads found</p>
                  <p className="text-xs">Try adjusting your search or add a new lead</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditLead(null); }}
        onLeadAdded={handleLeadAdded}
        editLead={editLead}
      />
    </div>
  );
}
