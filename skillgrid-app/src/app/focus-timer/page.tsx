
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const completedRef = useRef(false);

  const totalMs = MODES[mode].duration * 1000;
  const progress = Math.max(0, Math.min(1, remainingMs / totalMs));
  const offset = CIRCUMFERENCE * (1 - progress);

  const changeMode = useCallback((nextMode: Mode) => {
    setMode(nextMode);
    setRemainingMs(MODES[nextMode].duration * 1000);
    setRunning(false);
    setEndAt(null);
    setSessionComplete(false);
    completedRef.current = false;
  }, []);

  const completeSession = useCallback(() => {
    setSessionComplete(true);

    if (mode === "focus") {
      setCompletedSessions((count) => count + 1);
      changeMode("short");
    } else {
      changeMode("focus");
    }

    setSessionComplete(true);
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
    completedRef.current = false;
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

  return (
    <main className="relative min-h-full overflow-hidden bg-background text-foreground">
      {/* Subtle theme-aware ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[110px]" />
        <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-primary/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
        {/* Header */}
        <header className="mb-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-sm">
              <Target size={21} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </header>

        {/* Intro */}
        <section className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles size={14} className="text-primary" />
            Your little corner of calm
          </div>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make time for{" "}
            <span className="text-primary">what matters.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Find your rhythm, quiet the noise, and give your next goal your
            full attention.
          </p>
        </section>

        {/* Main layout */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_290px]">
          {/* Timer card */}
          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Mode selector */}
            <div className="mx-auto mb-8 flex max-w-md rounded-2xl border border-border bg-muted/50 p-1.5">
              {modeItems.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => changeMode(key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-medium transition-all duration-300 sm:text-sm ${
                    mode === key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Animated timer */}
            <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center py-2">
              <div
                className={`pointer-events-none absolute h-64 w-64 rounded-full bg-primary/[0.07] blur-[65px] transition-transform duration-1000 sm:h-72 sm:w-72 ${
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
                  strokeOpacity="0.07"
                  strokeWidth="6"
                />

                <circle
                  cx="160"
                  cy="160"
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.04"
                  strokeWidth="12"
                />

                <circle
                  cx="160"
                  cy="160"
                  r={RADIUS}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  style={{
                    transition: "stroke-dashoffset 80ms linear",
                    filter: running
                      ? "drop-shadow(0 0 8px var(--primary))"
                      : "none",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      running
                        ? "animate-pulse bg-emerald-500"
                        : "bg-primary"
                    }`}
                  />
                  {running ? "In the zone" : MODES[mode].label}
                </div>

                <div
                  role="timer"
                  aria-live="off"
                  className="font-mono text-5xl font-light tracking-[-0.07em] tabular-nums text-foreground sm:text-7xl"
                >
                  {formatTime(remainingMs)}
                </div>

                <p className="mt-4 max-w-[220px] text-center text-xs leading-5 text-muted-foreground">
                  {MODES[mode].subtitle}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={resetTimer}
                aria-label="Reset timer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-90"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={toggleTimer}
                className="group flex h-14 min-w-0 flex-1 max-w-[220px] items-center justify-center gap-3 rounded-2xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-95 hover:shadow-md active:scale-[0.97]"
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
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-90"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              {running
                ? "Stay present. Every minute counts."
                : "Ready when you are. No rush."}
            </p>

            {sessionComplete && (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CheckCircle2 size={17} className="text-primary" />
                Session complete! Take a moment to recharge.
              </div>
            )}
          </section>

          {/* Side panel */}
          <aside className="flex flex-col gap-5">
            {/* Session progress */}
            <section className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session rhythm</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your focus cycle
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
                  <Flame size={19} />
                </div>
              </div>

              <div className="mb-4 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight">
                  {completedSessions}
                </span>
                <span className="mb-1 text-xs text-muted-foreground">
                  sessions completed
                </span>
              </div>

              <div className="flex gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      index < currentSession
                        ? "bg-primary shadow-sm"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {completedSessions === 0
                  ? "Complete a focus session to start your rhythm."
                  : `${currentSession} of 4 sessions in your current cycle.`}
              </p>
            </section>

            {/* Reminder */}
            <section className="relative overflow-hidden rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.06] blur-3xl" />

              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
                  <Zap size={19} />
                </div>

                <h3 className="text-sm font-semibold">A gentle reminder</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  You don&apos;t need to do everything today. Just focus on
                  the next small step.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-primary">
                  <Sparkles size={14} />
                  Progress over perfection
                </div>
              </div>
            </section>

            {/* Quick guide */}
            <section className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <AlarmClock size={16} className="text-muted-foreground" />
                <h3 className="text-sm font-medium">Your focus flow</h3>
              </div>

              <div className="space-y-4">
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
                    <div key={item.title} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{item.title}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>

                      {index < 2 && (
                        <Check size={13} className="text-muted-foreground/50" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[11px] tracking-wide text-muted-foreground">
            Made for deep work, one session at a time.
          </p>
        </footer>
      </div>
    </main>
  );
}