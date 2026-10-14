"use client";

import { useState } from "react";
import { Bell, Palette, User, Moon, Monitor, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

function Toggle({
  label,
  description,
  defaultOn = false,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((value) => !value)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          on ? "bg-primary" : "bg-slate-200"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
            on ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <section className="border-b border-slate-200 pb-6">
        <p className="text-sm font-medium text-primary">Settings</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Preferences
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Manage your account settings, appearance, and notifications.
        </p>
      </section>

      <div className="space-y-6">
        {/* Account Section */}
        <Card>
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2">
              <User size={18} className="text-primary" />
              Account Settings
            </CardTitle>
            <p className="text-sm text-slate-500 font-normal mt-1">Update your personal information and security preferences.</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="font-medium text-slate-900">Email Address</p>
                <p className="text-sm text-slate-500">student@example.com</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 3 months ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card>
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2">
              <Palette size={18} className="text-primary" />
              Appearance
            </CardTitle>
            <p className="text-sm text-slate-500 font-normal mt-1">Customize how SkillGrid looks on your device.</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary bg-primary-light p-3 transition-transform active:scale-[0.98] sm:p-4">
                <Sun size={24} className="text-primary" />
                <span className="text-sm font-medium text-slate-900">Light</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 transition-transform hover:border-slate-300 active:scale-[0.98] sm:p-4">
                <Moon size={24} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-600">Dark</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 transition-transform hover:border-slate-300 active:scale-[0.98] sm:p-4">
                <Monitor size={24} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-600">System</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} className="text-primary" />
              Notifications
            </CardTitle>
            <p className="text-sm text-slate-500 font-normal mt-1">Choose what updates you want to receive.</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Toggle
              label="Push Notifications"
              description="Receive alerts on this device"
              defaultOn
            />
            <div className="border-t border-slate-100 my-2 pt-4">
              <Toggle
                label="Email Digests"
                description="Weekly summary of your progress"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
