import type { Metadata } from "next";
import { Award, Briefcase, Code2, GraduationCap } from "lucide-react";

import Education from "@/components/about/education";
import Experiences from "@/components/about/experiences";
import Skills from "@/components/about/skills";
import { EducationList } from "@/lib/data/education";
import { ExperiencesList } from "@/lib/data/experiences";
import { skillsItems } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "About — Experience & Capabilities",
  description:
    "Enstso JANVIER's software engineering, applied AI, data, cloud-platform experience, education and current professional learning.",
  alternates: { canonical: "/about" },
};

const certifications = [
  { name: "MOOC ANSSI", status: "Completed" },
  { name: "Certified Kubernetes Administrator (CKA)", status: "In progress" },
  { name: "Microsoft Azure Fundamentals (AZ-900)", status: "In progress" },
] as const;

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:via-blue-400 dark:to-white sm:mb-6 sm:text-4xl md:text-5xl">
            Professional Profile
          </h1>
          <p className="px-2 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Technical-functional profile combining software engineering, applied AI, data and cloud-native systems. I work from requirements and system design through implementation, testing, deployment and continuous improvement.
          </p>
          <p className="mt-3 px-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            My strongest work sits at the intersection of engineering execution, product understanding and scalable technical solutions.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16">
          <AboutSection icon={Code2} title="Skills & Capabilities">
            <Skills list={skillsItems} />
          </AboutSection>

          <AboutSection icon={Briefcase} title="Professional Experience">
            <Experiences items={ExperiencesList} />
          </AboutSection>

          <AboutSection icon={GraduationCap} title="Education">
            <Education items={EducationList} />
          </AboutSection>

          <AboutSection icon={Award} title="Certifications & Learning">
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {certifications.map((certification) => (
                <article key={certification.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${certification.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}`}>
                    {certification.status}
                  </span>
                </article>
              ))}
            </div>
          </AboutSection>
        </div>
      </div>
    </div>
  );
}

type AboutSectionProps = {
  icon: typeof Code2;
  title: string;
  children: React.ReactNode;
};

function AboutSection({ icon: Icon, title, children }: AboutSectionProps) {
  const headingId = title.toLowerCase().replaceAll(" ", "-").replace("&", "and");
  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex items-center gap-3 px-2 sm:mb-8 sm:gap-4">
        <div className="flex-shrink-0 rounded-lg bg-blue-600 p-2 shadow-sm sm:p-3">
          <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" aria-hidden="true" />
        </div>
        <h2 id={headingId} className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
