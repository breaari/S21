import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-blanco-sin-fondo.png";
import { CAMINO_STEPS, recomendarFormaciones } from "./caminoData";
import "./CaminoAccenture.css";

const API_URL = import.meta.env.PROD ? "" : `http://${window.location.hostname}:3003`;
const inicial = { nombre:"", apellido:"", email:"", telefono:"", permisoContacto:false, aceptaPrivacidad:false };
const BRANCH_COLORS = { liderar:"#bc9fea", innovar:"#80cce5", crecer:"#91d3a2", emprender:"#f0c281", especialista:"#88a9ed" };
const getOption=(step,id)=>step.choices.find(x=>x.id===id);

export function CaminoAccenture() {
  const [screen,setScreen] = useState("inicio");
  const [stepIndex,setStepIndex] = useState(0);
  const [answers,setAnswers] = useState({});
  const [selected,setSelected] = useState(null);
  const [animating,setAnimating] = useState(false);
  const [form,setForm] = useState(inicial);
  const [error,setError] = useState("");
  const [saving,setSaving] = useState(false);
  const [saved,setSaved] = useState(null);
  const [drag,setDrag] = useState(null);
  const stageTimer=useRef(null);
  const targetRef=useRef(null);
  useEffect(()=>()=>clearTimeout(stageTimer.current),[]);
  const step=CAMINO_STEPS[stepIndex];
  const mainColor=BRANCH_COLORS[answers.aspiracion] || "#76d3ac";
  const recommendation=recomendarFormaciones(answers);
  const chosen = (s) => getOption(s,answers[s.id]);

  function choose(id) { if(animating)return;setSelected(id);setError(""); }
  function place(id=selected) {
    if (!id || animating) return;
    const option=getOption(step,id);
    if (!option)return;
    setAnimating(true);setSelected(id);
    setAnswers(prev=>({...prev,[step.id]:id}));
    stageTimer.current=setTimeout(()=>{
      setAnimating(false);setSelected(null);setDrag(null);
      if(stepIndex===CAMINO_STEPS.length-1){setScreen("registro");}
      else setStepIndex(i=>i+1);
    },950);
  }
  function onPointerMove(event){
    if(!drag)return;
    setDrag(prev=>prev?{...prev,x:event.clientX,y:event.clientY}:null);
  }
  function onPointerUp(event,id){
    if(!drag)return;
    const rect=targetRef.current?.getBoundingClientRect();
    const hit=rect && event.clientX>=rect.left-24 && event.clientX<=rect.right+24 && event.clientY>=rect.top-24 && event.clientY<=rect.bottom+24;
    setDrag(null);
    if(hit)place(id);
    else choose(id);
  }
  async function save(event){
    event.preventDefault();setError("");
    if(!form.nombre.trim()||!form.apellido.trim()||!form.telefono.trim()||!form.email.trim()){setError("Completá tus datos para guardar el recorrido.");return;}
    if(!form.aceptaPrivacidad){setError("Para guardar tus datos, necesitás aceptar el aviso de privacidad.");return;}
    setSaving(true);
    try{
      const response=await fetch(`${API_URL}/accenture-camino/participar`,{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,respuestas:answers,origen:"feria-accenture-2026"})
      });
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||"No pudimos guardar el recorrido.");
      setSaved(data);setScreen("resultado");
    }catch(e){setError(e.message||"Ocurrió un error al guardar.");}
    finally{setSaving(false);}
  }
  function reset(){clearTimeout(stageTimer.current);setScreen("inicio");setStepIndex(0);setAnswers({});setSelected(null);setAnimating(false);setForm(inicial);setSaved(null);setError("");}
  const tone = (stepIndex===0 && selected) ? (BRANCH_COLORS[selected]||mainColor) : mainColor;
  return (
    <main className="camino-page">
      <div className="camino-container">
        <header className="camino-head">
          <img src={logo} alt="Universidad Siglo 21" className="camino-logo"/>
          <div className="camino-event">EXPERIENCIA ACCENTURE · 2026</div>
        </header>
        {screen==="inicio" && <section className="camino-panel camino-intro">
          <div className="camino-eyebrow">POTENCIANDO NUEVOS LIDERAZGOS</div>
          <h1>CONSTRUÍ <span>TU FUTURO.</span></h1>
          <p>Cada decisión es una pieza del camino. Elegí cuatro baldosas, construí tu ruta y descubrí nuevas oportunidades para seguir creciendo.</p>
          <div className="camino-mini-road" aria-hidden="true">
            <span className="camino-character">●</span><span/><span/><span/><span/><span className="camino-destination">2030</span>
          </div>
          <button className="camino-primary" onClick={()=>setScreen("juego")}>EMPEZAR MI CAMINO <span aria-hidden="true">→</span></button>
          <p className="camino-small">Jugá desde tu celular. No necesitás descargar nada.</p>
        </section>}
        {screen==="juego" && <section className="camino-panel">
          <div className="camino-step-head"><span>{step.eyebrow}</span><span>PIEZA {stepIndex+1} DE 4</span></div>
          <div className="camino-progress" aria-label={`Etapa ${stepIndex+1} de 4`}>{CAMINO_STEPS.map((s,i)=><span key={s.id} className={i<=stepIndex?"active":""}/>)}</div>
          <h1 className="camino-question">{step.question}</h1>
          <p className="camino-help">{step.help || "Elegí la baldosa que más te representa."}</p>
          <div className="camino-board" style={{"--track-color":tone}}>
            <div className="camino-board-label">TU CAMINO</div>
            <div className="camino-track">
              <div className="camino-start"><span className="camino-person-head"/><span className="camino-person-body"/></div>
              {CAMINO_STEPS.map((s,i)=>{
                const answer=answers[s.id];const active=i===stepIndex;
                return <div key={s.id} className={`camino-track-tile ${answer?"built":""} ${active?"current":""} ${active&&animating?"arriving":""}`}
                  ref={active?targetRef:null}
                  style={{"--tile-color":i===0?(BRANCH_COLORS[answer||selected]||"#8bd4c5"):"#83d4b2"}}>
                  {answer?<span className="camino-tile-symbol">✓</span>:active?<span className="camino-tile-symbol">{animating?"✓":"+"}</span>:<span className="camino-tile-symbol">·</span>}
                </div>;
              })}
              <div className="camino-finish">2030</div>
            </div>
            <div className="camino-road-caption">{animating?"¡La pieza encastró! Avanzás un paso más.": "Arrastrá una pieza al espacio señalado, o elegila y tocá «Colocar»."}</div>
            <div className={`camino-avatar ${animating?"moving":""}`} style={{left:`${8+stepIndex*21}%`}} aria-hidden="true">●</div>
          </div>
          <div className="camino-choices">
            {step.choices.map((choice,i)=><button type="button" key={choice.id}
                className={`camino-choice ${selected===choice.id?"picked":""}`}
                style={{"--choice-color":stepIndex===0?choice.color: ["#7dd3c4","#a9cced","#b9b0ee","#e6c59e","#97d7b1","#c4d8cb"][i]}}
                onClick={()=>choose(choice.id)}
                onPointerDown={e=>{if(e.pointerType==="mouse"||e.pointerType==="touch"){setSelected(choice.id);setDrag({id:choice.id,x:e.clientX,y:e.clientY});e.currentTarget.setPointerCapture(e.pointerId);}}}
                onPointerMove={onPointerMove}
                onPointerUp={e=>onPointerUp(e,choice.id)}
                onPointerCancel={()=>setDrag(null)}
              ><span className="camino-piece-mark" aria-hidden="true">◆</span><span>{choice.label}</span></button>)}
          </div>
          <button className="camino-primary" disabled={!selected||animating} onClick={()=>place()}>{animating?"CONSTRUYENDO...":"COLOCAR MI PIEZA →"}</button>
          {stepIndex>0 && !animating && <button type="button" className="camino-link" onClick={()=>{const prev=CAMINO_STEPS[stepIndex-1].id;setAnswers(a=>{const b={...a};delete b[prev];return b});setStepIndex(i=>i-1);setSelected(null)}}>← Volver a la decisión anterior</button>}
        </section>}
        {screen==="registro" && <section className="camino-panel">
          <div className="camino-eyebrow">¡TU CAMINO ESTÁ COMPLETO!</div><h1 className="camino-question">Guardá tu recorrido y descubrí tus opciones.</h1>
          <p className="camino-help">Registrate para recibir tu resultado y retirar tu obsequio de la actividad en nuestro stand.</p>
          <div className="camino-summary">{CAMINO_STEPS.map(s=><span key={s.id}>{chosen(s)?.short}</span>)}</div>
          <form onSubmit={save} className="camino-form">
            <label>Nombre<input required maxLength="80" value={form.nombre} autoComplete="given-name" onChange={e=>setForm(f=>({...f,nombre:e.target.value}))}/></label>
            <label>Apellido<input required maxLength="80" value={form.apellido} autoComplete="family-name" onChange={e=>setForm(f=>({...f,apellido:e.target.value}))}/></label>
            <label>Correo electrónico<input required type="email" maxLength="180" value={form.email} autoComplete="email" onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></label>
            <label>WhatsApp<input required type="tel" maxLength="24" value={form.telefono} autoComplete="tel" onChange={e=>setForm(f=>({...f,telefono:e.target.value}))}/></label>
            <label className="camino-check"><input type="checkbox" required checked={form.aceptaPrivacidad} onChange={e=>setForm(f=>({...f,aceptaPrivacidad:e.target.checked}))}/><span>Acepto que Universidad Siglo 21 registre mis respuestas y datos para gestionar esta experiencia y su obsequio. Podré solicitar acceso, rectificación o supresión de mis datos.</span></label>
            <label className="camino-check"><input type="checkbox" checked={form.permisoContacto} onChange={e=>setForm(f=>({...f,permisoContacto:e.target.checked}))}/><span>Quiero recibir asesoramiento y novedades académicas por WhatsApp o email. Es opcional y no afecta mi participación.</span></label>
            <p className="camino-small">Antes de publicar, incorporar aquí el enlace a la política de privacidad vigente y el contacto para ejercer derechos.</p>
            {error&&<p className="camino-error" role="alert">{error}</p>}
            <button type="submit" className="camino-primary" disabled={saving}>{saving?"GUARDANDO...":"DESCUBRIR MI RESULTADO →"}</button>
          </form>
        </section>}
        {screen==="resultado" && <section className="camino-panel camino-results">
          <div className="camino-eyebrow">LLEGASTE A TU PRÓXIMO DESTINO</div>
          <h1>¡CONSTRUISTE <span>TU CAMINO!</span></h1>
          <p className="camino-help">{form.nombre}, estas son algunas opciones para explorar a partir de tus elecciones.</p>
          <div className="camino-result-path">{CAMINO_STEPS.map(s=><span key={s.id}>{chosen(s)?.short}</span>)}</div>
          <h2>Formaciones para explorar</h2>
          {recommendation.opciones.map((c,i)=><div className="camino-reco" key={c}><b>{i+1}. {c}</b></div>)}
          <p className="camino-note">{recommendation.orientacion}. {recommendation.nota}</p>
          <div className="camino-perk"><strong>Beneficio por convenio Accenture: 10%</strong><p>La promoción adicional se informará únicamente cuando esté aprobada y se confirmen sus condiciones.</p></div>
          <div className="camino-ticket"><span>RETIRO DE MERCHANDISING</span><strong>{saved?.codigoRetiro||"Registro confirmado"}</strong><small>Mostrá este código en el stand. Sujeto a disponibilidad.</small></div>
          <button className="camino-primary" onClick={()=>document.getElementById("camino-consulta")?.scrollIntoView({behavior:"smooth"})}>QUIERO ASESORAMIENTO / INSCRIBIRME →</button>
          <div id="camino-consulta" className="camino-next"><h2>¿Querés avanzar en tu inscripción 2027?</h2>
            <p>Acercate a nuestras asesoras con tu resultado y consultá la oferta y las condiciones vigentes.</p>
            <p className="camino-small">La solicitud de contacto comercial requiere autorización específica. {form.permisoContacto?"Autorizaste recibir comunicaciones académicas.":"No autorizaste comunicaciones comerciales; igualmente podés consultar presencialmente."}</p>
          </div>
          <button className="camino-link" onClick={reset}>Empezar nuevamente</button>
        </section>}
      </div>
    </main>
  );
}
