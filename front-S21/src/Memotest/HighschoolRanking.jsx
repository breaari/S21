import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import "./Ranking.css";
import "./Highschool.css";

const API = import.meta.env.VITE_MEMOTEST_API_URL || "https://back.universidadsiglo21online.com";
const formato = (p) => `${p.tiempoSegundos.toFixed(1).replace(".",",")} s · ${p.movimientos} movimientos`;
const identificacion=(p)=>[p.colegio,p.curso,p.division].filter(Boolean).join(" · ");

export function HighschoolRanking() {
 const [ranking,setRanking]=useState([]);
 const [estado,setEstado]=useState("Cargando...");
 useEffect(()=>{
   let activo=true;
   const cargar=async()=>{
    try {
     const {data}=await axios.get(`${API}/memotest/highschool/ranking`,{timeout:15000});
     if(activo){setRanking(data.ranking||[]);setEstado("EN VIVO");}
    } catch(e){if(activo)setEstado("SIN CONEXIÓN");}
   };
   cargar();const timer=setInterval(cargar,10000);
   return ()=>{activo=false;clearInterval(timer);};
 },[]);
 const podio=ranking.slice(0,3);
 return <main className="ranking-page hs-ranking">
  <header className="ranking-header"><img src={logo} alt="Universidad Siglo 21"/>
   <div className="ranking-estado-grupo"><span>RANKING INTERCOLEGIAL · <b>{estado}</b></span></div></header>
  <h1>MEMORIA <span>CONTRARRELOJ</span></h1>
  <p className="ranking-subtitle">¿QUÉ CURSO LLEGARÁ A LO MÁS ALTO DEL PODIO?</p>
  <section className="ranking-podio ranking-top-cinco hs-podio-tres" aria-label="Primeros tres puestos">
   {[1,0,2].map(i=>{
    const p=podio[i];
    return <div className={`ranking-podio-slot puesto-${i+1}`} key={i}>
     <strong>{p?.nombre||"Tu nombre acá"}</strong>
     <small>{p?formato(p):"Esperando participante"}</small>
     <small className="hs-colegio">{p?identificacion(p):"Representá a tu promo"}</small>
     <div className="ranking-escalon">{i+1}° PUESTO</div>
    </div>;
   })}
  </section>
  <div className="ranking-list-title"><strong>CLASIFICACIÓN GENERAL</strong><span>{ranking.length} PARTICIPANTES</span></div>
  <div className="ranking-area"><section className="ranking-lista">
   {!ranking.length&&<p className="ranking-vacio">¡El desafío intercolegial está por comenzar!</p>}
   {ranking.length>0 && ranking.length<=3 && <p className="ranking-vacio">Los próximos participantes aparecerán acá.</p>}
   {ranking.slice(3).map(p=><div className="ranking-fila hs-ranking-fila" key={p.id}>
    <b>{p.puesto}°</b><span><strong>{p.nombre}</strong><small>{identificacion(p)}</small></span>
    <strong>{formato(p)}</strong>
   </div>)}
  </section></div>
  <footer className="hs-ranking-footer"><a href="/memotest/higschool">PARTICIPAR DEL DESAFÍO</a></footer>
 </main>;
}
