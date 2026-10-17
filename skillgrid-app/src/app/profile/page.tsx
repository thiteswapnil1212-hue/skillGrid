"use client";

import { useState, type FormEvent } from "react";
import {
  UserRound,
  Mail,
  GraduationCap,
  Code2,
  Globe,
  Save,
  Link2,
  CheckCircle2,
  Pencil,
  FileText,
} from "lucide-react";

type ProfileData = {
  name: string;
  email: string;
  college: string;
  course: string;
  year: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
};

const initialProfile: ProfileData = {
  name: "",
  email: "",
  college: "",
  course: "",
  year: "",
  bio: "",
  github: "",
  linkedin: "",
  website: "",
};

const cardClass =
  "rounded-3xl border border-[#E8E5DB] bg-white shadow-[0_1px_2px_rgba(74,60,32,0.05),0_12px_32px_-16px_rgba(74,60,32,0.14)]";

const inputClass =
  "w-full rounded-xl border border-[#E8E5DB] bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/15";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

const iconTileClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [saved, setSaved] = useState(false);

  function updateField(key: keyof ProfileData, value: string) {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  const fields: {
    key: "name" | "email" | "college" | "course";
    label: string;
    placeholder: string;
    icon: typeof UserRound;
    type?: string;
  }[] = [
    {
      key: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
      icon: UserRound,
    },
    {
      key: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      icon: Mail,
      type: "email",
    },
    {
      key: "college",
      label: "College / University",
      placeholder: "Enter your college name",
      icon: GraduationCap,
    },
    {
      key: "course",
      label: "Course / Branch",
      placeholder: "e.g. B.E. Artificial Intelligence",
      icon: Code2,
    },
  ];

  const socialFields: {
    key: "github" | "linkedin" | "website";
    label: string;
    placeholder: string;
    icon: typeof Link2;
  }[] = [
    {
      key: "github",
      label: "GitHub Profile",
      placeholder: "https://github.com/username",
      icon: Code2,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      placeholder: "https://linkedin.com/in/username",
      icon: Link2,
    },
    {
      key: "website",
      label: "Personal Website",
      placeholder: "https://yourwebsite.com",
      icon: Globe,
    },
  ];

  const detailsFilled = [profile.name, profile.email, profile.college, profile.course, profile.year].filter(
    (value) => value.trim()
  ).length;
  const linksFilled = [profile.github, profile.linkedin, profile.website].filter(
    (value) => value.trim()
  ).length;

  const metaItems = [
    profile.email || "Email not added",
    profile.college || "College not added",
    profile.course || "Course not added",
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="border-b border-[#E8E5DB] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
          Account
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Manage your personal information and social links.
        </p>
      </section>

      {/* Header card */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="relative h-28 bg-[#EAF0FA]" aria-hidden="true">
          <div className="absolute -left-10 -top-16 h-48 w-48 rounded-full bg-white/40" />
          <div className="absolute -right-8 top-6 h-32 w-32 rounded-full bg-[#3B5998]/10" />
          <div className="absolute left-1/3 bottom-0 h-20 w-20 rounded-full bg-white/30" />
        </div>

        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#EAF0FA] text-[#3B5998] ring-4 ring-white">
                <UserRound size={42} strokeWidth={1.5} />
              </div>
              <div className="pb-1">
                <h2 className="break-words text-3xl font-semibold tracking-tight text-slate-900">
                  {profile.name.trim() || "Your Name"}
                </h2>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6B7280]">
                  {metaItems.map((item, index) => (
                    <span key={index} className="flex items-center gap-2">
                      {index > 0 && (
                        <span className="h-1 w-1 rounded-full bg-[#E8E5DB]" aria-hidden="true" />
                      )}
                      <span className="break-all">{item}</span>
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <a
              href="#profile-form"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E8E5DB] bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Profile
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 divide-x divide-[#E8E5DB] border-t border-[#E8E5DB] pt-6">
            <div className="px-2 text-center">
              <p className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {detailsFilled}
                <span className="text-lg text-[#9AA0A6]">/5</span>
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Details
              </p>
            </div>
            <div className="px-2 text-center">
              <p className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {linksFilled}
                <span className="text-lg text-[#9AA0A6]">/3</span>
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Links
              </p>
            </div>
            <div className="px-2 text-center">
              <p className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                {profile.bio.length}
                <span className="text-lg text-[#9AA0A6]">/500</span>
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Bio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Personal information */}
        <section className={`${cardClass} p-6 sm:p-8`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
              01
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className={`${iconTileClass} bg-[#EAF0FA] text-[#3B5998]`}>
                <UserRound size={20} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Personal Information
              </h2>
            </div>
            <p className="mt-2 text-xs text-[#9AA0A6]">Update your basic profile details.</p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label className={labelClass} htmlFor={field.key}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <Icon
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id={field.key}
                      type={field.type || "text"}
                      value={profile[field.key]}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              );
            })}

            <div>
              <label className={labelClass} htmlFor="year">
                Current Year
              </label>
              <select
                id="year"
                value={profile.year}
                onChange={(event) => updateField("year", event.target.value)}
                className={inputClass}
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>
        </section>

        {/* About */}
        <section className={`${cardClass} p-6 sm:p-8`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
              02
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className={`${iconTileClass} bg-[#F3E8FF] text-[#7C3AED]`}>
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                About Me
              </h2>
            </div>
          </div>

          <div className="mt-6">
            <label className={labelClass} htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              maxLength={500}
              value={profile.bio}
              onChange={(event) => updateField("bio", event.target.value)}
              placeholder="Write a little about yourself, your goals, and what you're learning..."
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-[#9AA0A6] tabular-nums">
              {profile.bio.length}/500
            </p>
          </div>
        </section>

        {/* Social links */}
        <section className={`${cardClass} p-6 sm:p-8`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3B5998]">
              03
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className={`${iconTileClass} bg-[#EAF7EC] text-[#2F9E44]`}>
                <Link2 size={20} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Social Links
              </h2>
            </div>
            <p className="mt-2 text-xs text-[#9AA0A6]">Add your professional profiles.</p>
          </div>

          <div className="mt-6 space-y-5">
            {socialFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label className={labelClass} htmlFor={field.key}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <Icon
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id={field.key}
                      type="url"
                      value={profile[field.key]}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Save bar */}
        <div
          className={`${cardClass} flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="min-h-5">
            {saved && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle2 size={16} />
                Changes saved for this session.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-white transition hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
          >
            <Save size={17} />
            Saved Changes
          </button>
        </div>
      </form>
    </div>
  );
}
