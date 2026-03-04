"use client"

import { useState } from "react"

const integrantes = [
  {
    nombre: "Mateo",
    foto: "/mateo.jpg",
    instagram: "https://instagram.com/mvteod",
    descripcion: "Diseñador de paginas web, cinefilo y profesional en editar fotos del grupo."
  },
  {
    nombre: "cabral",
    foto: "/cabral.jpg",
    instagram: "https://instagram.com/cabr.vl",
    descripcion: "Alto estatus, todos los chiches."
  },
  {
    nombre: "rodota",
    foto: "/rodota.jpg",
    instagram: "https://instagram.com/santii.rodotaaa",
    descripcion: "Especialista en capturas de nenas menores."
  },
  {
    nombre: "lucho",
    foto: "/estrella.jpg",
    instagram: "https://instagram.com/estrellanegra",
    descripcion: "Capturas de ig, sensaciones, momentos y fernandito."
  },
  {
    nombre: "morlam",
    foto: "/morlam.jpg",
    instagram: "https://instagram.com/valeminnmr",
    descripcion: "Cuando aparece, cambia el juego, el gordo."
  }
]

export default function Home() {
  const [rotacion, setRotacion] = useState(0)
  const [ganador, setGanador] = useState<any>(null)
  const [girando, setGirando] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

function girar() {
  if (girando) return
  setGirando(true)

  const index = Math.floor(Math.random() * integrantes.length)
  const grados = 360 / integrantes.length

  const vueltas = 6
  const anguloExtra = 360 - index * grados

  const nuevaRotacion = rotacion + (360 * vueltas) + anguloExtra

  setRotacion(nuevaRotacion)

  setTimeout(() => {
    setGanador(integrantes[index])
    setMostrarModal(true)
    setGirando(false)
  }, 4500)

  }

  return (
    <main className="h-screen overflow-hidden relative text-white flex flex-col items-center justify-center gap-10 p-10 bg-[radial-gradient(circle_at_30%_30%,#14532d,transparent_40%),radial-gradient(circle_at_70%_70%,#064e3b,transparent_40%),#000]">

      <h1 className="text-4xl font-extrabold tracking-[0.25em] text-green-400 drop-shadow-[0_0_20px_#22c55e]">
        RULETA POSTAQUERA
      </h1>

      <div className="relative w-96 h-96">

        <div
          className="w-full h-full rounded-full border-4 border-green-400 shadow-[0_0_40px_#22c55e] transition-transform duration-[4500ms] ease-out"
          style={{ transform: `rotate(${rotacion}deg)` }}
        >
          {integrantes.map((persona, index) => {
            const angle = (360 / integrantes.length) * index
            return (
              <div
                key={index}
                className="absolute w-full h-full flex items-start justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="mt-6 flex flex-col items-center">
                  <img
                    src={persona.foto}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400 shadow-lg"
                  />
                  <span className="text-sm mt-2 text-green-300">
                    {persona.nombre}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 text-3xl drop-shadow-lg">
          ▼
        </div>

      </div>

      <button
        onClick={girar}
        className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_#22c55e] transition hover:scale-105"
      >
        {girando ? "GIRANDO..." : "GIRAR"}
      </button>

      {mostrarModal && ganador && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">

          <div className="relative bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl shadow-[0_0_60px_#22c55e] max-w-md w-full text-center">

            <h2 className="text-4xl font-bold text-green-400 mb-6 tracking-widest">
              GANADOR
            </h2>

            <img
              src={ganador.foto}
              className="w-48 h-48 mx-auto rounded-xl object-cover border-4 border-green-400 shadow-lg mb-6"
            />

            <h3 className="text-2xl font-semibold mb-4">
              {ganador.nombre}
            </h3>

            <p className="text-gray-300 text-sm mb-6">
              {ganador.descripcion}
            </p>

            <a
              href={ganador.instagram}
              target="_blank"
              className="block text-green-400 underline mb-6 hover:text-green-300"
            >
              Ver Instagram
            </a>

            <button
              onClick={() => setMostrarModal(false)}
              className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg transition"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}

    </main>
  )
}