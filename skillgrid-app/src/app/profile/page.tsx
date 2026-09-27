
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

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/10";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

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

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-sm font-medium text-[#3B5998]">Account</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and social links.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#3B5998]/10 text-[#3B5998]">
                <UserRound size={42} strokeWidth={1.5} />
              </div>

              <h2 className="mt-4 break-words text-lg font-semibold text-slate-900">
                {profile.name.trim() || "Your Name"}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {profile.email || "Your email address"}
              </p>

              <div className="mt-5 w-full border-t border-slate-100 pt-5 text-left">
                <div className="flex items-start gap-3">
                  <GraduationCap
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-400">College</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-700">
                      {profile.college || "Not added"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <Code2
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-400">Course</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-700">
                      {profile.course || "Not added"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <GraduationCap
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-400">Current Year</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {profile.year || "Not added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
          >
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-[#3B5998]/10 p-2.5 text-[#3B5998]">
                  <UserRound size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Update your basic profile details.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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
                    onChange={(event) =>
                      updateField("year", event.target.value)
                    }
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

              <div className="mt-5">
                <label className={labelClass} htmlFor="bio">
                  About Me
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
                <p className="mt-1 text-right text-xs text-slate-400">
                  {profile.bio.length}/500
                </p>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-[#3B5998]/10 p-2.5 text-[#3B5998]">
                  <Link2 size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">Social Links</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Add your professional profiles.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
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

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3B5998] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#304a82] focus:outline-none focus:ring-2 focus:ring-[#3B5998]/30 focus:ring-offset-2"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}