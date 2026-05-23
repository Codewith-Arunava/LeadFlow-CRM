import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const initialColumns = [
  { id: 'New', title: 'New' },
  { id: 'Contacted', title: 'Contacted' },
  { id: 'Negotiation', title: 'Negotiation' },
  { id: 'Won', title: 'Won' },
  { id: 'Lost', title: 'Lost' },
];

const statusColors = {
  'New': 'blue',
  'Contacted': 'yellow',
  'Negotiation': 'purple',
  'Won': 'green',
  'Lost': 'red'
};

function SortableItem({ item, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item._id });

  const [menuOpen, setMenuOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all group relative"
    >
      <div className="flex justify-between items-start mb-2">
        {/* Drag handle only on the text area */}
        <div {...listeners} className="flex-1 cursor-grab active:cursor-grabbing">
          <h4 className="font-medium text-slate-800 dark:text-slate-100">{item.clientName}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.company}</p>
        </div>

        {/* Three-dot menu button */}
        <div className="relative">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              {/* Backdrop to close */}
              <div
                className="fixed inset-0 z-10"
                onPointerDown={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-7 z-20 w-44 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Actions</p>
                </div>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <span>👁</span> View Details
                </button>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <span>✏️</span> Edit Lead
                </button>
                <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      if (window.confirm(`Delete "${item.clientName}"?`)) onDelete(item._id);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                  >
                    <span>🗑</span> Delete Lead
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <Badge variant={statusColors[item.status]}>{item.status}</Badge>
      </div>
    </div>
  );
}

function Column({ column, items, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-4 min-w-[320px] max-w-[320px] flex flex-col h-[calc(100vh-12rem)] border border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200">{column.title}</h3>
        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs py-1 px-2.5 rounded-full font-medium">
          {items.length}
        </span>
      </div>
      
      <SortableContext 
        items={items.map(i => i._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-2 scrollbar-thin">
          {items.map(item => (
            <SortableItem key={item._id} item={item} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanPipelinePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/leads/${id}`);
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeIndex = items.findIndex((i) => i._id === activeId);
    if (activeIndex === -1) return;
    
    const activeItem = items[activeIndex];
    let newStatus = activeItem.status;
    
    const overIndex = items.findIndex((i) => i._id === overId);

    // Check if we dropped over a column (empty or not)
    if (initialColumns.find(c => c.id === overId)) {
      newStatus = overId;
    } else if (overIndex !== -1) {
      // We dropped over another item
      newStatus = items[overIndex].status;
    }

    // Update state optimistically
    setItems((prevItems) => {
      let newItems = [...prevItems];
      
      // Update status
      if (activeItem.status !== newStatus) {
         newItems[activeIndex] = { ...newItems[activeIndex], status: newStatus };
      }
      
      // Reorder if dropped over another item in the same column
      if (overIndex !== -1 && activeItem.status === newStatus) {
        newItems = arrayMove(newItems, activeIndex, overIndex);
      }
      
      return newItems;
    });

    // Update backend if status changed
    if (activeItem.status !== newStatus) {
      try {
        await api.put(`/leads/${activeId}`, { status: newStatus });
      } catch (error) {
        console.error('Error updating lead status:', error);
        // Revert on error
        fetchLeads();
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Pipeline Board</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Drag and drop leads to update their status</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full items-start w-max">
            {initialColumns.map(column => (
              <Column 
                key={column.id} 
                column={column} 
                items={items.filter(item => item.status === column.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
