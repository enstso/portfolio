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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

          {/* Hero Section - Mobile First */}
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              Professional Profile
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-4">
              Comprehensive technical expertise in full-stack development, cloud architecture,
              and cybersecurity to deliver scalable enterprise solutions.
            </p>
          </div>

          {/* Content Layout - Responsive Stack */}
          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">

            {/* Skills Section */}
            <section>
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <div className="p-2 sm:p-3 bg-blue-600 rounded-lg shadow-sm flex-shrink-0">
                  <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Technical Skills
                </h2>
              </div>
              <Skills list={skillsItems} />
            </section>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <div className="p-2 sm:p-3 bg-blue-600 rounded-lg shadow-sm flex-shrink-0">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Professional Experience
                </h2>
              </div>
              <Experiences items={ExperiencesList} />
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <div className="p-2 sm:p-3 bg-blue-600 rounded-lg shadow-sm flex-shrink-0">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
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
