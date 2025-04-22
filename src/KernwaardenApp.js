
import React, { useState, useEffect } from "react";

const allValues = [
  "Eerlijkheid", "Vrijheid", "Liefde", "Vertrouwen", "Respect", "Creativiteit", "Zelfontwikkeling", "Zorgzaamheid",
  "Humor", "Ambitie", "Rust", "Balans", "Duurzaamheid", "Loyaliteit", "Avontuur", "Veiligheid", "Samenwerking", "Passie",
  "Integriteit", "Verantwoordelijkheid", "Empathie", "Authenticiteit", "Kracht", "Verwondering", "Vergeving",
  "Acceptatie", "Gelijkheid", "Moed", "Nieuwsgierigheid", "Toewijding", "Dankbaarheid", "Rechtvaardigheid", "Spiritualiteit",
  "Zelfliefde", "Verbinding", "Volharding", "Flexibiliteit", "Geduld", "Openheid", "Discipline", "Plezier", "Zinvolheid",
  "Onderzoek", "Vertraging", "Doelgerichtheid", "Stabiliteit", "Wijsheid", "Oprechtheid", "Gedrevenheid", "Bescheidenheid",
  "Mededogen", "Zorgvuldigheid", "Liefdadigheid", "Erkenning", "Eenvoud", "Trouw", "Helderheid", "Vriendschap",
  "Aanwezigheid", "Toegankelijkheid", "Betrokkenheid", "Inzicht", "Vrede", "Succes", "Acceptatie", "Besluitvaardigheid",
  "Samenhorigheid", "Eer", "Vertrouwdheid", "Speelsheid", "Wilskracht", "Zekerheid", "Trouw", "Initiatief",
  "Dienstbaarheid", "Tolerantie", "Warmte", "Authenticiteit", "Zelfvertrouwen", "Luisteren", "Innovatie", "Overgave",
  "Geloof", "Betrouwbaarheid", "Zelfexpressie", "Kalmte", "Intuïtie", "Ondersteuning", "Verlangen", "Geven",
  "Zelfreflectie", "Oprechtheid", "Rust", "Vastberadenheid", "Vrijgevigheid", "Verbondenheid", "Begrip",
  "Zelfstandigheid", "Realisme", "Zorg", "Stilte"
];

const getNextGrid = (values) => {
  const size = Math.min(values.length, 100);
  const shuffled = [...values].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

export default function KernwaardenApp() {
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gridValues, setGridValues] = useState(getNextGrid(allValues));
  const [selected, setSelected] = useState([]);
  const [finalValues, setFinalValues] = useState([]);

  const limits = { 1: 25, 2: 10, 3: 4 };
  const timers = { 1: 30, 2: 8, 3: 6 };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          nextRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [round]);

  const toggleValue = (val) => {
    if (selected.includes(val)) {
      setSelected(selected.filter((v) => v !== val));
    } else if (selected.length < limits[round]) {
      setSelected([...selected, val]);
    }
  };

  const nextRound = () => {
    if (round === 3) return;
    const next = round + 1;
    setGridValues(selected);
    setSelected([]);
    setTimeLeft(timers[next]);
    setRound(next);
    if (next === 3) {
      setFinalValues([]);
    }
  };

  const selectFinal = (val) => {
    if (finalValues.includes(val)) return;
    if (finalValues.length < 4) setFinalValues([...finalValues, val]);
  };

  const isSelected = (val) => round === 3 ? finalValues.includes(val) : selected.includes(val);

  return (
    <div className="min-h-screen bg-[#f2f0e6] text-[#333] p-6 flex flex-col items-center justify-start font-sans">
      <h1 className="text-2xl font-semibold mb-2">Kernwaarden Selectie - Ronde {round}</h1>
      <p className="mb-4">Tijd resterend: {timeLeft} sec</p>
      <div className="grid grid-cols-10 gap-2">
        {gridValues.map((val, i) => (
          <button
            key={i}
            className={\`rounded-xl p-2 text-sm transition-colors duration-200 border shadow-sm \${isSelected(val)
              ? "bg-[#5a6e48] text-white"
              : "bg-[#e8e5db] hover:bg-[#dcd8cd]"}\`}
            onClick={() => (round === 3 ? selectFinal(val) : toggleValue(val))}
          >
            {val}
          </button>
        ))}
      </div>

      {round === 3 && finalValues.length === 4 && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Jouw Top 4 Kernwaarden:</h2>
          <ol className="list-decimal list-inside">
            {finalValues.map((val, i) => (
              <li key={i}>{val}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
