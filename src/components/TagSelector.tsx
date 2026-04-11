"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function TagSelector({ defaultValue = "" }: { defaultValue?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [masterTags, setMasterTags] = useState<{id: number, nama: string}[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValue ? defaultValue.split(',').map(t => t.trim()).filter(Boolean) : []
  );
  const [newTagName, setNewTagName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const { data } = await supabase.from('master_tags').select('*').order('nama', { ascending: true });
    if (data) setMasterTags(data);
  };

  const handleToggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) ? prev.filter(t => t !== tagName) : [...prev, tagName]
    );
  };

  const handleAddNewTag = async () => {
    if (!newTagName.trim()) return;
    setIsAdding(true);
    const { data, error } = await supabase.from('master_tags').insert([{ nama: newTagName.trim() }]).select();
    if (error) {
      toast.error("Tag sudah ada atau gagal ditambahkan");
    } else if (data) {
      setMasterTags(prev => [...prev, data[0]]);
      handleToggleTag(data[0].nama);
      setNewTagName("");
      toast.success("Tag baru ditambahkan!");
    }
    setIsAdding(false);
  };

  return (
    <div>
      <input type="hidden" name="tags" value={selectedTags.join(', ')} />
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedTags.length === 0 && <span className="text-xs text-slate-400 italic">Belum ada tag...</span>}
        {selectedTags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md border border-emerald-100 flex items-center gap-1">
            #{tag}
            <button type="button" onClick={() => handleToggleTag(tag)} className="hover:text-red-500">&times;</button>
          </span>
        ))}
      </div>

      <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all"
      >
        + Kelola Tag
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-sm font-bold text-slate-800">Pilih / Tambah Tag</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 text-2xl">&times;</button>
            </div>

            <div className="p-4 max-h-60 overflow-y-auto flex flex-wrap gap-2">
              {masterTags.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleToggleTag(tag.nama)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedTags.includes(tag.nama) 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  #{tag.nama}
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag baru..."
                  className="flex-1 px-3 py-2 border-none rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                />
                <button 
                  type="button" 
                  onClick={handleAddNewTag}
                  disabled={isAdding || !newTagName.trim()}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 disabled:bg-slate-300"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button type="button" onClick={() => setIsOpen(false)} className="px-6 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl">Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
