"use client";

import { uid } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Plus,
  Search,
  X,
  Inbox,
  Award,
  AlarmClock,
  ListTodo,
} from "lucide-react";

type NotificationType = "Task" | "Achievement" | "Reminder" | "General";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
};

const notificationTypes: NotificationType[] = [
  "Task",
  "Achievement",
  "Reminder",
  "General",
];

const typeStyles: Record<NotificationType, string> = {
  Task: "bg-[#EAF0FA] text-[#3B5998]",
  Achievement: "bg-[#FFF7E0] text-[#B97E0C]",
  Reminder: "bg-[#F3E8FF] text-[#7C3AED]",
  General: "bg-slate-100 text-slate-600",
};

const typeIconTile: Record<NotificationType, { icon: typeof Bell; tile: string }> = {
  Task: { icon: ListTodo, tile: "bg-[#EAF0FA] text-[#3B5998]" },
  Achievement: { icon: Award, tile: "bg-[#FFF7E0] text-[#B97E0C]" },
  Reminder: { icon: AlarmClock, tile: "bg-[#F3E8FF] text-[#7C3AED]" },
  General: { icon: Bell, tile: "bg-slate-100 text-slate-500" },
};

const cardClass =
  "rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";

const inputClass =
  "w-full rounded-xl border border-[#E8E5DB] bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15";

const filters = ["All", "Unread", "Read"] as const;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("General");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && !item.read) ||
        (filter === "Read" && item.read);

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const grouped = useMemo(() => {
    const now = new Date().toDateString();
    const today: NotificationItem[] = [];
    const earlier: NotificationItem[] = [];
    filteredNotifications.forEach((item) => {
      if (new Date(item.createdAt).toDateString() === now) {
        today.push(item);
      } else {
        earlier.push(item);
      }
    });
    return [
      { label: "Today", items: today },
      { label: "Earlier", items: earlier },
    ];
  }, [filteredNotifications]);

  function addNotification(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotification: NotificationItem = {
      id: uid(),
      title: title.trim(),
      message: message.trim(),
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setTitle("");
    setMessage("");
    setType("General");
    setShowForm(false);
  }

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }

  function deleteNotification(id: string) {
    setNotifications((prev) => prev.filter((item) => id !== item.id));
  }

  function clearAll() {
    setNotifications([]);
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          Updates
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Keep track of reminders, tasks, and important updates.
            </p>
          </div>
          <button
            onClick={() => setShowForm((value) => !value)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Close form" : "Add Notification"}
          </button>
        </div>
      </section>

      {/* Bento stats — asymmetric: wide white card + dark contrast card */}
      <div className="grid gap-4 sm:grid-cols-5">
        <div className={`${cardClass} p-6 sm:col-span-3`}>
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
              <Bell size={20} />
            </div>
            <span className="rounded-full bg-[#EAF0FA] px-2.5 py-1 text-[11px] font-semibold text-[#3B5998]">
              Inbox
            </span>
          </div>
          <p className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {notifications.length}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Total notifications
          </p>
        </div>

        <div className="rounded-3xl bg-[#1E293B] p-6 text-white sm:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300/70">
            Needs attention
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight tabular-nums">
            {unreadCount}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300/70">
            Unread
          </p>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={addNotification} className={`${cardClass} space-y-5 p-6`}>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Create a notification
            </h2>
          </div>

          <div>
            <label
              htmlFor="notif-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Title *
            </label>
            <input
              id="notif-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="notif-message"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Message *
            </label>
            <textarea
              id="notif-message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification..."
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label
              htmlFor="notif-category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              id="notif-category"
              value={type}
              onChange={(e) => setType(e.target.value as NotificationType)}
              className={inputClass}
            >
              {notificationTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-6 text-sm font-medium text-white transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Create Notification
            </button>
          </div>
        </form>
      )}

      {/* Toolbar */}
      <div className={`${cardClass} space-y-4 p-4`}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              aria-label="Search notifications"
              className="w-full rounded-xl border border-[#E8E5DB] bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15"
            />
          </div>

          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E8E5DB] bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <CheckCheck size={16} />
                Mark all read
              </button>

              <button
                onClick={clearAll}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E8E5DB] bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Trash2 size={16} />
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notifications">
          {filters.map((option) => {
            const active = filter === option;
            const count =
              option === "All"
                ? notifications.length
                : option === "Unread"
                  ? unreadCount
                  : notifications.length - unreadCount;
            return (
              <button
                key={option}
                onClick={() => setFilter(option)}
                aria-pressed={active}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
                  active
                    ? "bg-[#3B5998] text-white shadow-sm"
                    : "border border-[#E8E5DB] bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {option}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      {filteredNotifications.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#E8E5DB] bg-white/60 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FA] text-[#3B5998]">
            <Inbox size={25} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {notifications.length === 0
              ? "You're all caught up"
              : "No notifications found"}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
            {notifications.length === 0
              ? "Your notifications will appear here. You can add a reminder or update manually."
              : "Try changing your search or filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(
            (group) =>
              group.items.length > 0 && (
                <section key={group.label}>
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        {group.label}
                      </h2>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 tabular-nums">
                        {group.items.length}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => {
                      const Icon = typeIconTile[item.type].icon;
                      return (
                        <article
                          key={item.id}
                          className={`flex gap-4 rounded-2xl border border-[#E8E5DB] bg-white p-4 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(74,60,32,0.06),0_16px_40px_-16px_rgba(74,60,32,0.2)] ${
                            !item.read ? "bg-[#EAF0FA]/50" : ""
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${typeIconTile[item.type].tile}`}
                          >
                            <Icon size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-slate-900">
                                {item.title}
                              </h3>
                              {!item.read && (
                                <span
                                  className="h-2 w-2 rounded-full bg-[#3B5998]"
                                  aria-hidden="true"
                                />
                              )}
                            </div>

                            <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-slate-600">
                              {item.message}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${typeStyles[item.type]}`}
                              >
                                {item.type}
                              </span>
                              <span className="text-xs text-[#9AA0A6]">
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-start gap-1">
                            {!item.read && (
                              <button
                                onClick={() => markAsRead(item.id)}
                                aria-label="Mark as read"
                                title="Mark as read"
                                className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                              >
                                <Check size={17} />
                              </button>
                            )}

                            <button
                              onClick={() => deleteNotification(item.id)}
                              aria-label="Delete notification"
                              title="Delete notification"
                              className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )
          )}
        </div>
      )}
    </div>
  );
}
