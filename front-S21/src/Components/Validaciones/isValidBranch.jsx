export const isValidBranch = (branch) => {
    try {
        if (!branch || branch === 'Seleccioná') {
            return { valid: false, error: 'Debes seleccionar una sede' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar la sede' };
    }
};