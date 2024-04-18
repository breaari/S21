export const isValidType = (type) => {
    try {
        if (!type || type === 'Seleccioná') {
            return { valid: false, error: 'Debes seleccionar un tipo de programa' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar el tipo de programa' };
    }
};