import Skills from "@/components/aboutMe/skills";  // Import du composant Skills
import { skillsItems } from "@/lib/data/skills";  // Import des données de compétences

export default function About() {
  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="container mx-auto p-8">
        {/* Titre principal épuré avec transition douce */}
        <h1 className="text-4xl font-extrabold text-center mb-8 transition-all duration-300 ease-in-out transform hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer hover:scale-105">
          About Me
        </h1>

    
        {/* Section Skills avec le composant Skills intégré */}
        <div className="flex flex-wrap gap-8 justify-center py-8">
          {/* Conteneur Skills */}
          <div className="w-full max-w-[1200px] px-4">
            {/* Titre "Skills" avec amélioration de l'alignement et de l'animation */}
            <h3 className="text-3xl font-bold mb-6  text-neutral-800 dark:text-neutral-200 transition-all duration-300 ease-in-out hover:text-neutral-600 dark:hover:text-neutral-400">
              Skills
            </h3>
            {/* Ligne décorative sous le titre pour plus de structure */}
            <div className="w-11/12 h-1 bg-neutral-500 dark:bg-neutral-300  mb-8"></div>

            {/* Intégration du composant Skills avec les données */}
            <Skills list={skillsItems} />

            <h3 className="text-3xl font-bold my-6 text-neutral-800 dark:text-neutral-200 transition-all duration-300 ease-in-out hover:text-neutral-600 dark:hover:text-neutral-400">
              Experiences
            </h3>
            {/* Ligne décorative sous le titre pour plus de structure */}
            <div className="w-11/12 h-1 bg-neutral-500 dark:bg-neutral-300  mb-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
