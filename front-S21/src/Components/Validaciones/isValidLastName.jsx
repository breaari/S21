export const isValidLastName = (lastName) => {
    try {
        if (!lastName) {
            return { valid: false, error: 'El apellido es requerido' };
        }

        if (lastName.length > 35) {
            return { valid: false, error: 'El apellido no debe tener más de 35 caracteres' };
        }

        if (lastName.length < 2) {
            return { valid: false, error: 'El apellido debe tener al menos 2 caracteres' };
        }

        if (lastName.trim() !== lastName) {
            return { valid: false, error: 'El apellido no debe contener espacios al inicio o al final' };
        }

        const words = lastName.trim().split(' ');
        if (words.length > 1) {
            return { valid: false, error: 'El apellido debe contener máximo un espacio entre palabras' };
        }

        if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
            return { valid: false, error: 'El apellido solo puede contener letras' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar el apellido' };
    }
};