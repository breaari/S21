export const isValidBranch = (branch) => {
    try {
        if (!branch) {
            return { valid: false, error: 'Debes ingresar una localidad' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar la localidad' };
    }
};