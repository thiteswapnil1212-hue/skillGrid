"use client";

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
      id: crypto.randomUUID(),
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
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">Workspace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Academics</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Manage your subjects and track syllabus completion.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={16} />
          Add subject
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Total subjects</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">{subjects.length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Units completed</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
              {completedUnitsCount} <span className="text-base text-slate-400 font-medium">/ {totalUnitsCount}</span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-primary">Overall syllabus progress</p>
            <p className="mt-2 text-3xl font-bold text-primary tracking-tight">{overallProgress}%</p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary/20">
              <motion.div 
                className="h-full rounded-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg">Add a subject</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700">
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="subject-name" className="mb-2 block text-sm font-semibold text-slate-700">Subject name *</label>
                    <Input id="subject-name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus maxLength={100} placeholder="e.g. Data Structures" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="subject-code" className="mb-2 block text-sm font-semibold text-slate-700">Subject code</label>
                      <Input id="subject-code" value={code} onChange={(e) => setCode(e.target.value)} maxLength={30} placeholder="e.g. CS101" />
                    </div>
                    <div>
                      <label htmlFor="total-units" className="mb-2 block text-sm font-semibold text-slate-700">Total units *</label>
                      <Input id="total-units" type="number" min="1" max="100" required value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
                    <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button type="submit">Add subject</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Your subjects</CardTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">{subjects.length} {subjects.length === 1 ? "subject" : "subjects"} added</p>
        </CardHeader>
        <div className="border-t border-slate-100 bg-white">
          {subjects.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100 mb-5">
                <BookOpen size={28} className="text-slate-300" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">No subjects added</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">Add your first subject to start tracking your syllabus progress.</p>
              <Button onClick={() => setShowForm(true)} className="mt-6 gap-2">
                <Plus size={16} /> Add your first subject
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
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
                      className="p-6 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-start gap-4">
                          <div className="rounded-xl bg-primary-light p-3.5 text-primary shadow-sm border border-primary/10">
                            <BookOpen size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base">{subject.name}</h3>
                            {subject.code && <p className="text-xs font-semibold tracking-wider text-slate-400 mt-1 uppercase">{subject.code}</p>}
                            <p className="mt-2 text-sm font-medium text-slate-500">{subject.completedUnits} of {subject.totalUnits} units completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:w-56">
                          <div className="h-2.5 flex-1 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                            <motion.div 
                              className="h-full rounded-full bg-primary" 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700 w-12 text-right">{progress}%</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="gap-2 shrink-0">
                          Update <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown size={14} /></motion.div>
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
                            <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white shadow-sm p-5 sm:flex-row sm:items-center sm:justify-between border border-slate-200 ring-1 ring-slate-900/5">
                              <div>
                                <p className="text-sm font-bold text-slate-900">Update completion</p>
                                <p className="text-xs font-medium text-slate-500 mt-1">Adjust how many units you have finished.</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
                                  <Input
                                    type="number"
                                    min="0"
                                    max={subject.totalUnits}
                                    value={subject.completedUnits}
                                    onChange={(e) => updateCompletedUnits(subject.id, Number(e.target.value))}
                                    className="w-16 h-8 text-center bg-white border-slate-200 font-bold focus:ring-2"
                                  />
                                  <span className="text-sm font-bold text-slate-400 pr-2">/ {subject.totalUnits}</span>
                                </div>
                                <Button size="sm" onClick={() => setExpandedSubject(null)} className="h-10 w-10 p-0">
                                  <Check size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => deleteSubject(subject.id)} className="gap-2 text-slate-500 hover:text-danger hover:bg-danger-light">
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
      </Card>
    </main>
  );
}