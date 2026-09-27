import { Bell, Palette, User, Shield, Moon, Monitor, Sun } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <section className="border-b border-slate-200 pb-6">
        <p className="text-sm font-medium text-blue-700">Settings</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Preferences
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Manage your account settings, appearance, and notifications.
        </p>
      </section>

      <div className="space-y-6">
        {/* Account Section */}
        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <User size={18} className="text-blue-700" />
              <h2>Account Settings</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">Update your personal information and security preferences.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="font-medium text-slate-900">Email Address</p>
                <p className="text-sm text-slate-500">student@example.com</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 3 months ago</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Update</button>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <Palette size={18} className="text-blue-700" />
              <h2>Appearance</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">Customize how SkillGrid looks on your device.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-blue-600 bg-blue-50 p-4">
                <Sun size={24} className="text-blue-700" />
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
          </div>
        </section>

        {/* Notifications Section */}
        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <Bell size={18} className="text-blue-700" />
              <h2>Notifications</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">Choose what updates you want to receive.</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-slate-900">Push Notifications</p>
                <p className="text-sm text-slate-500">Receive alerts on this device</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
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
          </div>
        </section>
      </div>
    </main>
  );
}
