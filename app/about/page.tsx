import type { Metadata } from "next";
import { Award, Briefcase, GraduationCap } from "lucide-react";

import Education from "@/components/about/education";
import Experiences from "@/components/about/experiences";
import Skills from "@/components/about/skills";
import { EducationList } from "@/lib/data/education";
import { ExperiencesList } from "@/lib/data/experiences";
import { skillsItems } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "About — Experience & Capabilities",
  description: "Enstso J's software engineering journey, enterprise experience, applied AI capabilities, cloud background and education.",
  alternates: { canonical: "/about" },
};

const certifications = {
  completed: [{ name: "MOOC ANSSI", detail: "Cybersecurity fundamentals" }],
  inProgress: [
    { name: "Certified Kubernetes Administrator (CKA)", detail: "In progress" },
    { name: "Microsoft Azure Fundamentals (AZ-900)", detail: "In progress" },
  ],
} as const;

export default function About() {
  return (
    <div>
      <header className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">About Enstso</p><h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">Engineering with context, curiosity and accountability.</h1></div>
        <div className="self-end border-l border-blue-300 pl-6 dark:border-blue-900 sm:pl-8">
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">I am a software engineer and AI builder with an enterprise engineering background and a growing specialization in agentic AI, cloud systems and solution delivery.</p>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">My work starts with understanding the business problem, then moves through architecture, implementation, testing and production realities. I value systems that are useful, explainable and maintainable.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-500"><span>Paris, France</span><span>English · French</span><span>Enterprise + Product</span></div>
        </div>
      </header>

      <AboutSection icon={Briefcase} eyebrow="Journey" title="Professional experience" description="A path from full-stack and infrastructure work to enterprise cloud systems and customer-facing AI engineering.">
        <Experiences items={ExperiencesList} />
      </AboutSection>

      <AboutSection icon={Award} eyebrow="Capabilities" title="Technical range, organized by outcome" description="The toolkit matters; how it is applied to architecture, delivery and operations matters more.">
        <Skills list={skillsItems} />
      </AboutSection>

      <AboutSection icon={GraduationCap} eyebrow="Foundation" title="Education" description="Formal software, cybersecurity and engineering study supporting continued hands-on learning.">
        <Education items={EducationList} />
      </AboutSection>

      <section className="border-t border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-950/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <p className="eyebrow">Certifications &amp; learning</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div><h2 className="text-lg font-semibold text-slate-950 dark:text-white">Completed</h2><div className="mt-4 border-t border-slate-200 dark:border-slate-800">{certifications.completed.map((item) => <div key={item.name} className="flex justify-between gap-4 border-b border-slate-200 py-4 dark:border-slate-800"><span className="font-medium">{item.name}</span><span className="text-sm text-emerald-700 dark:text-emerald-400">{item.detail}</span></div>)}</div></div>
            <div><h2 className="text-lg font-semibold text-slate-950 dark:text-white">In progress</h2><div className="mt-4 border-t border-slate-200 dark:border-slate-800">{certifications.inProgress.map((item) => <div key={item.name} className="flex justify-between gap-4 border-b border-slate-200 py-4 dark:border-slate-800"><span className="font-medium">{item.name}</span><span className="text-sm text-amber-700 dark:text-amber-400">{item.detail}</span></div>)}</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutSection({ icon: Icon, eyebrow, title, description, children }: { icon: typeof Briefcase; eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return <section className="border-t border-slate-200 dark:border-slate-800" aria-labelledby={id}><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr]"><div><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" /><p className="eyebrow">{eyebrow}</p></div><h2 id={id} className="section-title mt-4">{title}</h2></div><p className="max-w-2xl self-end text-sm leading-6 text-slate-600 dark:text-slate-400 md:justify-self-end">{description}</p></div>{children}</div></section>;
}
