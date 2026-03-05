"use client"

import { useState } from "react"

const integrantes = [
  { nombre: "Mateo", foto: "/mateo.jpg", instagram: "https://instagram.com/mvteod", descripcion: "Diseñador de paginas web, cinefilo y profesional en editar fotos del grupo." },
  { nombre: "cabral", foto: "/cabral.jpg", instagram: "https://instagram.com/cabr.vl", descripcion: "Alto estatus, todos los chiches." },
  { nombre: "rodota", foto: "/rodota.jpg", instagram: "https://instagram.com/santii.rodotaaa", descripcion: "Especialista en capturas de nenas menores." },
  { nombre: "lucho", foto: "/estrella.jpg", instagram: "https://instagram.com/estrellanegra", descripcion: "Capturas de ig, sensaciones, momentos y fernandito." },
  { nombre: "morlam", foto: "/morlam.jpg", instagram: "https://instagram.com/valeminnmr", descripcion: "Cuando aparece, cambia el juego, el gordo." }
]

const gomezSecreto = {
  nombre: "GÓMEZ",
  foto: "/gomez.jpg",
  instagram: "https://instagram.com", 
  descripcion: "ERROR CRÍTICO: HAS DESBLOQUEADO AL PERSONAJE PROHIBIDO. EL VERDADERO DUEÑO DE LA POSTA."
}

export default function Home() {
  const [rotacion, setRotacion] = useState(0);
  const [ganador, setGanador] = useState<any>(null);
  const [girando, setGirando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contadorGiros, setContadorGiros] = useState(0);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [gomezYaSalio, setGomezYaSalio] = useState(false); // Seguro para que solo salga una vez

  function girar() {
    if (girando) return;
    
    let nuevoContador = contadorGiros;
    if (!gomezYaSalio) {
      nuevoContador = contadorGiros + 1;
      setContadorGiros(nuevoContador);
    }

    setGirando(true);
    const total = integrantes.length;
    const grados = 360 / total;
    let indexFinal;
    let vueltas = 12;

    // Disparar Easter Egg solo en el tiro 5 y si no salió antes
    if (nuevoContador === 5 && !gomezYaSalio) {
      setIsEasterEgg(true);
      indexFinal = Math.floor(Math.random() * total); 
      vueltas = 20; 
    } else {
      setIsEasterEgg(false);
      do { indexFinal = Math.floor(Math.random() * total); } 
      while (ganador && integrantes[indexFinal].nombre === ganador?.nombre);
    }

    const anguloSeccion = indexFinal * grados;
    const offset = grados / 2;
    const nuevaRotacionRelativa = (360 - anguloSeccion) - offset;
    const nuevaRotacion = rotacion + (vueltas * 360) + (nuevaRotacionRelativa - (rotacion % 360));

    setRotacion(nuevaRotacion);

    setTimeout(() => {
      if (nuevoContador === 5 && !gomezYaSalio) {
        setGanador(gomezSecreto);
        setGomezYaSalio(true); // Bloqueamos a Gómez para siempre en esta sesión
      } else {
        setGanador(integrantes[indexFinal]);
      }
      setMostrarModal(true);
      setGirando(false);
    }, 4500);
  }

  return (
    <main className={`h-screen w-full overflow-hidden relative text-white flex flex-col items-center justify-center p-4 font-sans transition-colors duration-1000 ${isEasterEgg && girando ? 'bg-red-950/90' : 'bg-black'}`}>
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/postaque.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/40" />

      <h1 className={`z-10 text-4xl md:text-5xl font-black tracking-[0.2em] uppercase mb-10 transition-all duration-500 ${isEasterEgg && girando ? 'text-red-600 scale-110' : 'text-white'}`}>
        {isEasterEgg && girando ? "SISTEMA CORRUPTO" : "RULETA POSTAQUERA"}
      </h1>

      <div className="relative z-10 flex items-center justify-center mb-10">
        <div className={`relative w-[340px] h-[340px] flex items-center justify-center transition-all duration-500 ${isEasterEgg && girando ? 'shadow-[0_0_80px_rgba(220,38,38,0.4)]' : ''}`}>
          <div
            className={`relative w-full h-full rounded-full border-[2px] transition-transform duration-[4500ms] ease-[cubic-bezier(0.15,0,0.15,1)] overflow-hidden backdrop-blur-md ${isEasterEgg && girando ? 'border-red-600 bg-red-950/60' : 'border-white/40 bg-zinc-900/90'}`}
            style={{ transform: `rotate(${rotacion}deg)` }}
          >
            {integrantes.map((persona, index) => {
              const sector = 360 / integrantes.length;
              return (
                <div key={index} className="absolute w-full h-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-white/10 origin-bottom" style={{ transform: `rotate(${sector * index}deg)` }} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1/2 origin-bottom flex flex-col items-center pt-6" style={{ transform: `rotate(${sector * index + sector/2}deg)` }}>
                    <img src={persona.foto} className="w-16 h-16 rounded-full object-cover border-2 border-white/10 shadow-lg" />
                    <span className="text-[10px] font-bold mt-2 text-white/90 uppercase tracking-widest">{persona.nombre}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
            <div className={`w-4 h-6 transition-colors ${isEasterEgg && girando ? 'bg-red-600 animate-bounce' : 'bg-white'}`} style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
          </div>
        </div>
      </div>

      <button
        onClick={girar}
        disabled={girando}
        className={`z-10 relative px-12 py-3 font-black text-sm tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50 ${isEasterEgg && girando ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
      >
        {girando ? "???" : "GIRAR"}
      </button>

      {mostrarModal && ganador && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={`relative p-8 max-w-xs w-full text-center border transition-all ${ganador.nombre === 'GÓMEZ' ? 'border-red-600 animate-[shake_0.5s_infinite] bg-zinc-950 shadow-[0_0_50px_rgba(220,38,38,0.3)]' : 'bg-zinc-950 border-white/10'}`}>
              <img src={ganador.foto} className={`w-40 h-40 mx-auto object-cover border-2 mb-6 ${ganador.nombre === 'GÓMEZ' ? 'border-red-600' : 'border-white/20'}`} />
              <h3 className={`text-2xl font-black mb-2 uppercase tracking-tighter ${ganador.nombre === 'GÓMEZ' ? 'text-red-600' : 'text-white'}`}>{ganador.nombre}</h3>
              <p className="text-zinc-500 text-[11px] mb-8 italic">{ganador.descripcion}</p>
              <div className="flex flex-col gap-3">
                <a href={ganador.instagram} target="_blank" className={`text-[10px] font-bold border py-2.5 transition uppercase tracking-widest ${ganador.nombre === 'GÓMEZ' ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}>Ver Instagram</a>
                <button onClick={() => { setMostrarModal(false); setIsEasterEgg(false); }} className={`text-[9px] font-bold uppercase tracking-widest pt-2 ${ganador.nombre === 'GÓMEZ' ? 'text-red-800' : 'text-zinc-600 hover:text-white'}`}>{ganador.nombre === 'GÓMEZ' ? "[ ACEPTAR DESTINO ]" : "[ CERRAR ]"}</button>
              </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </main>
  )
}
