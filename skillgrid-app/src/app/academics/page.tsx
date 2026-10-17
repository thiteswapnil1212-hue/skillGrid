"use client";

import { uid } from "@/lib/utils";
import { useState, type FormEvent } from "react";
import { BookOpen, Check, ChevronDown, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

type Subject = {
  id: string;
  name: string;
  code: string;
  totalUnits: number;
  completedUnits: number;
};

export default function AcademicsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [totalUnits, setTotalUnits] = useState("5");

  const totalUnitsCount = subjects.reduce((sum, subject) => sum + subject.totalUnits, 0);
  const completedUnitsCount = subjects.reduce((sum, subject) => sum + subject.completedUnits, 0);
  const overallProgress = totalUnitsCount > 0 ? Math.round((completedUnitsCount / totalUnitsCount) * 100) : 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const units = Number(totalUnits);
    if (!trimmedName || !Number.isInteger(units) || units < 1 || units > 100) return;

    const newSubject: Subject = {
      id: uid(),
      name: trimmedName,
      code: code.trim(),
      totalUnits: units,
      completedUnits: 0,
    };

    setSubjects((current) => [...current, newSubject]);
    setName("");
    setCode("");
    setTotalUnits("5");
    setShowForm(false);
  }

  function updateCompletedUnits(id: string, value: number) {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id ? { ...subject, completedUnits: Math.max(0, Math.min(subject.totalUnits, value)) } : subject
      )
    );
  }

  function deleteSubject(id: string) {
    setSubjects((current) => current.filter((subject) => subject.id !== id));
    if (expandedSubject === id) setExpandedSubject(null);
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">Workspace</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Academics</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Manage your subjects and track syllabus completion.</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2 rounded-xl">
            <Plus size={16} />
            Add subject
          </Button>
        </div>
      </section>

      <section className="rounded-3xl bg-[#1E293B] text-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
              {subjects.length} {subjects.length === 1 ? "subject" : "subjects"}
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
              <BookOpen size={20} />
            </div>
          </div>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-white tabular-nums sm:text-6xl">{overallProgress}%</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Syllabus completion</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">{subjects.length}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Total subjects</p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                {completedUnitsCount}<span className="text-lg text-slate-300/50"> / {totalUnitsCount}</span>
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">Units completed</p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-semibold tracking-tight">Add a subject</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} aria-label="Close form" className="h-12 w-12 p-0 text-slate-400 hover:text-slate-700">
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="subject-name" className="mb-2 block text-sm font-semibold text-slate-700">Subject name *</label>
                    <Input id="subject-name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus maxLength={100} placeholder="e.g. Data Structures" className="rounded-xl border-[#E8E5DB]" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="subject-code" className="mb-2 block text-sm font-semibold text-slate-700">Subject code</label>
                      <Input id="subject-code" value={code} onChange={(e) => setCode(e.target.value)} maxLength={30} placeholder="e.g. CS101" className="rounded-xl border-[#E8E5DB]" />
                    </div>
                    <div>
                      <label htmlFor="total-units" className="mb-2 block text-sm font-semibold text-slate-700">Total units *</label>
                      <Input id="total-units" type="number" min="1" max="100" required value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} className="rounded-xl border-[#E8E5DB]" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 border-t border-[#E8E5DB] pt-5">
                    <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button type="submit" className="rounded-xl">Add subject</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Your subjects</h2>
            <p className="mt-1 text-xs text-[#9AA0A6]">{subjects.length} {subjects.length === 1 ? "subject" : "subjects"} added</p>
          </div>
        </div>

        <div className="mt-4">
          {subjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <BookOpen size={28} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">No subjects added</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">Add your first subject to start tracking your syllabus progress.</p>
              <Button onClick={() => setShowForm(true)} className="mt-6 gap-2 rounded-xl">
                <Plus size={16} /> Add your first subject
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {subjects.map((subject) => {
                  const progress = subject.totalUnits > 0 ? Math.round((subject.completedUnits / subject.totalUnits) * 100) : 0;
                  const isExpanded = expandedSubject === subject.id;

                  return (
                    <motion.div
                      layout
                      key={subject.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-2xl border border-[#E8E5DB] bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:shadow-md sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                            <BookOpen size={20} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold tracking-tight text-slate-900">{subject.name}</h3>
                            {subject.code && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9AA0A6]">{subject.code}</p>}
                            <p className="mt-1.5 text-sm text-[#6B7280]">{subject.completedUnits} of {subject.totalUnits} units completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:w-56">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EFECE3]">
                            <motion.div
                              className="h-full rounded-full bg-[#3B5998]"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                          <span className="w-12 text-right text-sm font-semibold text-slate-700 tabular-nums">{progress}%</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="gap-2 rounded-xl border-[#E8E5DB] shrink-0">
                          Update <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="inline-flex"><ChevronDown size={14} /></motion.span>
                        </Button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#E8E5DB] bg-[#F7F6F2] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Update completion</p>
                                <p className="mt-1 text-xs text-[#6B7280]">Adjust how many units you have finished.</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-xl border border-[#E8E5DB] bg-white p-1.5">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={subject.totalUnits}
                                    value={subject.completedUnits}
                                    onChange={(e) => updateCompletedUnits(subject.id, Number(e.target.value))}
                                    aria-label={`Completed units for ${subject.name}`}
                                    className="h-10 w-16 rounded-lg border-[#E8E5DB] bg-white text-center font-semibold"
                                  />
                                  <span className="pr-2 text-sm font-semibold text-[#9AA0A6]">/ {subject.totalUnits}</span>
                                </div>
                                <Button size="sm" onClick={() => setExpandedSubject(null)} aria-label={`Done editing ${subject.name}`} className="h-12 w-12 rounded-xl p-0">
                                  <Check size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => deleteSubject(subject.id)} className="h-12 gap-2 rounded-xl px-4 text-slate-500 hover:text-danger hover:bg-danger-light">
                                <Trash2 size={14} /> Delete subject
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
