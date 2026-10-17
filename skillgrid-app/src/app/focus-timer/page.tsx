"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlarmClock,
  ArrowRight,
  Check,
  Coffee,
  Flame,
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
  CheckCircle2,
} from "lucide-react";

type Mode = "focus" | "short" | "long";

const MODES: Record<
  Mode,
  { label: string; duration: number; subtitle: string }
> = {
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

function formatTime(ms: number) {
  const safeMs = Math.max(0, ms);
  const mins = Math.floor(safeMs / 60_000);
  const secs = Math.floor((safeMs % 60_000) / 1000);
  const centis = Math.floor((safeMs % 1000) / 10);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}.${String(centis).padStart(2, "0")}`;
}

export default function FocusTimerPage() {
  const [mode, setMode] = useState<Mode>("focus");
  const [remainingMs, setRemainingMs] = useState(
    MODES.focus.duration * 1000
  );
  const [running, setRunning] = useState(false);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const totalMs = MODES[mode].duration * 1000;
  const progress = Math.max(0, Math.min(1, remainingMs / totalMs));
  const offset = CIRCUMFERENCE * (1 - progress);

  const changeMode = useCallback((nextMode: Mode) => {
    setMode(nextMode);
    setRemainingMs(MODES[nextMode].duration * 1000);
    setRunning(false);
    setEndAt(null);
    setSessionComplete(false);
  }, []);

  const completeSession = useCallback(() => {
    setSessionComplete(true);

    if (mode === "focus") {
      setCompletedSessions((count) => count + 1);
      changeMode("short");
    } else {
      changeMode("focus");
    }
  }, [mode, changeMode]);

  useEffect(() => {
    if (!running || endAt === null) return;

    let completed = false;

    const tick = () => {
      const next = Math.max(0, endAt - Date.now());
      setRemainingMs(next);

      if (next <= 0 && !completed) {
        completed = true;
        setRunning(false);
        setEndAt(null);
        completeSession();
      }
    };

    tick();

    const interval = window.setInterval(tick, 10);

    return () => window.clearInterval(interval);
  }, [running, endAt, completeSession]);

  const toggleTimer = () => {
    setSessionComplete(false);

    if (running) {
      setRunning(false);
      setEndAt(null);
    } else {
      setEndAt(Date.now() + remainingMs);
      setRunning(true);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setEndAt(null);
    setRemainingMs(totalMs);
    setSessionComplete(false);
  };

  const skipTimer = () => {
    changeMode(mode === "focus" ? "short" : "focus");
  };

  const sessionsUntilLongBreak = completedSessions % 4;
  const currentSession =
    sessionsUntilLongBreak === 0 && completedSessions > 0
      ? 4
      : sessionsUntilLongBreak;

  const modeItems = [
    { key: "focus" as const, label: "Focus", Icon: Target },
    { key: "short" as const, label: "Short break", Icon: Coffee },
    { key: "long" as const, label: "Long break", Icon: Moon },
  ];

  const modeTile: Record<Mode, string> = {
    focus: "bg-[#EAF0FA] text-[#3B5998]",
    short: "bg-[#EAF7EC] text-[#2F9E44]",
    long: "bg-[#F3E8FF] text-[#7C3AED]",
  };

  return (
    <main className="relative min-h-full overflow-hidden bg-[#F7F6F2]">
      {/* Subtle warm ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[110px]" />
        <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-primary/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
        {/* Hero */}
        <section className="border-b border-[#E8E5DB] pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                <Target size={21} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
                  SkillGrid
                </p>
                <h1 className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">
                  Focus Studio
                </h1>
              </div>
            </div>

            <button
              onClick={() => setSoundEnabled((value) => !value)}
              aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8E5DB] bg-white text-slate-500 transition-all duration-200 hover:text-slate-900 active:scale-95"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-8 mt-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8E5DB] bg-white px-4 py-2 text-xs font-medium text-[#6B7280] shadow-sm">
            <Sparkles size={14} className="text-[#3B5998]" />
            Your little corner of calm
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Make time for{" "}
            <span className="italic text-[#3B5998]">what matters.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280] sm:text-base">
            Find your rhythm, quiet the noise, and give your next goal your
            full attention.
          </p>
        </section>

        {/* 01 · Session — dark ambient timer card */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">01 · Session</p>
        <section className="relative mt-3 overflow-hidden rounded-3xl bg-[#1E293B] p-6 text-white shadow-[0_24px_60px_-24px_rgba(30,41,59,0.5)] sm:p-10">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#3B5998]/30 blur-[100px]" />

          {/* Mode selector */}
          <div className="relative mx-auto mb-8 flex max-w-md gap-1 rounded-2xl bg-white/10 p-1.5">
            {modeItems.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => changeMode(key)}
                className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  mode === key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Animated timer */}
          <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-2 text-white">
            <div
              className={`pointer-events-none absolute h-64 w-64 rounded-full bg-[#3B5998]/25 blur-[65px] transition-transform duration-1000 sm:h-72 sm:w-72 ${
                running ? "scale-110 animate-pulse" : "scale-100"
              }`}
            />

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
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="6"
              />

              <circle
                cx="160"
                cy="160"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.06"
                strokeWidth="12"
              />

              <circle
                cx="160"
                cy="160"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                className="text-[#93B4E8]"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                style={{
                  transition: "stroke-dashoffset 80ms linear",
                  filter: running
                    ? "drop-shadow(0 0 8px rgba(147,180,232,0.8))"
                    : "none",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                <span
                  className={`h-2 w-2 rounded-full ${
                    running
                      ? "animate-pulse bg-emerald-400"
                      : "bg-[#93B4E8]"
                  }`}
                />
                {running ? "In the zone" : MODES[mode].label}
              </div>

              <div
                role="timer"
                aria-live="off"
                className="text-7xl font-semibold tracking-tight tabular-nums text-white sm:text-8xl"
              >
                {formatTime(remainingMs)}
              </div>

              <p className="mt-4 max-w-[220px] text-center text-xs leading-5 text-slate-300/70">
                {MODES[mode].subtitle}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="relative mt-7 flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={resetTimer}
              aria-label="Reset timer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={toggleTimer}
              className="flex h-16 min-w-0 flex-1 max-w-[240px] items-center justify-center gap-3 rounded-2xl bg-[#3B5998] px-5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            >
              {running ? (
                <Pause size={19} fill="currentColor" />
              ) : (
                <Play size={19} fill="currentColor" />
              )}
              {running ? "Pause session" : "Start focusing"}
            </button>

            <button
              onClick={skipTimer}
              aria-label="Skip current session"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <p className="relative mt-5 text-center text-[11px] text-slate-300/70">
            {running
              ? "Stay present. Every minute counts."
              : "Ready when you are. No rush."}
          </p>

          {sessionComplete && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              <CheckCircle2 size={17} className="text-emerald-400" />
              Session complete! Take a moment to recharge.
            </motion.div>
          )}
        </section>

        {/* 02 · Rhythm — stats row */}
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">02 · Rhythm</p>
        <section className="mt-3 grid grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-3xl border border-[#E8E5DB] bg-white p-4 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF7E0] text-[#B97E0C]">
              <Flame size={18} />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">{completedSessions}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Sessions</p>
          </div>
          <div className="rounded-3xl border border-[#E8E5DB] bg-white p-4 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
              <Target size={18} />
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    index < currentSession
                      ? "bg-[#3B5998]"
                      : "bg-[#F1EEE6]"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Cycle</p>
          </div>
          <div className="rounded-3xl border border-[#E8E5DB] bg-white p-4 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${modeTile[mode]}`}>
              {(() => {
                const Icon = modeItems.find((item) => item.key === mode)?.Icon ?? Target;
                return <Icon size={18} />;
              })()}
            </div>
            <p className="mt-3 truncate text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{MODES[mode].label}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Mode</p>
          </div>
        </section>

        {/* 03 · Notes */}
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">03 · Notes</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {/* Session history */}
          <section className="rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">Session history</h3>
            {completedSessions === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-[#E8E5DB] bg-white/60 px-4 py-8 text-center">
                <p className="text-sm text-[#6B7280]">No sessions yet</p>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#E8E5DB] bg-[#F7F6F2] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7EC] text-[#2F9E44]">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 tabular-nums">
                    {completedSessions} {completedSessions === 1 ? "session" : "sessions"}
                  </p>
                  <p className="mt-0.5 text-xs text-[#9AA0A6]">completed</p>
                </div>
              </div>
            )}
          </section>

          {/* Reminder */}
          <section className="relative overflow-hidden rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#3B5998]/[0.06] blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#7C3AED]">
                <Zap size={19} />
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-slate-900">A gentle reminder</h3>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                You don&apos;t need to do everything today. Just focus on
                the next small step.
              </p>

              <div className="mt-5 flex items-center gap-2 border-t border-[#E8E5DB] pt-4 text-xs font-semibold text-[#3B5998]">
                <Sparkles size={14} />
                Progress over perfection
              </div>
            </div>
          </section>

          {/* Focus flow */}
          <section className="rounded-3xl border border-[#E8E5DB] bg-white p-6 shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)] sm:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <AlarmClock size={16} className="text-[#9AA0A6]" />
              <h3 className="text-sm font-semibold text-slate-900">Your focus flow</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Focus",
                  detail: "25 minutes",
                  icon: Target,
                },
                {
                  title: "Short break",
                  detail: "5 minutes",
                  icon: Coffee,
                },
                {
                  title: "Repeat",
                  detail: "Build your rhythm",
                  icon: ArrowRight,
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-[#E8E5DB] bg-[#F7F6F2] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-[#9AA0A6]">
                        {item.detail}
                      </p>
                    </div>

                    {index < 2 && (
                      <Check size={13} className="text-[#9AA0A6]" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[11px] tracking-wide text-[#9AA0A6]">
            Made for deep work, one session at a time.
          </p>
        </footer>
      </div>
    </main>
  );
}
