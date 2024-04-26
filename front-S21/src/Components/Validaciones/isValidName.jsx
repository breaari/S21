export const isValidName = (name) => {
    try {
        if (!name) {
            return { valid: false, error: 'El nombre es requerido' };
        }

        if (name.length > 35) {
            return { valid: false, error: 'El nombre no debe tener más de 35 caracteres' };
        }

        if (name.length < 2) {
            return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
        }

        if (name.trim() !== name) {
            return { valid: false, error: 'El nombre no debe contener espacios al inicio o al final' };
        }


        if (!/^[a-zA-Z ]+$/.test(name.trim())) {
            return { valid: false, error: 'El nombre solo puede contener letras' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar el nombre' };
    }
};