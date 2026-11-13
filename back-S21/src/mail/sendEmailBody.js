const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "../Carreras/carreras.json");

const sendEmailBody = async (program, name, lastName) => {
  try {
    const rawdata = fs.readFileSync(jsonPath);
    const carreras = JSON.parse(rawdata);

    const carrera = carreras.Carreras.find((c) => c.name === program);

    if (!carrera) {
      console.log(`No se encontró información para la carrera '${program}'`);
      return "";
    }

    const { url } = carrera;

    const body = `
    <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:30px;">
      <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.06);">

        <!-- Imagen campaña -->
        <img 
          src="https://back.universidadsiglo21online.com/assets/PORTADA%20-%20CAMPAÑA%202026_LINKEDIN.jpeg"
          alt="Es más que estudiar, es lo que sigue"
          style="width:100%; display:block; border:0;"
        />

        <!-- Header -->
        <div style="background-color:#2A9D8F; padding:22px; text-align:center;">
          <h1 style="color:#ffffff; margin:0; font-size:22px;">
            ${program} · Ingreso 2027
          </h1>
        </div>

        <!-- Contenido -->
        <div style="padding:30px;">
          <p style="font-size:18px; font-weight:bold; color:#2A9D8F;">
            ¡Hola ${name} ${lastName}!
          </p>

          <p>
            Gracias por tu interés en la <strong>Universidad Siglo 21</strong>.
            Elegir una carrera es pensar en lo que sigue, y queremos acompañarte
            en ese camino con nuestra <strong>oferta académica 2027</strong>.
          </p>

       <hr style="border:none;border-top:1px solid #e0e0e0; margin:24px 0;" />

          <h2 style="color:#2A9D8F; font-size:18px; margin-bottom:10px;">
            ¿Por qué elegir Universidad Siglo 21?
          </h2>

          <ul style="padding-left:20px; margin:0;">
            <li>Es la Universidad privada <strong>más elegida de Argentina</strong>.</li>
            <li>Ofrece tecnología educativa aplicada al aprendizaje.</li>
            <li>Cuenta con acompañamiento académico permanente.</li>
            <li>Prácticas profesionales y convenios institucionales.</li>
            <li>Reconocimiento de equivalencias.</li>
            <li>Beneficios arancelarios por rendimiento académico.</li>
            <li>Portal de Empleo para estudiantes y graduados.</li>
            <li>Más de <strong>300 Centros de Aprendizaje Universitarios</strong>.</li>
          </ul>

          <p style="margin-top:20px;">
            👉 Conocé <strong>tu futura carrera:</strong> plan de estudios, perfil profesional y salida laboral ingresando
            <a href="${url}" target="_blank" style="color:#2A9D8F; font-weight:bold;">
              aquí
            </a>.
          </p>

          <hr style="border:none;border-top:1px solid #e0e0e0; margin:24px 0;" />

          <h2 style="color:#2A9D8F; font-size:18px; margin-bottom:10px;">
            Modalidades de cursado
          </h2>

          <p><strong>Educación Distribuida:</strong> Lo mejor de los dos mundos! Vas a contar con la flexibilidad de la cursada online + 1 encuentro semanal presencial en tu CAU, para enriquecer tu proceso de aprendizaje junto a tus compañeros y un tutor dinamizador que les brindara guía y apoyo.</p>
          <p><strong>Educación Distribuida Home:</strong>100% online, flexible y adaptable a tus horarios! La única Universidad que te permite elegir en que día y horario rendir tus examenes!</p>

          <!-- CTA WhatsApp -->
          <div style="text-align:center; margin:35px 0;">
            <a href="https://wa.me/5492235512665"
               target="_blank"
               style="background-color:#25D366; color:#ffffff; padding:14px 22px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
              Consultanos por WhatsApp
            </a>
          </div>

          <p style="text-align:center; font-size:15px;">
            Estamos para acompañarte y ayudarte a tomar la mejor decisión.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color:#f1f1f1; padding:20px; text-align:center; font-size:14px; color:#666;">
          Universidad Siglo 21<br/>
          <a href="https://www.instagram.com/lasiglo21.mdp" style="color:#2A9D8F; text-decoration:none;">
            @lasiglo21.mdp
          </a> |
          <a href="https://universidadsiglo21online.com" style="color:#2A9D8F; text-decoration:none;">
            universidadsiglo21online.com
          </a>
        </div>

      </div>
    </div>
    `;

    return body;
  } catch (error) {
    console.error("Error al generar el cuerpo del correo:", error);
    return "";
  }
};
module.exports = sendEmailBody;
