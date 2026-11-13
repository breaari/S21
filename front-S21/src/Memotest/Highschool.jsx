import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/logo-blanco-sin-fondo.png";
import carta01 from "../assets/carta-01.png";
import reverso from "../assets/reverso.png";
import "./Memotest.css";
import "./Highschool.css";

const API = import.meta.env.VITE_MEMOTEST_API_URL || "https://back.universidadsiglo21online.com";
const imagenesArchivos = import.meta.glob("../assets/carta-*.{png,jpg,jpeg,webp}", { eager: true, query: "?url", import: "default" });
const otrasCartas = [7, 8, 9, 10, 11].map((n) =>
  Object.entries(imagenesArchivos).find(([path]) => new RegExp(`/carta-${String(n).padStart(2, "0")}\\.(png|jpg|jpeg|webp)$`, "i").test(path))?.[1]
);
const IMAGENES = [carta01, ...otrasCartas];
const AREAS = ["Tecnología e Informática","Salud","Negocios y Administración","Diseño y Comunicación","Derecho","Educación","Ingeniería y Ambiente","Todavía no lo sé"];

function barajar() {
 const cartas = IMAGENES.flatMap((imagen, pareja) => [0,1].map((n) => ({
   id:`${pareja}-${n}`, pareja, imagen
 })));
 for(let i=cartas.length-1;i>0;i--) {const j=Math.floor(Math.random()*(i+1)); [cartas[i],cartas[j]]=[cartas[j],cartas[i]];}
 return cartas;
}

export function MemotestHighschool() {
 const origen = useMemo(() => new URLSearchParams(window.location.search).get("source") || "directo",[]);
 const [paso,setPaso]=useState("registro");
 const [form,setForm]=useState({nombre:"",apellido:"",email:"",telefono:"",colegio:"",curso:"6°",division:"",
   anio:"Último año",proximoPaso:"",decisionCarrera:"",areasInteres:[]});
 const [id,setId]=useState(null);
 const [cartas,setCartas]=useState([]);
 const [volteadas,setVolteadas]=useState([]);
 const [encontradas,setEncontradas]=useState([]);
 const [movimientos,setMovimientos]=useState(0);
 const [segundos,setSegundos]=useState(0);
 const [resultado,setResultado]=useState(null);
 const [error,setError]=useState("");
 const [enviando,setEnviando]=useState(false);
 const bloqueo=useRef(false);
 const finalizando=useRef(false);
 const inicio=useRef(0);
 const timer=useRef(null);
 const pendientes=useRef(null);

 useEffect(()=>()=>{clearInterval(timer.current);clearTimeout(pendientes.current);},[]);
 const cambiar=(e)=>setForm(p=>({...p,[e.target.name]:e.target.value}));
 const seleccionarOpcion=(campo,valor)=>setForm(p=>({...p,[campo]:valor}));
 const area=(valor)=>setForm(p=>{
   if(valor==="Todavía no lo sé") return {...p,areasInteres:p.areasInteres.includes(valor)?[]:[valor]};
   const otras=p.areasInteres.filter(x=>x!=="Todavía no lo sé");
   return {...p,areasInteres:otras.includes(valor)?otras.filter(x=>x!==valor):[...otras,valor]};
 });
 const registrar=async(e)=>{
   e.preventDefault(); setError("");
   if(!form.nombre.trim() || !form.apellido.trim() || !form.email.trim() || !form.telefono.trim() ||
     !form.colegio.trim() || !form.curso.trim() || !form.proximoPaso || !form.decisionCarrera || !form.areasInteres.length)
     return setError("Completá todos los datos y las preguntas antes de continuar.");
   setEnviando(true);
   try {
     const {data}=await axios.post(`${API}/memotest/highschool/participar`,{...form,origen});
     setId(data.participante.id);
     setPaso("instrucciones");
   } catch(e) {setError(e.response?.data?.error||"No se pudo completar el registro.");}
   finally {setEnviando(false);}
 };
 const iniciar=async()=>{
   if(IMAGENES.some(x=>!x)) return setError("Todavía faltan cargar las nuevas cartas del desafío.");
   setEnviando(true);setError("");
   try {
    await axios.post(`${API}/memotest/highschool/${id}/iniciar`);
    setCartas(barajar());setVolteadas([]);setEncontradas([]);setMovimientos(0);
    inicio.current=performance.now();setSegundos(0);finalizando.current=false;bloqueo.current=false;
    setPaso("juego");
    timer.current=setInterval(()=>setSegundos((performance.now()-inicio.current)/1000),100);
   }catch(e){setError(e.response?.data?.error||"No pudimos iniciar la partida.");}
   finally{setEnviando(false);}
 };
 const finalizar=async(total)=>{
   if(finalizando.current)return;
   finalizando.current=true;bloqueo.current=true;clearInterval(timer.current);
   setPaso("guardando");setError("");
   try{
    const {data}=await axios.post(`${API}/memotest/highschool/${id}/finalizar`,{completado:true,movimientos:total});
    setResultado(data.participante);setPaso("resultado");
   }catch(e){setError(e.response?.data?.error||"No se pudo guardar el resultado.");setPaso("error");}
 };
 const elegir=(c)=>{
   if(bloqueo.current||volteadas.some(x=>x.id===c.id)||encontradas.includes(c.pareja))return;
   const v=[...volteadas,c];setVolteadas(v);
   if(v.length!==2)return;
   bloqueo.current=true;
   const total=movimientos+1;setMovimientos(total);
   if(v[0].pareja===v[1].pareja){
     const nuevas=[...encontradas,c.pareja];setEncontradas(nuevas);
     setVolteadas([]);bloqueo.current=false;
     if(nuevas.length===6)finalizar(total);
   }else{
     pendientes.current=setTimeout(()=>{setVolteadas([]);bloqueo.current=false;},650);
   }
 };
 const logoHeader=<img className="memo-logo" src={logo} alt="Universidad Siglo 21"/>;
 const linkRanking=<a className="hs-link" href="/memotest/higschool/ranking">VER RANKING INTERCOLEGIAL</a>;
 return <main className="memo-page hs-page">
  {paso==="registro" && <section className="memo-shell"><div className="memo-card">
   {logoHeader}<span className="memo-kicker">DESAFÍO INTERCOLEGIAL · PROMO 2026</span>
   <h1 className="memo-main-title"><span className="memo-title-white">TU MEMORIA</span><span className="memo-title-green">PUEDE HACER GANAR</span><span className="memo-title-white">A TODO TU CURSO</span></h1>
   <p className="memo-intro">Encontrá los 6 pares, superá a otras promos y llevá a tu curso a lo más alto del ranking. El premio grupal se anunciará próximamente.</p>
   <form className="memo-form" onSubmit={registrar}>
    <div className="memo-grid-2"><label>Nombre<input required name="nombre" value={form.nombre} onChange={cambiar} placeholder="Tu nombre"/></label>
    <label>Apellido<input required name="apellido" value={form.apellido} onChange={cambiar} placeholder="Tu apellido"/></label></div>
    <label>Nombre del colegio<input required name="colegio" value={form.colegio} onChange={cambiar} placeholder="Ej.: Escuela Secundaria N.º ..."/></label>
    <p className="hs-course-label">Participás por <strong>6.º año</strong> de tu colegio.</p>
    <label>División (si corresponde)<input name="division" value={form.division} onChange={cambiar} placeholder="A / B / ..."/></label>
    <label>WhatsApp<input required type="tel" name="telefono" value={form.telefono} onChange={cambiar} placeholder="Código de área + número"/></label>
    <label>Email<input required type="email" name="email" value={form.email} onChange={cambiar} placeholder="tu@email.com"/></label>
    <div className="memo-question"><p>¿Qué te imaginás haciendo cuando termines el secundario?</p><div className="memo-options">
     {["Seguir estudiando","Estudiar y trabajar","Empezar a trabajar","Emprender","Todavía no lo sé"].map(x=><button type="button" key={x} className={form.proximoPaso===x?"selected":""} onClick={()=>seleccionarOpcion("proximoPaso",x)}>{x}</button>)}
    </div></div>
    <div className="memo-question"><p>¿Qué tan definido tenés lo que te gustaría estudiar?</p><div className="memo-options">
     {["Ya sé qué quiero estudiar","Tengo algunas ideas","Todavía estoy explorando"].map(x=><button type="button" key={x} className={form.decisionCarrera===x?"selected":""} onClick={()=>seleccionarOpcion("decisionCarrera",x)}>{x}</button>)}
    </div></div>
    <div className="memo-question"><p>¿Qué áreas te llaman más la atención? Podés elegir varias.</p><div className="memo-options memo-options-wrap">
     {AREAS.map(x=><button type="button" key={x} className={form.areasInteres.includes(x)?"selected":""} onClick={()=>area(x)}>{x}</button>)}
    </div></div>
    {error&&<p className="memo-error" role="alert">{error}</p>}
    <button className="memo-primary" disabled={enviando} type="submit">{enviando?"REGISTRANDO...":"QUIERO REPRESENTAR A MI CURSO"}</button>
    {linkRanking}
   </form>
  </div></section>}
  {paso==="instrucciones" && <section className="memo-challenge">{logoHeader}
   <span className="memo-kicker">POR TU COLEGIO. POR TU PROMO.</span>
   <h1>ENCONTRÁ LOS <span>6 PARES</span></h1>
   <p>Jugá hasta encontrar todos los pares. Gana el menor tiempo y, si hay empate, la menor cantidad de movimientos.</p>
   <p className="hs-premio">¡El primer puesto del ranking se lleva un premio para todo su curso! Premio a confirmar.</p>
   <p>Una participación por persona. Cuando empieces, no podrás reiniciar la partida.</p>
   {error&&<p className="memo-error" role="alert">{error}</p>}
   <button className="memo-primary" onClick={iniciar} disabled={enviando}>{enviando?"PREPARANDO...":"EMPEZAR DESAFÍO"}</button>{linkRanking}
  </section>}
  {paso==="juego" && <section className="memo-game"><div className="memo-game-top">{logoHeader}
   <p>MEMORIA CONTRARRELOJ · INTERCOLEGIAL</p>
   <div className="memo-countdown"><small>TIEMPO</small><strong>{segundos.toFixed(1)} s</strong></div>
   <div className="memo-progress">Pares encontrados <strong>{encontradas.length} / 6</strong> · {movimientos} movimientos</div>
   </div><div className="memo-board">{cartas.map(c=>{
    const visible=volteadas.some(x=>x.id===c.id)||encontradas.includes(c.pareja);
    return <button key={c.id} type="button" className={`memo-tile ${visible?"flipped":""} ${encontradas.includes(c.pareja)?"matched":""}`}
      aria-label={visible?"Carta descubierta":"Descubrir carta"} disabled={finalizando.current} onClick={()=>elegir(c)}>
     <span className="memo-tile-inner"><span className="memo-tile-back"><img src={reverso} alt=""/></span>
      <span className="memo-tile-front"><img src={c.imagen} alt=""/></span></span></button>;
   })}</div></section>}
  {paso==="guardando" && <section className="memo-result">{logoHeader}<h2>Guardando tu resultado...</h2></section>}
  {paso==="resultado" && <section className="memo-result">{logoHeader}
   <span className="memo-kicker">¡DESAFÍO COMPLETADO!</span><h1>¡YA REPRESENTÁS <span>A TU CURSO!</span></h1>
   <p>Tu resultado quedó registrado para {form.curso}{form.division?` ${form.division}`:""} de {form.colegio}.</p>
   <div className="hs-score"><strong>{resultado?.tiempoSegundos?.toFixed(1)} s</strong><span>{resultado?.movimientos} movimientos</span></div>
   <p>¿Llegarás al primer puesto? Si ganás el ranking, el premio es para todo tu curso.</p>{linkRanking}
  </section>}
  {paso==="error" && <section className="memo-result">{logoHeader}<h2>No pudimos guardar el resultado</h2>
   <p className="memo-error">{error}</p><p>Conservá esta pantalla y contactá a la organización. No vuelvas a jugar.</p>{linkRanking}
  </section>}
 </main>;
}
