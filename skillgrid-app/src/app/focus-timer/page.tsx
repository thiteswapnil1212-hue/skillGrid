
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlarmClock,
  ArrowRight,
  Check,
  Coffee,
  Flame,
  Maximize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Sparkles,
  Target,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";

type Mode = "focus" | "short" | "long";

const MODES: Record<Mode, { label: string; duration: number; subtitle: string }> = {
  focus: {
    label: "Focus",
    duration: 25 * 60,
    subtitle: "One thing at a time. You've got this.",
  },
  short: {
    label: "Short break",
    duration: 5 * 60,
    subtitle: "Take a breath. You've earned it.",
  },
  long: {
    label: "Long break",
    duration: 15 * 60,
    subtitle: "Step away and recharge your mind.",
  },
};

const RADIUS = 142;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function FocusTimerPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [remaining, setRemaining] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const total = MODES[mode].duration;
  const progress = Math.max(0, Math.min(1, remaining / total));
  const offset = CIRCUMFERENCE * (1 - progress);

  const changeMode = useCallback((nextMode: Mode) => {
    setMode(nextMode);
    setRemaining(MODES[nextMode].duration);
    setRunning(false);
    setEndAt(null);
  }, []);

  const completeSession = useCallback(() => {
    if (mode === "focus") {
      setCompletedSessions((count) => count + 1);
      changeMode("short");
    } else {
      changeMode("focus");
    }
  }, [mode, changeMode]);

  useEffect(() => {
    if (!running || endAt === null) return;

    const tick = () => {
      const next = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(next);

      if (next <= 0) {
        setRunning(false);
        setEndAt(null);
        completeSession();
      }
    };

    tick();
    const interval = window.setInterval(tick, 250);

    return () => window.clearInterval(interval);
  }, [running, endAt, completeSession]);

  const toggleTimer = () => {
    if (running) {
      setRunning(false);
      setEndAt(null);
    } else {
      setEndAt(Date.now() + remaining * 1000);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setEndAt(null);
    setRemaining(total);
  };

  const skipTimer = () => {
    if (mode === "focus") {
      changeMode("short");
    } else {
      changeMode("focus");
    }
  };

  const sessionsUntilLongBreak = completedSessions % 4;
  const currentSession = sessionsUntilLongBreak === 0 && completedSessions > 0
    ? 4
    : sessionsUntilLongBreak;

  return (
    <main className="relative min-h-full overflow-hidden bg-[#090b16] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-600/[0.13] blur-[130px]" />
        <div className="absolute bottom-0 right-[-100px] h-[350px] w-[350px] rounded-full bg-indigo-500/[0.08] blur-[120px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[350px] w-[350px] rounded-full bg-fuchsia-500/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <Target size={21} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300/80">
                SkillGrid
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Focus Studio
              </h1>
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled((value) => !value)}
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.04] text-slate-400 transition hover:border-violet-400/30 hover:bg-white/[0.08] hover:text-white"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </header>

        {/* Intro */}
        <section className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 text-xs font-medium text-violet-200">
            <Sparkles size={14} />
            Your little corner of calm
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make time for <span className="text-violet-300">what matters.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
            Find your rhythm, quiet the noise, and give your next goal your full attention.
          </p>
        </section>

        {/* Main layout */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_290px]">
          {/* Timer card */}
          <section className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.035] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

            {/* Mode selector */}
            <div className="mx-auto mb-8 flex max-w-md rounded-2xl border border-white/[0.07] bg-black/20 p-1.5">
              {(
                [
                  ["focus", "Focus", Target],
                  ["short", "Short break", Coffee],
                  ["long", "Long break", Moon],
                ] as const
              ).map(([key, label, Icon]) => (
                <button
                  key={key}
                  onClick={() => changeMode(key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-medium transition-all duration-300 sm:text-sm ${
                    mode === key
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-950/40"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Circular timer */}
            <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-2">
              <div className="absolute h-64 w-64 rounded-full bg-violet-500/[0.09] blur-[70px] sm:h-72 sm:w-72" />

              <svg
                viewBox="0 0 320 320"
                className="relative h-auto w-full max-w-[320px] -rotate-90 overflow-visible"
                aria-hidden="true"
              >
                <circle
                  cx="160"
                  cy="160"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.055)"
                  strokeWidth="5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(167,139,250,0.10)"
                  strokeWidth="12"
                />
                <circle
                  cx="160"
                  cy="160"
                  r={RADIUS}
                  fill="none"
                  stroke="url(#timer-gradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  style={{
                    transition: "stroke-dashoffset 300ms linear",
                    filter: "drop-shadow(0 0 8px rgba(167,139,250,0.4))",
                  }}
                />
                <defs>
                  <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c4b5fd" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-violet-300/80">
                  <span className={`h-1.5 w-1.5 rounded-full ${running ? "animate-pulse bg-emerald-400" : "bg-violet-400"}`} />
                  {running ? "In the zone" : MODES[mode].label}
                </div>
                <div
                  role="timer"
                  aria-live="off"
                  className="font-mono text-6xl font-light tracking-[-0.07em] tabular-nums text-white sm:text-7xl"
                >
                  {formatTime(remaining)}
                </div>
                <p className="mt-4 max-w-[220px] text-center text-xs leading-5 text-slate-400">
                  {MODES[mode].subtitle}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                onClick={resetTimer}
                aria-label="Reset timer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.035] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-95"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={toggleTimer}
                className="group flex h-14 min-w-[180px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 px-8 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:shadow-xl hover:shadow-violet-900/40 active:scale-[0.97]"
              >
                {running ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
                {running ? "Pause session" : "Start focusing"}
              </button>

              <button
                onClick={skipTimer}
                aria-label="Skip current session"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.035] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-95"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <p className="mt-5 text-center text-[11px] text-slate-500">
              {running ? "Stay present. Every minute counts." : "Ready when you are. No rush."}
            </p>
          </section>

          {/* Side panel */}
          <aside className="flex flex-col gap-5">
            {/* Session progress */}
            <section className="rounded-[24px] border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Session rhythm</p>
                  <p className="mt-1 text-xs text-slate-500">Your focus cycle</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <Flame size={19} />
                </div>
              </div>

              <div className="mb-4 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {completedSessions}
                </span>
                <span className="mb-1 text-xs text-slate-500">sessions completed</span>
              </div>

              <div className="flex gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      index < currentSession
                        ? "bg-gradient-to-r from-violet-400 to-indigo-400 shadow-sm shadow-violet-500/20"
                        : "bg-white/[0.07]"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                {completedSessions === 0
                  ? "Complete a focus session to start your rhythm."
                  : `${currentSession} of 4 sessions in your current cycle.`}
              </p>
            </section>

            {/* Today's focus */}
            <section className="relative overflow-hidden rounded-[24px] border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] to-indigo-500/[0.04] p-6">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/[0.12] blur-3xl" />

              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Zap size={19} />
                </div>
                <h3 className="text-sm font-semibold text-white">A gentle reminder</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  You don&apos;t need to do everything today. Just focus on the next small step.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-violet-300">
                  <Sparkles size={14} />
                  Progress over perfection
                </div>
              </div>
            </section>

            {/* Quick guide */}
            <section className="rounded-[24px] border border-white/[0.09] bg-white/[0.025] p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlarmClock size={16} className="text-slate-400" />
                <h3 className="text-sm font-medium text-slate-200">Your focus flow</h3>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Focus", detail: "25 minutes", icon: Target, color: "text-violet-300" },
                  { title: "Short break", detail: "5 minutes", icon: Coffee, color: "text-emerald-300" },
                  { title: "Repeat", detail: "Build your rhythm", icon: ArrowRight, color: "text-indigo-300" },
                ].map((item, index) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${item.color}`}>
                      {index === 2 ? <item.icon size={16} /> : <item.icon size={16} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-200">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{item.detail}</p>
                    </div>
                    {index < 2 && <Check size={13} className="text-slate-600" />}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[11px] tracking-wide text-slate-600">
            Made for deep work, one session at a time.
          </p>
        </footer>
      </div>
    </main>
  );
}