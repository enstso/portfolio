import type { Metadata } from "next";
import { Award, Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

import Education from "@/components/about/education";
import Experiences from "@/components/about/experiences";
import Skills from "@/components/about/skills";
import { EducationList } from "@/lib/data/education";
import { ExperiencesList } from "@/lib/data/experiences";
import { skillsItems } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "About — Product, AI & Solution Engineering",
  description: "Enstso J is an AI Builder at Salesforce with a product- and solution-oriented approach spanning business analysis, software engineering, agentic AI and cloud architecture.",
  alternates: { canonical: "/about" },
};

const certifications = {
  completed: [{ name: "MOOC ANSSI", detail: "Cybersecurity fundamentals" }],
  inProgress: [
    { name: "Certified Kubernetes Administrator (CKA)", detail: "In progress" },
    { name: "Microsoft Azure Fundamentals (AZ-900)", detail: "In progress" },
  ],
} as const;

const volunteering = {
  role: "Volunteer Speaker & Tech Mentor",
  organization: "Independent Volunteering",
  field: "Education",
  period: "Sep 2026 – Present",
  summary:
    "Volunteering as a guest speaker and mentor in high schools, vocational programs (BTS), and higher education institutions to inspire students, promote equal opportunities, and support their academic and professional development.",
  contributions: [
    "Sharing my academic and professional journey, including my experience in software engineering and work-study programs.",
    "Introducing students to careers in technology, software development, cloud computing, and artificial intelligence.",
    "Encouraging students to pursue higher education and explore career opportunities in tech.",
    "Providing practical guidance on resume writing, LinkedIn profile optimization, and internship and apprenticeship applications.",
    "Engaging in discussions, answering questions, and offering career advice to help students build confidence and shape their professional goals.",
  ],
} as const;

export default function About() {
  return (
    <div>
      <header className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-24 lg:pt-24">
        <div><p className="eyebrow">About Enstso</p><h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">Connecting product, technology and business.</h1></div>
        <div className="self-end border-l border-blue-300 pl-6 dark:border-blue-900 sm:pl-8">
          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">I&apos;m an AI Builder and product- and solution-oriented technology professional working at the intersection of engineering, artificial intelligence and business.</p>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">My approach combines a strong engineering foundation with product thinking, business and functional analysis, solution architecture and collaborative delivery. From discovery and requirements through implementation, integration, deployment and continuous improvement, I focus on technology that creates practical, measurable value.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-500"><span>Paris, France</span><span>AI Builder @ Salesforce</span><span>Product × Technology × Business</span></div>
        </div>
      </header>

      <AboutSection icon={Briefcase} eyebrow="Journey" title="Professional experience" description="A path from full-stack and infrastructure work to enterprise cloud systems and customer-facing AI solution delivery.">
        <Experiences items={ExperiencesList} />
      </AboutSection>

      <AboutSection icon={HeartHandshake} eyebrow="Community" title="Volunteering & mentorship" description="Sharing practical experience to help students understand technology careers, build confidence and access new opportunities.">
        <article className="border-y border-slate-200 py-8 dark:border-slate-800 lg:grid lg:grid-cols-[12rem_0.8fr_1.2fr] lg:gap-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-blue-600 dark:text-blue-400">{volunteering.period}</p>
          <div className="mt-4 lg:mt-0">
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{volunteering.role}</h3>
            <p className="mt-2 font-medium text-slate-700 dark:text-slate-300">{volunteering.organization}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-500">{volunteering.field}</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">{volunteering.summary}</p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {volunteering.contributions.map((contribution) => <li key={contribution} className="flex items-start gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 bg-blue-600 dark:bg-blue-400" /><span>{contribution}</span></li>)}
            </ul>
          </div>
        </article>
      </AboutSection>

      <AboutSection icon={Award} eyebrow="Capabilities" title="Capabilities, organized by outcome" description="Technical depth connected to requirements, product decisions, architecture, delivery and operations.">
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
