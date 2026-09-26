
"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock3,
  Coffee,
  CheckCircle2,
} from "lucide-react";

type TimerMode = "focus" | "break";

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

export default function FocusTimerPage() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [remaining, setRemaining] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);

          if (mode === "focus") {
            setCompletedSessions((count) => count + 1);
          }

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, mode]);

  const totalSeconds = mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (remaining % 60).toString().padStart(2, "0");

  const progress =
    totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  function switchMode(nextMode: TimerMode) {
    setMode(nextMode);
    setRemaining(nextMode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS);
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setRemaining(totalSeconds);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={16} />
          <span>Productivity</span>
          <span>/</span>
          <span>Focus Timer</span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Focus Timer
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Work in focused sessions and take breaks between them.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => switchMode("focus")}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  mode === "focus"
                    ? "bg-white text-[#3B5998] shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Clock3 size={16} />
                Focus
              </button>

              <button
                onClick={() => switchMode("break")}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  mode === "break"
                    ? "bg-white text-[#3B5998] shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Coffee size={16} />
                Short break
              </button>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-sm flex-col items-center">
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              <svg
                viewBox="0 0 240 240"
                className="absolute inset-0 h-full w-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="7"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  stroke="#3B5998"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 108}
                  strokeDashoffset={
                    2 * Math.PI * 108 * (1 - progress / 100)
                  }
                  className="transition-[stroke-dashoffset] duration-500"
                />
              </svg>

              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  {mode === "focus" ? "Focus session" : "Short break"}
                </p>

                <p
                  className="mt-3 text-6xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-7xl"
                  aria-live="off"
                >
                  {minutes}:{seconds}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {isRunning
                    ? "Stay focused"
                    : remaining === 0
                      ? "Session complete"
                      : "Ready when you are"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setIsRunning((running) => !running)}
                disabled={remaining === 0}
                className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#304b85] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isRunning ? <Pause size={17} /> : <Play size={17} />}
                {isRunning ? "Pause" : "Start"}
              </button>

              <button
                onClick={resetTimer}
                aria-label="Reset timer"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {remaining === 0 && (
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <CheckCircle2 size={18} />
                  {mode === "focus"
                    ? "Focus session completed"
                    : "Break completed"}
                </div>

                <button
                  onClick={() =>
                    switchMode(mode === "focus" ? "break" : "focus")
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {mode === "focus" ? "Start a short break" : "Back to focus"}
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 size={17} className="text-[#3B5998]" />
              Completed focus sessions
            </div>

            <p className="mt-4 text-4xl font-semibold text-slate-900">
              {completedSessions}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Sessions completed during this page visit.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">How it works</h2>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B5998]">
                  <Clock3 size={17} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Focus for 25 minutes
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Work on one task without switching between activities.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Coffee size={17} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Take a 5-minute break
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Give yourself a short pause before the next session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-700">Timer settings</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Focus duration: 25 minutes
              <br />
              Short break: 5 minutes
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Custom durations can be added later.
            </p>
          </div>
        </aside>
      </div>

      <p className="text-xs text-slate-400">
        The timer runs while this page is open. Session counts reset when you
        refresh the page.
      </p>
    </div>
  );
}