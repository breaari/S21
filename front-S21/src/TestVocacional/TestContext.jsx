import { createContext, useContext, useState } from "react";

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [datosContacto, setDatosContacto] = useState({
    apellido: "",
    correo: "",
    telefono: "",
    localidad: "",
  });

  return (
    <TestContext.Provider
      value={{
        nombre,
        setNombre,
        respuestas,
        setRespuestas,
        datosContacto,
        setDatosContacto,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);
