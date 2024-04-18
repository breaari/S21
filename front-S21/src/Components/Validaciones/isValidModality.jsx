export const isValidModality = (modality) => {
    try {
        if (!modality || modality === 'Seleccioná') {
            return { valid: false, error: 'Debes seleccionar una modalidad' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar modalidad' };
    }
};