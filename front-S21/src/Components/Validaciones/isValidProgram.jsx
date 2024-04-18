export const isValidProgram = (program) => {
    try {
        if (!program || program === 'Seleccioná') {
            return { valid: false, error: 'Debes seleccionar un programa' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar el programa' };
    }
};