let palabras: string[] = [
    "BONDAD",
    "SINCERIDAD",
    "EMPATIA",
    "AMOR",
    "PACIENCIA",
    "GRATITUD",
    "HUMILDAD",
    "PERDON",
    "RESPONSABILIDAD",
    "SOLIDARIDAD"
  ];

export function obternerPalbrasRandom(){
    
    const randomIndex = Math.floor(Math.random() * palabras.length)
    return palabras[randomIndex]
}