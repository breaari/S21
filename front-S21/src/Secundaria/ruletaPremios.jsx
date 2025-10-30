import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import LogoRuleta from "../assets/logoruleta.png";

export const RuletaPremios = () => {
  const data = [
    { option: "🍬🍭" },
    { option: "🖊️" },
    { option: "🍬🍭" },
    { option: "📱" },
    { option: "🍬🍭" },
    { option: "🖊️" },
  ];

  const referencias = [
    { emoji: "🖊️", texto: "Birome de La Siglo" },
    { emoji: "🍬🍭", texto: "Golosinas" },
    { emoji: "📱", texto: "Soporte para celu de La Siglo" },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [girada, setGirada] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin && !girada) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setGirada(true);
    }
  };

  const titulos = ["🌀 ¡DALE PLAY A LA RULETA DE PREMIOS!"];

  // 🧩 Función para obtener el texto del premio según emoji
  const obtenerTextoPremio = (emoji) => {
    const ref = referencias.find((r) => r.emoji === emoji);
    return ref ? ref.texto : "";
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center relative">
      <h3 className="text-4xl font-semibold text-verdeoscuro mb-8 text-center">
        {titulos[0]}
      </h3>

      {/* 🌀 Contenedor general: ruleta + referencia */}
      <div className="flex flex-row mq980:flex-col items-center justify-center md:items-start gap-10">
        {/* 🎯 Ruleta */}
        <div className="relative flex-shrink-0">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={["#31aba2", "#6b2480", "#f2a809"]}
            textColors={["#064E3B"]}
            fontSize={50}
            outerBorderColor="#065F46"
            outerBorderWidth={2}
            radiusLineColor="#065F46"
            radiusLineWidth={2}
            spinDuration={0.5}
            onStopSpinning={() => {
              setMustSpin(false);
              setResultado(data[prizeNumber].option);
            }}
          />

          {/* 🎓 Logo en el centro */}
          <div className="absolute z-30 inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full shadow-md flex items-center justify-center border-2 border-verdeoscuro bg-white">
              <img
                src={LogoRuleta}
                alt="Logo Universidad"
                className="w-21 h-21 object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        {/* 📘 Referencia de premios (se ubica a la derecha en desktop) */}
        <div className="md:w-64 flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold text-verdeoscuro mb-3 text-center md:text-left">
            Referencia de premios 🎁
          </h4>
          <ul className="space-y-2 text-lg text-gray-700">
            {referencias.map((ref, i) => (
              <li
                key={i}
                className="flex items-center justify-center md:justify-start gap-2"
              >
                <span className="text-2xl">{ref.emoji}</span>
                <span>{ref.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🎯 Botón para girar */}
      {!girada && (
        <button
          onClick={handleSpinClick}
          className="mt-8 bg-white text-verde border-2 border-verde font-semibold px-6 py-2 rounded-full hover:bg-verdeoscuro hover:text-white transition"
        >
          👉 Girar ruleta
        </button>
      )}

      {/* 🎊 Resultado */}
      {resultado && (
        <div className="mt-6 bg-emerald-50 border-l-4 border-verdeoscuro p-4 rounded-xl shadow text-center md:text-left">
          <p className="text-verdeoscuro font-semibold text-lg flex items-center justify-center md:justify-start gap-2">
            🎊 ¡Felicitaciones! Ganaste{" "}
            <span className="font-bold flex items-center gap-2">
              {resultado} {obtenerTextoPremio(resultado)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

