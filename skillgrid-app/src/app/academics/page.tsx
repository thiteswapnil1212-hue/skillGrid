"use client";

import { useState, type FormEvent } from "react";
import { BookOpen, Check, ChevronDown, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

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
          <p className="text-sm font-medium text-primary">Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Academics</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your subjects and track syllabus completion.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={16} />
          Add subject
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Total subjects</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{subjects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Units completed</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {completedUnitsCount} <span className="text-base text-slate-400 font-normal">/ {totalUnitsCount}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Overall syllabus progress</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{overallProgress}%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overallProgress}%` }} />
            </div>
          </CardContent>
        </Card>
      </section>

      {showForm && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Add a subject</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="h-8 w-8 p-0">
              <X size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="subject-name" className="mb-2 block text-sm font-medium text-slate-700">Subject name</label>
                <Input id="subject-name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus maxLength={100} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="subject-code" className="mb-2 block text-sm font-medium text-slate-700">Subject code (optional)</label>
                  <Input id="subject-code" value={code} onChange={(e) => setCode(e.target.value)} maxLength={30} />
                </div>
                <div>
                  <label htmlFor="total-units" className="mb-2 block text-sm font-medium text-slate-700">Total units</label>
                  <Input id="total-units" type="number" min="1" max="100" required value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Add subject</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your subjects</CardTitle>
          <p className="text-sm text-slate-500 mt-1">{subjects.length} {subjects.length === 1 ? "subject" : "subjects"} added</p>
        </CardHeader>
        <div className="border-t border-slate-200">
          {subjects.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <BookOpen className="h-8 w-8 text-slate-400 mb-4" />
              <h3 className="text-base font-medium text-slate-900">No subjects added</h3>
              <p className="mt-1 text-sm text-slate-500">Add your first subject to start tracking your syllabus progress.</p>
              <Button onClick={() => setShowForm(true)} className="mt-6 gap-2">
                <Plus size={16} /> Add your first subject
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {subjects.map((subject) => {
                const progress = subject.totalUnits > 0 ? Math.round((subject.completedUnits / subject.totalUnits) * 100) : 0;
                const isExpanded = expandedSubject === subject.id;
                return (
                  <div key={subject.id} className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="rounded-lg bg-primary-light p-3 text-primary">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{subject.name}</h3>
                          {subject.code && <p className="text-xs text-slate-500 mt-0.5">{subject.code}</p>}
                          <p className="mt-1 text-sm text-slate-500">{subject.completedUnits} of {subject.totalUnits} units completed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:w-52">
                        <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 w-10 text-right">{progress}%</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="gap-2">
                        Update <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="mt-5 flex flex-col gap-4 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between border border-slate-100">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Completed units</p>
                          <p className="text-xs text-slate-500">Update your progress for this subject.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Input
                            type="number"
                            min="0"
                            max={subject.totalUnits}
                            value={subject.completedUnits}
                            onChange={(e) => updateCompletedUnits(subject.id, Number(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-slate-500">/ {subject.totalUnits}</span>
                          <Button variant="ghost" size="sm" onClick={() => setExpandedSubject(null)} className="h-10 w-10 p-0 text-slate-500">
                            <Check size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => deleteSubject(subject.id)} className="gap-2 text-slate-500 hover:text-danger hover:bg-danger-light">
                        <Trash2 size={14} /> Delete subject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}