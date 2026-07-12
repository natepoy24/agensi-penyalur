"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { Baby, Home, Heart, MoreHorizontal, PlusCircle, X, Check } from "lucide-react";

interface Skill {
  id: number;
  nama: string;
  kategori: string;
}

const KATEGORI_CONFIG = [
  { name: "Baby Sitter", displayName: "Baby Sitter", Icon: Baby, colorClass: "bg-emerald-100 text-emerald-800" },
  { name: "ART", displayName: "Asisten Rumah Tangga (ART)", Icon: Home, colorClass: "bg-emerald-50 text-emerald-800" },
  { name: "Perawat Lansia", displayName: "Perawat Lansia", Icon: Heart, colorClass: "bg-teal-50 text-teal-800" },
  { name: "Lainnya", displayName: "Lainnya", Icon: MoreHorizontal, colorClass: "bg-slate-100 text-slate-600" }
];

export default function KeterampilanSelector({ defaultValue = "" }: { defaultValue?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    defaultValue ? defaultValue.split(',').map(s => s.trim()).filter(Boolean) : []
  );
  
  // State sementara ketika modal dibuka (agar tidak otomatis terupdate di UI belakang layar sebelum save)
  const [tempSelectedSkills, setTempSelectedSkills] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState(KATEGORI_CONFIG[0].name);
  const [newSkillName, setNewSkillName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('master_keterampilan').select('*');
    if (!error && data) {
      setSkills(data);
    }
  };

  const handleOpenModal = () => {
    setTempSelectedSkills([...selectedSkills]);
    setIsOpen(true);
  };

  const handleToggleSkill = (skillName: string) => {
    setTempSelectedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName) 
        : [...prev, skillName]
    );
  };

  // Fungsi hapus khusus untuk tampilan di luar modal
  const handleRemoveSkillOutside = (skillName: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skillName));
  };

  const handleSaveModal = () => {
    setSelectedSkills([...tempSelectedSkills]);
    setIsOpen(false);
  };

  const handleAddNewSkill = async () => {
    if (!newSkillName.trim()) return;
    setIsAdding(true);
    
    const { data, error } = await supabase
      .from('master_keterampilan')
      .insert([{ nama: newSkillName.trim(), kategori: activeTab }])
      .select();

    if (error) {
      toast.error("Gagal menambahkan keterampilan baru");
    } else if (data) {
      setSkills(prev => [...prev, data[0]]);
      handleToggleSkill(data[0].nama); // Otomatis tercentang di modal
      setNewSkillName("");
      toast.success("Keterampilan baru tersimpan!");
    }
    setIsAdding(false);
  };

  return (
    <div>
      {/* INPUT HIDDEN UNTUK SERVER ACTION */}
      <input type="hidden" name="keterampilan" value={selectedSkills.join(', ')} />

      {/* TAMPILAN DI LUAR MODAL */}
      <div className="border border-slate-200 rounded-xl p-4 min-h-[80px] bg-slate-50 flex flex-wrap gap-2 items-center mb-3">
        {selectedSkills.length === 0 && (
          <span className="text-slate-400 text-sm font-medium">Belum ada keterampilan dipilih...</span>
        )}
        {selectedSkills.map(skill => (
          <span key={skill} className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full flex items-center gap-2 shadow-sm">
            {skill}
            <button 
              type="button" 
              onClick={() => handleRemoveSkillOutside(skill)} 
              className="text-emerald-600 hover:text-emerald-900 focus:outline-none bg-emerald-200/50 hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
      <button 
        type="button" 
        onClick={handleOpenModal}
        className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition shadow-sm w-full md:w-auto"
      >
        + Pilih / Tambah Keterampilan
      </button>

      {/* MODAL POPUP - Redesigned to HTML Spec */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden ring-1 ring-slate-200">
            
            {/* Modal Header */}
            <div className="px-6 md:px-8 pt-8 pb-6 border-b border-slate-100 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">Kelola Keterampilan</h2>
                  <p className="text-slate-500 text-sm mt-2 font-medium">Konfigurasi keahlian pekerja untuk sistem penempatan.</p>
                </div>
                <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search / Add New Input */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative group flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <input 
                    className="w-full bg-slate-50 border-transparent focus:border-transparent focus:ring-2 focus:ring-emerald-500 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all font-medium text-sm" 
                    placeholder="Tambah Keterampilan Baru..." 
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNewSkill();
                      }
                    }}
                  />
                </div>
                {/* Category Selector for New Skill */}
                <select 
                  className="bg-slate-50 border-transparent focus:border-transparent focus:ring-2 focus:ring-emerald-500 rounded-xl py-3.5 px-4 text-slate-700 font-medium md:max-w-[200px] text-sm focus:bg-white transition-all w-full"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {KATEGORI_CONFIG.map(c => <option key={c.name} value={c.name}>{c.displayName}</option>)}
                </select>
                <button 
                  type="button" 
                  onClick={handleAddNewSkill}
                  disabled={isAdding || !newSkillName.trim()}
                  className="px-6 py-3.5 bg-emerald-600 text-white font-semibold text-sm rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  {isAdding ? 'Loading...' : 'Tambah'}
                </button>
              </div>
            </div>

            {/* Modal Content / Scrollable Area */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-10 bg-white">
              
              {KATEGORI_CONFIG.map(config => {
                const activeSkills = skills.filter(s => s.kategori === config.name);
                
                return (
                  <section key={config.name}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${config.colorClass}`}>
                        <config.Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{config.displayName}</h3>
                    </div>
                    {activeSkills.length === 0 ? (
                      <p className="text-sm font-medium text-slate-400">Belum ada Keterampilan.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2.5">
                        {activeSkills.map(skill => {
                          const isSelected = tempSelectedSkills.includes(skill.nama);
                          return (
                            <button
                              key={skill.id}
                              type="button"
                              onClick={() => handleToggleSkill(skill.nama)}
                              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors border max-w-full ${
                                isSelected 
                                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' 
                                  : 'bg-slate-50 text-slate-600 border-transparent hover:bg-emerald-50 hover:text-emerald-700'
                              }`}
                            >
                              <span className="truncate">{skill.nama}</span>
                              {isSelected && <Check className="w-4 h-4 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}

            </div>

            {/* Modal Footer */}
            <div className="px-6 md:px-8 py-5 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-100">
              <p className="text-slate-500 text-sm font-medium">
                <span className="text-emerald-600 font-bold">{tempSelectedSkills.length} Keterampilan</span> terpilih.
              </p>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button 
                  type="button" 
                  onClick={handleSaveModal} 
                  className="flex-1 md:flex-none px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
