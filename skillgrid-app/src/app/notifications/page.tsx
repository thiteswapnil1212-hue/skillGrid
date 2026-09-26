
"use client";

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
  Circle,
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
  Task: "bg-blue-50 text-blue-700",
  Achievement: "bg-amber-50 text-amber-700",
  Reminder: "bg-violet-50 text-violet-700",
  General: "bg-slate-100 text-slate-600",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

  function addNotification(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotification: NotificationItem = {
      id: crypto.randomUUID(),
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
    setNotifications((prev) => prev.filter((item) => item.id !== id));
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Bell size={16} />
            Updates
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of reminders, tasks, and important updates.
          </p>
        </div>

        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5998] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#304a80]"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close form" : "Add Notification"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total notifications</p>
            <Bell size={19} className="text-[#3B5998]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Unread notifications</p>
            <Circle size={19} className="text-[#3B5998]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {unreadCount}
          </p>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={addNotification}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <h2 className="font-semibold text-slate-900">
            Create a notification
          </h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Message *
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification..."
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as NotificationType)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3B5998]"
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
              className="rounded-lg bg-[#3B5998] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#304a80]"
            >
              Create Notification
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#3B5998]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none"
        >
          <option value="All">All notifications</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
        </select>

        {notifications.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>

            <button
              onClick={clearAll}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Clear all
            </button>
          </div>
        )}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#3B5998]">
            <Inbox size={25} />
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">
            {notifications.length === 0
              ? "You're all caught up"
              : "No notifications found"}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            {notifications.length === 0
              ? "Your notifications will appear here. You can add a reminder or update manually."
              : "Try changing your search or filter."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {filteredNotifications.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-4 p-5 ${
                index !== filteredNotifications.length - 1
                  ? "border-b border-slate-100"
                  : ""
              } ${!item.read ? "bg-blue-50/30" : ""}`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3B5998]">
                <Bell size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-[#3B5998]" />
                  )}
                </div>

                <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-slate-600">
                  {item.message}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${typeStyles[item.type]}`}
                  >
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-400">
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
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <Check size={17} />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(item.id)}
                  aria-label="Delete notification"
                  title="Delete notification"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}