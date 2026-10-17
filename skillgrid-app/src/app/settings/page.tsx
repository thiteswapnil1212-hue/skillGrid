"use client";

import { useState } from "react";
import {
  Bell,
  Palette,
  User,
  Moon,
  Monitor,
  Sun,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const cardClass =
  "rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <span className="flex h-12 w-16 shrink-0 items-center justify-center">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((value) => !value)}
        className={cn(
          "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          on ? "bg-primary" : "bg-slate-200"
        )}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
            on ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>
    </span>
  );
}

function SectionHeader({
  icon,
  tile,
  title,
  hint,
}: {
  icon: React.ReactNode;
  tile: string;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tile}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        {hint ? <p className="mt-1 text-xs text-[#9AA0A6]">{hint}</p> : null}
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  tile,
  label,
  description,
  control,
}: {
  icon: React.ReactNode;
  tile: string;
  label: string;
  description: string;
  control?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-2 sm:px-6">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tile}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-900">{label}</p>
        {description ? (
          <p className="mt-0.5 text-sm text-[#6B7280]">{description}</p>
        ) : null}
      </div>
      {control}
    </div>
  );
}

const themes = [
  { key: "Light", icon: Sun, tile: "bg-[#EAF0FA] text-[#3B5998]", active: true },
  { key: "Dark", icon: Moon, tile: "bg-slate-100 text-slate-600", active: false },
  { key: "System", icon: Monitor, tile: "bg-slate-100 text-slate-600", active: false },
] as const;

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          Settings
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          Preferences
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Manage your account settings, appearance, and notifications.
        </p>
      </section>

      {/* Account */}
      <Card className={cn(cardClass, "p-6 sm:p-8")}>
        <SectionHeader
          icon={<User size={20} />}
          tile="bg-[#EAF0FA] text-[#3B5998]"
          title="Account Settings"
          hint="Update your personal information and security preferences."
        />
        <div className="mt-6 divide-y divide-[#E8E5DB] rounded-2xl border border-[#E8E5DB]">
          <SettingRow
            icon={<Mail size={20} />}
            tile="bg-[#EAF0FA] text-[#3B5998]"
            label="Email Address"
            description="student@example.com"
          />
          <SettingRow
            icon={<Lock size={20} />}
            tile="bg-[#F3E8FF] text-[#7C3AED]"
            label="Password"
            description="Last changed 3 months ago"
          />
        </div>
      </Card>

      {/* Appearance */}
      <Card className={cn(cardClass, "p-6 sm:p-8")}>
        <SectionHeader
          icon={<Palette size={20} />}
          tile="bg-[#FFF7E0] text-[#B97E0C]"
          title="Appearance"
          hint="Customize how SkillGrid looks on your device."
        />
        <div className="mt-6 grid grid-cols-3 gap-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.key}
                aria-pressed={theme.active}
                className={`flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition active:scale-[0.98] ${
                  theme.active
                    ? "border-[#3B5998] bg-[#EAF0FA]/50"
                    : "border-[#E8E5DB] bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.tile}`}
                >
                  <Icon size={22} />
                </span>
                <span
                  className={`text-sm font-semibold ${theme.active ? "text-slate-900" : "text-slate-600"}`}
                >
                  {theme.key}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Notifications */}
      <Card className={cn(cardClass, "p-6 sm:p-8")}>
        <SectionHeader
          icon={<Bell size={20} />}
          tile="bg-[#EAF7EC] text-[#2F9E44]"
          title="Notifications"
          hint="Choose what updates you want to receive."
        />
        <div className="mt-6 divide-y divide-[#E8E5DB] rounded-2xl border border-[#E8E5DB]">
          <SettingRow
            icon={<Bell size={20} />}
            tile="bg-[#EAF0FA] text-[#3B5998]"
            label="Push Notifications"
            description="Receive alerts on this device"
            control={<Toggle label="Push Notifications" defaultOn />}
          />
          <SettingRow
            icon={<Mail size={20} />}
            tile="bg-[#FFF7E0] text-[#B97E0C]"
            label="Email Digests"
            description="Weekly summary of your progress"
            control={<Toggle label="Email Digests" />}
          />
        </div>
      </Card>

      {/* Privacy */}
      <Card className={cn(cardClass, "p-6 sm:p-8")}>
        <SectionHeader
          icon={<ShieldCheck size={20} />}
          tile="bg-[#F3E8FF] text-[#7C3AED]"
          title="Privacy"
          hint=""
        />
        <div className="mt-6 divide-y divide-[#E8E5DB] rounded-2xl border border-[#E8E5DB]">
          <SettingRow
            icon={<Eye size={20} />}
            tile="bg-[#EAF0FA] text-[#3B5998]"
            label="Public Profile"
            description="Let others discover you on the leaderboard"
            control={<Toggle label="Public Profile" />}
          />
          <SettingRow
            icon={<ShieldCheck size={20} />}
            tile="bg-[#F3E8FF] text-[#7C3AED]"
            label="Share Activity"
            description=""
            control={<Toggle label="Share Activity" defaultOn />}
          />
        </div>
      </Card>

      {/* Danger zone */}
      <section className="rounded-3xl border border-[#F3C2C2] bg-[#FEF2F2] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDE2E2] text-[#DC2626]">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#991B1B]">
              Danger Zone
            </h2>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#DC2626] px-6 text-sm font-semibold text-white transition hover:bg-[#B91C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40 focus-visible:ring-offset-2"
        >
          <RotateCcw size={16} />
          Reset session data
        </button>
      </section>
    </div>
  );
}
