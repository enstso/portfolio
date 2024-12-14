export type EducationItem =  {
    name:string;
    degree:string;
    study:string;
    place:string;
    startDate:Date;
    endDate: Date | string;
    link:string;
}


export const EducationList:EducationItem[] =[
    {
        name:"EFREI - Grande école du numérique",
        degree:"Master's degree",
        study:"Computer Science",
        place:"Villejuif, Île-de-France, France",
        startDate:new Date(2024,9),
        endDate:"present",
        link:"https://www.efrei.fr/programmes-experts/mastere-developpeur-full-stack/"
    },
    {
        name:"ESGI",
        degree:"Bachelor's degree",
        study:"Computer Science - Cybersecurity",
        place:"Paris, Île-de-France, France",
        startDate:new Date(2023,9),
        endDate:new Date(2024,9),
        link:"https://www.esgi.fr/programmes/securite-informatique.html"
    },
    {
        name:"Lycée Jean Jacques Rousseau",
        degree:"Brevet de technicien supérieur (BTS) degree",
        study:"Computer Science",
        place:"Montmorency, Île-de-France, France",
        startDate:new Date(2021,9),
        endDate:new Date(2023,7),
        link:"https://lyc-rousseau-montmorency.ac-versailles.fr/bts/bts-sio-services-informatiques-aux-organisations/"
    }
]