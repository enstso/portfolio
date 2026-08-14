export type EducationItem = {
  name: string;
  degree: string;
  study: string;
  place: string;
  startDate: string;
  endDate: string;
  link: string;
};

export const EducationList: EducationItem[] = [
  {
    name: "Efrei",
    degree: "Master of Science",
    study: "Computer Science",
    place: "Villejuif, France",
    startDate: "2024-09-01",
    endDate: "2026-09-01",
    link: "https://www.efrei.fr/programmes-experts/mastere-developpeur-full-stack/",
  },
  {
    name: "ESGI",
    degree: "Bachelor",
    study: "Computer Science / Cybersecurity",
    place: "Paris, France",
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    link: "https://www.esgi.fr/programmes/securite-informatique.html",
  },
  {
    name: "Lycée Jean-Jacques Rousseau",
    degree: "BTS SIO — SLAM",
    study: "Software Solutions & Business Applications",
    place: "Montmorency, France",
    startDate: "2021-09-01",
    endDate: "2023-07-01",
    link: "https://lyc-rousseau-montmorency.ac-versailles.fr/bts/bts-sio-services-informatiques-aux-organisations/",
  },
];
