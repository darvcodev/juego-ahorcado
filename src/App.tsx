import "./App.css";
import { HangImage } from "./components/HangImage";
import { letras } from "./helpers/letras";
import { useEffect, useState } from "react";
import { obternerPalbrasRandom } from "./helpers/obtenerPalabrasRandom";

function App() {
  const [palabras, setPalabras] = useState(obternerPalbrasRandom());
  const [ocultarPalabra, setOcultarPalabra] = useState(
    "_ ".repeat(palabras.length)
  );
  const [intentos, setIntentos] = useState(0);
  const [gano, setGano] = useState(false);
  const [perdio, setPerdio] = useState(false);

  // La persona perdió
  useEffect(() => {
    if (intentos >= 9) {
      setPerdio(true);
    }
  }, [intentos]);

  // La persona Ganó
  useEffect(() => {
    const currentOcultarPalbra = ocultarPalabra.split(" ").join("");
    if (currentOcultarPalbra === palabras) {
      setGano(true);
    }
  }, [ocultarPalabra]);

  // Validacion de las palabras
  const validarPalabras = (letra: string) => {
    if (gano) return;
    if (perdio) return;

    if (!palabras.includes(letra)) {
      setIntentos(Math.min(intentos + 1, 9));
      return;
    }

    const ocultarPalabraArray = ocultarPalabra.split(" ");

    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i] === letra) {
        ocultarPalabraArray[i] = letra;
      }
    }
    setOcultarPalabra(ocultarPalabraArray.join(" "));
  };

  const reiniciarJuego = () => {
    const nuevaPalabra = obternerPalbrasRandom();

    setPalabras(nuevaPalabra);
    setOcultarPalabra("_ ".repeat(nuevaPalabra.length));
    setIntentos(0);
    setGano(false);
    setPerdio(false);
  };

  return (
    <div className="text-center">
      {/* Imágenes */}
      <div className="mx-auto flex flex-col justify-center items-center">
        <HangImage imagenNumero={intentos} />
      </div>

      {/* Palabra oculta */}
      <h3 className="font-bold text-2xl my-4 text-blue-600">
        {ocultarPalabra}
      </h3>

      {/* Contador de intentos */}
      <h3 className="font-bold text-2xl my-4 text-blue-600">
        Intentos: {intentos}
      </h3>

      {/* Mensaje si perdió */}
      {perdio ? (
        <h3 className="font-bold text-2xl my-4 text-red-600">
          😢 Perdió, su palabra es: {palabras}
        </h3>
      ) : (
        ""
      )}

      {/* Mensaje si ganó */}
      {gano ? (
        <h3 className="font-bold text-2xl my-4 text-green-600">
          🥳 Felicidades, usted ganó
        </h3>
      ) : (
        ""
      )}

      {/* Teclado */}
      {letras.map((letra) => (
        <button
          onClick={() => validarPalabras(letra)}
          key={letra}
          className="bg-white p-4 rounded-full shadow-md m-2"
        >
          {letra}
        </button>
      ))}

      <br />
      <br />
      {/* Boton del Nuevo Juego */}
      <button
        onClick={reiniciarJuego}
        className="bg-blue-700 py-4 px-6 rounded-full text-white font-bold text-xl"
      >
        ¿Nuevo juego?
      </button>
    </div>
  );
}

export default App;
