import { Bell, Palette, User, Shield, Moon, Monitor, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
              <Button variant="ghost" size="sm" className="text-primary">Edit</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 3 months ago</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">Update</Button>
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
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary bg-primary-light p-4">
                <Sun size={24} className="text-primary" />
                <span className="text-sm font-medium text-slate-900">Light</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300">
                <Moon size={24} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-600">Dark</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300">
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
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-slate-900">Push Notifications</p>
                <p className="text-sm text-slate-500">Receive alerts on this device</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
              </div>
            </label>
            <div className="border-t border-slate-100 my-2 pt-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-slate-900">Email Digests</p>
                  <p className="text-sm text-slate-500">Weekly summary of your progress</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
                  <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition" />
                </div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
