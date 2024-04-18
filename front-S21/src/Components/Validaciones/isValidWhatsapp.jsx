export const isValidWhatsapp = (whatsapp) => {
    try {
        if (!whatsapp) {
            return { valid: false, error: 'El número de WhatsApp es requerido' };
        }

        const whatsappRegex = /^\d{10,}$/;

        if (!whatsappRegex.test(whatsapp)) {
            return { valid: false, error: 'Ingresá un número de 10 dígitos. Ej: 2235355199)' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Error al validar el número de WhatsApp' };
    }
};
