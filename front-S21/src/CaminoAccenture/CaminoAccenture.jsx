import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-blanco-sin-fondo.png";
import { FiFlag, FiZap, FiTrendingUp, FiCompass, FiAward, FiCode, FiCpu, FiBriefcase, FiSettings, FiUsers, FiGrid, FiBookOpen, FiEdit3, FiRefreshCw, FiLayers, FiCheckCircle, FiMonitor, FiDollarSign, FiHeart, FiMessageCircle, FiFeather, FiHelpCircle } from "react-icons/fi";
import { CAMINO_STEPS } from "./caminoData";
import { PERFILES, recomendarFormaciones } from "./catalogoDistancia";
import "./CaminoAccenture.css";

const API_URL = "https://back.universidadsiglo21online.com";
const INITIAL_FORM = { nombre:"", apellido:"", email:"", telefono:"", permisoContacto:false, aceptaPrivacidad:false };
const getOption=(step,id)=>step.choices.find(x=>x.id===id);
const COLORS=["#28b9ac","#b644c5","#f3a800","#d4004c","#425db2"];
const OPTION_ICONS={
  liderar:FiFlag, innovar:FiZap, crecer:FiTrendingUp, emprender:FiCompass, especialista:FiAward,
  software:FiCode, datos:FiCpu, consultoria:FiBriefcase, operaciones:FiSettings, corporativo:FiUsers, otra:FiGrid,
  secundario:FiBookOpen, cursando:FiEdit3, incompleta:FiRefreshCw, terciario:FiLayers, universitario:FiCheckCircle,
  tecnologia:FiMonitor, negocios:FiDollarSign, personas:FiHeart, marketing:FiMessageCircle, derecho:FiFeather, indefinido:FiHelpCircle
};
const colorDeOpcion=(step,id)=>{
  const index=step.choices.findIndex(choice=>choice.id===id);
  return COLORS[(index<0?0:index)%COLORS.length];
};
function OpcionIcono({id}) {
  const Icon=OPTION_ICONS[id] || FiCompass;
  return <Icon aria-hidden="true" focusable="false"/>;
}

async function leerRespuestaAPI(response) {
  const tipo = response.headers.get("content-type") || "";
  if (!tipo.includes("application/json")) {
    if (response.status === 404) {
      throw new Error("El registro no está disponible en el servidor. Es necesario publicar el backend actualizado.");
    }
    throw new Error(`El servidor respondió con un error (HTTP ${response.status}). Intentá nuevamente.`);
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `No se pudo completar la solicitud (HTTP ${response.status}).`);
  }
  return data;
}


// Íconos vectoriales por etapa: aspiración, trabajo, estudios y destino.
function CaminoTileIcon({stage}) {
  const paths=[
    <><path d="M9 18h6M10 21h4M9 14a6 6 0 1 1 6 0l-1 2h-4l-1-2Z"/></>,
    <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    <><path d="m2 9 10-5 10 5-10 5L2 9ZM6 11v5c4 3 8 3 12 0v-5M22 9v7"/></>,
    <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></>
  ];
  return <svg className="camino-stage-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[stage]}</svg>;
}

export function CaminoAccenture(){
  const [screen,setScreen]=useState("inicio");
  const [form,setForm]=useState(INITIAL_FORM);
  const [stepIndex,setStepIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [selected,setSelected]=useState(null);
  const [animating,setAnimating]=useState(false);
  const [drag,setDrag]=useState(null);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(null);
  const stageTimer=useRef(null);
  const targetRef=useRef(null);
  const dragRef=useRef(null);
  const savingRef=useRef(false);
  useEffect(()=>()=>clearTimeout(stageTimer.current),[]);
  const step=CAMINO_STEPS[stepIndex];
  const profile=PERFILES[answers.aspiracion]||PERFILES.crecer;
  const recommendation=recomendarFormaciones(answers);
  const chosen=s=>getOption(s,answers[s.id]);

  async function begin(event){
    event.preventDefault();
    if(savingRef.current)return;
    if(!form.nombre.trim()||!form.apellido.trim()||!form.email.trim()||!form.telefono.trim()){
      setError("Completá todos tus datos antes de empezar.");return;
    }
    if(!form.aceptaPrivacidad){setError("Aceptá el aviso de privacidad para continuar.");return;}
    savingRef.current=true;
    setError("");
    try{
      const response=await fetch(`${API_URL}/accenture-camino/participar`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,origen:"feria-accenture-2026"})
      });
      const data=await leerRespuestaAPI(response);
      setSaved(data);
      setScreen("juego");
      window.scrollTo({top:0,behavior:"smooth"});
    }catch(err){setError(err.message||"No pudimos registrar tu participación.");}
    finally{savingRef.current=false;}
  }
  async function save(finalAnswers){
    if(savingRef.current)return;
    if(!saved?.participanteId){
      setError("No encontramos tu registro inicial.");
      setScreen("error");
      return;
    }
    savingRef.current=true;setError("");setScreen("guardando");
    try{
      const response=await fetch(`${API_URL}/accenture-camino/${encodeURIComponent(saved.participanteId)}/finalizar`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({respuestas:finalAnswers})
      });
      await leerRespuestaAPI(response);
      setScreen("recompensa");
      window.scrollTo({top:0,behavior:"smooth"});
    }catch(err){setError(err.message||"No pudimos guardar tus respuestas.");setScreen("error");}
    finally{savingRef.current=false;}
  }
  function place(id=selected){
    if(!id||animating)return;
    if(!getOption(step,id))return;
    const finalAnswers={...answers,[step.id]:id};
    setAnswers(finalAnswers);setSelected(id);setAnimating(true);
    clearTimeout(stageTimer.current);
    stageTimer.current=setTimeout(()=>{
      setAnimating(false);setSelected(null);setDrag(null);
      if(stepIndex===CAMINO_STEPS.length-1)save(finalAnswers);
      else{setStepIndex(i=>i+1);window.scrollTo({top:0,behavior:"smooth"});}
    },850);
  }
  function pointerDown(event,id){
    if(animating)return;
    if(event.pointerType==="touch"||event.pointerType==="pen"||event.pointerType==="mouse"){
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current={id,startX:event.clientX,startY:event.clientY};
      setDrag({id,x:event.clientX,y:event.clientY,moved:false});
      setSelected(id);
    }
  }
  function pointerMove(event){
    if(!dragRef.current)return;
    const moved=Math.hypot(event.clientX-dragRef.current.startX,event.clientY-dragRef.current.startY)>8;
    setDrag({id:dragRef.current.id,x:event.clientX,y:event.clientY,moved});
  }
  function pointerUp(event){
    const current=dragRef.current;
    if(!current)return;
    dragRef.current=null;setDrag(null);
    const moved=Math.hypot(event.clientX-current.startX,event.clientY-current.startY)>8;
    if(!moved)return;
    const rect=targetRef.current?.getBoundingClientRect();
    const inside=rect&&event.clientX>=rect.left-22&&event.clientX<=rect.right+22&&event.clientY>=rect.top-22&&event.clientY<=rect.bottom+22;
    if(inside)place(current.id);
  }
  function reset(){
    clearTimeout(stageTimer.current);dragRef.current=null;savingRef.current=false;
    setScreen("inicio");setStepIndex(0);setForm(INITIAL_FORM);setAnswers({});setSelected(null);
    setAnimating(false);setSaved(null);setError("");setDrag(null);window.scrollTo({top:0});
  }
  const tileColor=selected?colorDeOpcion(step,selected):COLORS[stepIndex%COLORS.length];
  return <main className="camino-page">
    <div className="camino-container">
      <header className="camino-head"><img src={logo} alt="Universidad Siglo 21" className="camino-logo"/><div className="camino-event">EXPERIENCIA ACCENTURE · 2026</div></header>

      {screen==="inicio"&&<section className="camino-panel camino-intro">
        <div className="camino-eyebrow">POTENCIANDO NUEVOS LIDERAZGOS</div>
        <h1>CONSTRUÍ <span>TU FUTURO.</span></h1>
        <p>Cuatro decisiones para descubrir qué te mueve. Elegí tus baldosas y construí tu propio camino profesional.</p>
        <div className="camino-mini-road" aria-hidden="true">
          {COLORS.slice(0,4).map((color,i)=><span key={color} className="camino-mini-tile" style={{"--tile-color":color}}><CaminoTileIcon stage={i}/></span>)}
          <span className="camino-destination" style={{"--destination-color":COLORS[4]}}>TU FUTURO</span>
        </div>
        <button className="camino-primary" onClick={()=>setScreen("registro")}>COMENZAR →</button>
      </section>}

      {screen==="registro"&&<section className="camino-panel">
        <div className="camino-eyebrow">ANTES DE EMPEZAR</div>
        <h1 className="camino-question">¿Quién construye este camino?</h1>
        <p className="camino-help">Completá tus datos para registrarte en la actividad.</p>
        <form onSubmit={begin} className="camino-form">
          <label>Nombre<input required maxLength="80" value={form.nombre} autoComplete="given-name" onChange={e=>setForm(f=>({...f,nombre:e.target.value}))}/></label>
          <label>Apellido<input required maxLength="80" value={form.apellido} autoComplete="family-name" onChange={e=>setForm(f=>({...f,apellido:e.target.value}))}/></label>
          <label>Correo electrónico<input required type="email" maxLength="180" value={form.email} autoComplete="email" onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></label>
          <label>WhatsApp<input required type="tel" maxLength="24" value={form.telefono} autoComplete="tel" onChange={e=>setForm(f=>({...f,telefono:e.target.value}))}/></label>
          <label className="camino-check"><input type="checkbox" required checked={form.aceptaPrivacidad} onChange={e=>setForm(f=>({...f,aceptaPrivacidad:e.target.checked}))}/><span>Acepto que Universidad Siglo 21 registre mis datos y respuestas para gestionar esta experiencia y su obsequio.</span></label>
          <label className="camino-check"><input type="checkbox" checked={form.permisoContacto} onChange={e=>setForm(f=>({...f,permisoContacto:e.target.checked}))}/><span>Quiero recibir asesoramiento y novedades académicas por WhatsApp o email. Esta opción es voluntaria y no afecta mi participación.</span></label>
          <p className="camino-small">Antes de publicar, agregar el enlace a la política de privacidad vigente y el canal para ejercer derechos sobre los datos.</p>
          {error&&<p className="camino-error" role="alert">{error}</p>}
          <button type="submit" className="camino-primary" disabled={savingRef.current}>CONSTRUIR MI CAMINO →</button>
        </form>
      </section>}

      {screen==="juego"&&<section className="camino-panel">
        <div className="camino-step-head"><span>{step.eyebrow}</span><span>PIEZA {stepIndex+1} DE 4</span></div>
        <div className="camino-progress" aria-label={`Etapa ${stepIndex+1} de 4`}>{CAMINO_STEPS.map((s,i)=><span key={s.id} className={i<=stepIndex?"active":""}/>)}</div>
        <h1 className="camino-question">{step.question}</h1>
        <p className="camino-help">{step.help||"Elegí la respuesta que mejor te representa."}</p>
        <div className="camino-board" style={{"--track-color":tileColor}}>
          <div className="camino-board-label">TU CAMINO PROFESIONAL</div>
          <div className="camino-track">
            {CAMINO_STEPS.map((s,i)=>{
              const answer=answers[s.id],active=i===stepIndex;
              return <div key={s.id} ref={active?targetRef:null}
                className={`camino-track-tile ${answer?"built":""} ${active?"current":""} ${active&&animating?"arriving":""}`}
                style={{"--tile-color":answer?colorDeOpcion(s,answer):active&&selected?colorDeOpcion(s,selected):COLORS[i%COLORS.length]}}
                aria-label={active?"Soltá aquí tu baldosa":answer?"Baldosa colocada":"Baldosa pendiente"}>
                <span className="camino-tile-symbol">{answer ? <OpcionIcono id={answer}/> : active ? "↓" : "·"}</span>
              </div>;
            })}
            <div className="camino-finish">META</div>
            <div
              className={`camino-walker ${animating ? "is-walking" : ""}`}
              style={{"--walker-fraction": (stepIndex + (animating ? 1 : 0) + 0.5) / CAMINO_STEPS.length}}
              aria-hidden="true"
            >
              <svg className="camino-walker-figure" viewBox="0 0 44 70" width="44" height="70" focusable="false">
                <circle cx="22" cy="11" r="8" fill="#F4FAF7"/>
                <rect x="15" y="21" width="14" height="24" rx="7" fill="#F4FAF7"/>
                <path className="camino-walker-arm left" d="M16 26 L10 41" stroke="#F4FAF7" strokeWidth="5" strokeLinecap="round"/>
                <path className="camino-walker-arm right" d="M28 26 L34 41" stroke="#F4FAF7" strokeWidth="5" strokeLinecap="round"/>
                <path className="camino-walker-leg left" d="M19 44 L15 62" stroke="#F4FAF7" strokeWidth="6" strokeLinecap="round"/>
                <path className="camino-walker-leg right" d="M25 44 L29 62" stroke="#F4FAF7" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <p className="camino-road-caption">{animating?"¡Baldosa colocada!":drag?.moved?"Soltá tu baldosa sobre la casilla iluminada.":"Arrastrá la baldosa al casillero iluminado, o tocá una opción y luego «Colocar»."}</p>
        </div>
        <div className="camino-choices">
          {step.choices.map((option,i)=><button key={option.id} type="button"
            className={`camino-choice ${selected===option.id?"picked":""}`}
            style={{"--choice-color":COLORS[i%COLORS.length]}}
            onClick={()=>!animating&&setSelected(option.id)}
            onPointerDown={e=>pointerDown(e,option.id)}
            onPointerMove={pointerMove} onPointerUp={pointerUp}
            onPointerCancel={()=>{dragRef.current=null;setDrag(null)}}
            disabled={animating}>
            <span className="camino-piece-mark" aria-hidden="true"><OpcionIcono id={option.id}/></span><span>{option.label}</span>
          </button>)}
        </div>
        {drag?.moved&&<div className="camino-drag-ghost" style={{left:drag.x,top:drag.y,background:colorDeOpcion(step,drag.id)}} aria-hidden="true"><OpcionIcono id={drag.id}/></div>}
        <button className="camino-primary" disabled={!selected||animating} onClick={()=>place()}>{animating?"CONSTRUYENDO...":"COLOCAR MI BALDOSA →"}</button>
        {stepIndex>0&&!animating&&<button className="camino-link" onClick={()=>{const prev=CAMINO_STEPS[stepIndex-1].id;setAnswers(a=>{const b={...a};delete b[prev];return b});setStepIndex(i=>i-1);setSelected(null)}}>← Volver a la decisión anterior</button>}
      </section>}

      {screen==="guardando"&&<section className="camino-panel camino-intro" aria-live="polite">
        <div className="camino-eyebrow">¡LLEGASTE A DESTINO!</div><h1>UN CAMINO <span>ÚNICO.</span></h1>
        <p>Estamos guardando tus respuestas en tu registro y preparando las recomendaciones.</p>
      </section>}

      {screen==="error"&&<section className="camino-panel" role="alert">
        <h1 className="camino-question">No pudimos guardar tus respuestas.</h1>
        <p className="camino-help">{error}</p>
        <button className="camino-primary" onClick={()=>save(answers)}>VOLVER A INTENTAR</button>
        <button className="camino-link" onClick={()=>setScreen("registro")}>Revisar mis datos</button>
      </section>}

      {screen==="recompensa"&&<section className="camino-panel camino-reward-screen">
        <div className="camino-reward-icon" aria-hidden="true">★</div>
        <div className="camino-eyebrow">¡DESAFÍO COMPLETADO!</div>
        <h1>¡TU CAMINO TIENE <span>RECOMPENSA!</span></h1>
        <p>Acercate a nuestro stand, decinos tu <b>nombre y apellido</b> y retirá tu regalo por participar.</p>
        <button type="button" className="camino-primary" onClick={()=>{setScreen("resultado");window.scrollTo({top:0,behavior:"smooth"});}}>VER MI RESULTADO →</button>
      </section>}

      {screen==="resultado"&&<section className="camino-panel camino-results" style={{"--profile-color":profile.color}}>
        <div className="camino-eyebrow">TU CAMINO PROFESIONAL</div>
        <div className="camino-profile"><span>EL CAMINO QUE ELEGISTE</span><h1>{profile.titulo}</h1><strong>{profile.lema}</strong><p>{profile.descripcion}</p></div>
        <p className="camino-help">{form.nombre}, este perfil refleja la aspiración que elegiste, no es un diagnóstico de personalidad. Estas recomendaciones se basan también en tu trabajo, tus estudios y tus intereses.</p>
        <div className="camino-result-path">
          {CAMINO_STEPS.map(s=><div className="camino-result-chip" key={s.id}>
            <small>{s.eyebrow}</small>
            <span>{chosen(s)?.label}</span>
          </div>)}
        </div>
        <h2>Tu próximo paso puede empezar acá</h2>
        <p className="camino-help">{recommendation.orientacion}</p>
        {recommendation.opciones.map(item=><div key={item.nombre} className="camino-reco">
          <div className="camino-reco-meta"><span>{item.tipo}</span><span>{item.modalidad}</span></div>
          <b>{item.nombre}</b>
        </div>)}
        <p className="camino-note">{recommendation.nota}</p>
        <div className="camino-perk">
          <span className="camino-perk-eyebrow">BENEFICIO EXCLUSIVO ACCENTURE</span>
          <strong className="camino-perk-total">40% OFF EN ARANCELES</strong>
          <p className="camino-perk-summary">
            <b>20% Accenture</b> (10% por convenio + 10% EXTRA por haber construido tu camino)
            <span className="camino-perk-plus"> + </span>
            <b>20% por inscripción temprana.</b>
          </p>
          <p className="camino-perk-action">Guardá una captura de esta pantalla y contactanos dentro de los próximos <b>7 días</b> para gestionar tu inscripción con nuestros asesores.</p>
          <p className="camino-perk-terms">Beneficio exclusivo para inscripciones gestionadas a través de nuestros asesores de Universidad Siglo 21. Sujeto a vigencia, programas alcanzados y condiciones comerciales aplicables.</p>
        </div>
        <div className="camino-contacto">
          <h2>¿Querés aprovechar tu beneficio?</h2>
          <p>Universidad Siglo 21 · Mar del Plata</p>
          <a className="camino-contacto-link" href="https://wa.me/5492235501021?text=Hola%2C%20particip%C3%A9%20de%20Constru%C3%AD%20tu%20futuro%20en%20Accenture%20y%20quiero%20activar%20el%20beneficio%20especial%20de%20inscripci%C3%B3n." target="_blank" rel="noopener noreferrer" aria-label="Enviar consulta por WhatsApp al 223 550 1021">
            QUIERO ACTIVAR MI BENEFICIO · 223 550 1021
          </a>
        </div>
        <div className="camino-compartir">
          <h2>¿HOY NO ES PARA VOS? ¡PUEDE SER PARA ALGUIEN QUE QUERÉS!</h2>
          <p>El convenio de Accenture con Universidad Siglo 21 también contempla a familiares directos: <b>padres, hijos, hermanos y cónyuge</b>.</p>
          <p>Compartiles esta oportunidad para que puedan consultar su beneficio y encontrar una formación para ellos.</p>
          <p><b>¿Y si es un amigo?</b> También podés recomendarle que nos escriba: lo asesoramos sobre las opciones y promociones vigentes.</p>
          <a className="camino-compartir-link" href="https://wa.me/?text=Te%20comparto%20el%20contacto%20de%20Universidad%20Siglo%2021%20Mar%20del%20Plata%20para%20que%20consultes%20por%20beneficios%20y%20formaciones%20a%20distancia%3A%20%2B54%209%20223%20550%201021" target="_blank" rel="noopener noreferrer">COMPARTIR ESTA OPORTUNIDAD</a>
        </div>
      </section>}
    </div>
  </main>;
}
