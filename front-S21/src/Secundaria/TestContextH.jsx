import { createContext, useContext, useEffect, useState } from "react";

const TestContext2 = createContext();

export const TestProviderH = ({ children }) => {

  const [nombre, setNombre] = useState(() => {
    const stored = localStorage.getItem("nombre");
    return stored || "";
  });

  const [respuestas, setRespuestas] = useState(() => {
    const stored = localStorage.getItem("respuestas");
    return stored ? JSON.parse(stored) : {};
  });
  const [datosContacto, setDatosContacto] = useState(() => {
    const stored = localStorage.getItem("datosContacto");
    return stored ? JSON.parse(stored) : {
      apellido: "",
      correo: "",
      telefono: "",
      localidad: "",
    };
  });

    // Guardar automáticamente en localStorage cuando cambian
    useEffect(() => {
      localStorage.setItem("nombre", nombre);
    }, [nombre]);

  // Guardar automáticamente en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("respuestas", JSON.stringify(respuestas));
  }, [respuestas]);

  useEffect(() => {
    localStorage.setItem("datosContacto", JSON.stringify(datosContacto));
  }, [datosContacto]);

  return (
    <TestContext2.Provider
      value={{ nombre, setNombre, respuestas, setRespuestas, datosContacto, setDatosContacto }}
    >
      {children}
    </TestContext2.Provider>
  );
};

export const useTest2 = () => useContext(TestContext2);

