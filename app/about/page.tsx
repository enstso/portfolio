import Education from "@/components/about/education";
import Experiences from "@/components/about/experiences";
import Skills from "@/components/about/skills";
import { EducationList } from "@/lib/data/education";
import { ExperiencesList } from "@/lib/data/experiences";
import { skillsItems } from "@/lib/data/skills";
import { Briefcase, GraduationCap, Code2 } from "lucide-react";

export default function About() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Hero Section Simplifié */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              Professional Profile
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Comprehensive technical expertise in full-stack development, cloud architecture,
              and cybersecurity to deliver scalable enterprise solutions.
            </p>
          </div>

          {/* Content Layout Vertical */}
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Skills Section - Design Minimaliste */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Technical Skills
                </h2>
              </div>
              <Skills list={skillsItems} />
            </section>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Professional Experience
                </h2>
              </div>
              <Experiences items={ExperiencesList} />
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Education
                </h2>
              </div>
              <Education items={EducationList} />
            </section>
          </div>
        </div>
      </div>
  );
}
