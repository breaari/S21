import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-blanco-sin-fondo.png";
import { CAMINO_STEPS } from "./caminoData";
import { PERFILES, recomendarFormaciones } from "./catalogoDistancia";
import "./CaminoAccenture.css";

const API_URL = "https://back.universidadsiglo21online.com";
const INITIAL_FORM = { nombre:"", apellido:"", email:"", telefono:"", permisoContacto:false, aceptaPrivacidad:false };
const getOption=(step,id)=>step.choices.find(x=>x.id===id);
const COLORS=["#7dd3c4","#a9cced","#b9b0ee","#e6c59e","#97d7b1","#c4d8cb"];

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
      setScreen("resultado");
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
  const tileColor=stepIndex===0&&selected?PERFILES[selected]?.color:profile.color;
  return <main className="camino-page">
    <div className="camino-container">
      <header className="camino-head"><img src={logo} alt="Universidad Siglo 21" className="camino-logo"/><div className="camino-event">EXPERIENCIA ACCENTURE · 2026</div></header>

      {screen==="inicio"&&<section className="camino-panel camino-intro">
        <div className="camino-eyebrow">POTENCIANDO NUEVOS LIDERAZGOS</div>
        <h1>CONSTRUÍ <span>TU FUTURO.</span></h1>
        <p>Cuatro decisiones para descubrir qué te mueve. Elegí tus baldosas y construí tu propio camino profesional.</p>
        <div className="camino-mini-road" aria-hidden="true"><span className="camino-character">●</span><span/><span/><span/><span/><span className="camino-destination">TU FUTURO</span></div>
        <button className="camino-primary" onClick={()=>setScreen("registro")}>COMENZAR →</button>
        <p className="camino-small">Una experiencia breve desde tu celular.</p>
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
            <div className="camino-start"><span className="camino-person-head"/><span className="camino-person-body"/></div>
            {CAMINO_STEPS.map((s,i)=>{
              const answer=answers[s.id],active=i===stepIndex;
              return <div key={s.id} ref={active?targetRef:null}
                className={`camino-track-tile ${answer?"built":""} ${active?"current":""} ${active&&animating?"arriving":""}`}
                style={{"--tile-color":i===0?(PERFILES[answer||selected]?.color||"#8bd4c5"):"#83d4b2"}}
                aria-label={active?"Soltá aquí tu baldosa":answer?"Baldosa colocada":"Baldosa pendiente"}>
                <span className="camino-tile-symbol">{answer||active&&animating?"✓":active?"↓":"·"}</span>
              </div>;
            })}
            <div className="camino-finish">META</div>
          </div>
          <p className="camino-road-caption">{animating?"¡Baldosa colocada!":drag?.moved?"Soltá tu baldosa sobre la casilla iluminada.":"Arrastrá la baldosa al casillero iluminado, o tocá una opción y luego «Colocar»."}</p>
          <span className={`camino-avatar ${animating?"moving":""}`} style={{left:`${8+stepIndex*21}%`}} aria-hidden="true">●</span>
        </div>
        <div className="camino-choices">
          {step.choices.map((option,i)=><button key={option.id} type="button"
            className={`camino-choice ${selected===option.id?"picked":""}`}
            style={{"--choice-color":option.color||COLORS[i]}}
            onClick={()=>!animating&&setSelected(option.id)}
            onPointerDown={e=>pointerDown(e,option.id)}
            onPointerMove={pointerMove} onPointerUp={pointerUp}
            onPointerCancel={()=>{dragRef.current=null;setDrag(null)}}
            disabled={animating}>
            <span className="camino-piece-mark" aria-hidden="true">◆</span><span>{option.label}</span>
          </button>)}
        </div>
        {drag?.moved&&<div className="camino-drag-ghost" style={{left:drag.x,top:drag.y,background:step.choices.find(x=>x.id===drag.id)?.color||"#83d4b2"}} aria-hidden="true">◆</div>}
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
        <div className="camino-merch">
          Para retirar tu merchandising, acercate al stand e indicá tu <b>nombre y apellido</b>.
        </div>
        <div className="camino-contacto">
          <h2>¿Querés aprovechar tu beneficio?</h2>
          <p>Universidad Siglo 21 · Mar del Plata</p>
          <a className="camino-contacto-link" href="https://wa.me/5492235501021?text=Hola%2C%20particip%C3%A9%20de%20Constru%C3%AD%20tu%20futuro%20en%20Accenture%20y%20quiero%20activar%20el%20beneficio%20especial%20de%20inscripci%C3%B3n." target="_blank" rel="noopener noreferrer" aria-label="Enviar consulta por WhatsApp al 223 550 1021">
            QUIERO ACTIVAR MI BENEFICIO · 223 550 1021
          </a>
        </div>
      </section>}
    </div>
  </main>;
}
