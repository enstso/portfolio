import Education from "@/components/about/education";
import Experiences from "@/components/about/experiences";
import Skills from "@/components/about/skills";
import { EducationList } from "@/lib/data/education";
import { ExperiencesList } from "@/lib/data/experiences";
import { skillsItems } from "@/lib/data/skills";

export default function About() {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="container mx-auto p-8">
        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold text-center mb-8 transition-all duration-300 ease-in-out transform hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer hover:scale-105">
          About Me
        </h1>
        {/* Section principale */}
        <div className="space-y-16 mx-auto max-w-[1000px]"> {/* Réduction de la largeur */}
          
          {/* Section Skills */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-200 transition-all duration-300 ease-in-out hover:text-neutral-600 dark:hover:text-neutral-400">
              Skills
            </h3>
            <div className="w-full h-1 bg-neutral-500 dark:bg-neutral-300 mb-6"></div>
            <Skills list={skillsItems} />
          </div>
          
          {/* Section Experiences */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-200 transition-all duration-300 ease-in-out hover:text-neutral-600 dark:hover:text-neutral-400">
              Experiences
            </h3>
            <div className="w-full h-1 bg-neutral-500 dark:bg-neutral-300 mb-6"></div>
            <Experiences items={ExperiencesList} />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-200 transition-all duration-300 ease-in-out hover:text-neutral-600 dark:hover:text-neutral-400">
              Education
            </h3>
            <div className="w-full h-1 bg-neutral-500 dark:bg-neutral-300 mb-6"></div>
            <Education items={EducationList}/>
          </div>
        </div>
      </div>
    </div>
  );
}
