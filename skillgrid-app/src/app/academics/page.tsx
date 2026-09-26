
"use client";

import { useState, type FormEvent } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Plus,
  Trash2,
  X,
} from "lucide-react";

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

  const totalUnitsCount = subjects.reduce(
    (sum, subject) => sum + subject.totalUnits,
    0
  );

  const completedUnitsCount = subjects.reduce(
    (sum, subject) => sum + subject.completedUnits,
    0
  );

  const overallProgress =
    totalUnitsCount > 0
      ? Math.round((completedUnitsCount / totalUnitsCount) * 100)
      : 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const units = Number(totalUnits);

    if (!trimmedName || !Number.isInteger(units) || units < 1 || units > 100) {
      return;
    }

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
        subject.id === id
          ? {
              ...subject,
              completedUnits: Math.max(
                0,
                Math.min(subject.totalUnits, value)
              ),
            }
          : subject
      )
    );
  }

  function deleteSubject(id: string) {
    setSubjects((current) => current.filter((subject) => subject.id !== id));

    if (expandedSubject === id) {
      setExpandedSubject(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-700">Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Academics
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your subjects and keep track of syllabus completion.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          <Plus size={17} />
          Add subject
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total subjects</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {subjects.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Units completed</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {completedUnitsCount}
            <span className="ml-1 text-base font-normal text-slate-400">
              / {totalUnitsCount}
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Overall syllabus progress</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold text-slate-900">
              {overallProgress}%
            </p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-700 transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </section>

      {showForm && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Add a subject
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="subject-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Subject name
              </label>
              <input
                id="subject-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter subject name"
                maxLength={100}
                required
                autoFocus
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="subject-code"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject code (optional)
                </label>
                <input
                  id="subject-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Enter subject code"
                  maxLength={30}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="total-units"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Total units
                </label>
                <input
                  id="total-units"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  required
                  value={totalUnits}
                  onChange={(event) => setTotalUnits(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                Add subject
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Your subjects
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {subjects.length} {subjects.length === 1 ? "subject" : "subjects"}{" "}
            added
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="rounded-xl bg-slate-100 p-4">
              <BookOpen className="h-7 w-7 text-slate-500" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              No subjects added
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add your first subject to start tracking your syllabus progress.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
            >
              <Plus size={17} />
              Add your first subject
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {subjects.map((subject) => {
              const progress =
                subject.totalUnits > 0
                  ? Math.round(
                      (subject.completedUnits / subject.totalUnits) * 100
                    )
                  : 0;

              const isExpanded = expandedSubject === subject.id;

              return (
                <div key={subject.id} className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <BookOpen className="h-5 w-5 text-blue-700" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-semibold text-slate-800">
                          {subject.name}
                        </h3>
                        {subject.code && (
                          <p className="mt-1 text-xs text-slate-500">
                            {subject.code}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-slate-500">
                          {subject.completedUnits} of {subject.totalUnits} units
                          completed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:w-52">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-700 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm font-medium text-slate-700">
                        {progress}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSubject(isExpanded ? null : subject.id)
                      }
                      aria-expanded={isExpanded}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Update
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 flex flex-col gap-4 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          Completed units
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Update the number of units you have completed.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max={subject.totalUnits}
                          step="1"
                          value={subject.completedUnits}
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            if (
                              Number.isInteger(value) &&
                              value >= 0 &&
                              value <= subject.totalUnits
                            ) {
                              updateCompletedUnits(subject.id, value);
                            }
                          }}
                          aria-label={`Completed units for ${subject.name}`}
                          className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <span className="text-sm text-slate-500">
                          / {subject.totalUnits}
                        </span>

                        <button
                          type="button"
                          onClick={() => setExpandedSubject(null)}
                          aria-label="Close update panel"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"
                        >
                          <Check size={17} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => deleteSubject(subject.id)}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                      Delete subject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}