import { blob, Canister, query, ic, text, bool, Principal, update, Void, Null,Variant} from 'azle';
import { managementCanister } from 'azle/canisters/management';

// Simulación de una cuenta de ahorros
const datosCuentaAhorros = Uint8Array.from([10000, 11000, 12000, 13000, 14000]);
// aqui
const Emotion = Variant({
    Happy: Null,
    Indifferent: Null,
    Sad: Null
});

const Reaction = Variant({
    Fire: Null,
    ThumbsUp: Null,
    Emotion: Emotion
});

export default Canister({
    // Función para obtener el historial de saldo de una cuenta de ahorros
    obtenerHistorialCuentaAhorros: query([], blob, () => {
        return datosCuentaAhorros; // Simulación de datos históricos de saldo
    }),
    // Función para calcular el interés acumulado en una cuenta de ahorros
    calcularInteres: query([blob], blob, (historialSaldo) => {
        // Calcular el interés acumulado (ejemplo simple)
        const tasaInteres = 0.05; // Tasa de interés anual
        const historialInteres = new Uint8Array(historialSaldo.length);

        for (let i = 0; i < historialSaldo.length; i++) {
            if (i === 0) {
                historialInteres[i] = 0; // No hay interés en el primer período
            } else {
                const saldoAnterior = historialSaldo[i - 1];
                const saldoActual = historialSaldo[i];
                const interesGanado = (saldoActual - saldoAnterior) * tasaInteres;
                historialInteres[i] = interesGanado;
            }
        }

        return historialInteres;
    }),
    imprimirSaldos: query([], bool, () => {
        const historialSaldo = datosCuentaAhorros;
        
        for (let i = 0; i < historialSaldo.length; i++) {
            ic.print(`Saldo ${i + 1}: $${historialSaldo[i]}`);
        }

        return true; // Indicar que la impresión se ha completado con éxito
    }),
    // Función para obtener la reacción emocional frente a un evento financiero
    getFinancialReaction: query([], Reaction, () => {
        return {
            Emotion: {
                Happy: null
            }
        };
    }),
    // Función para imprimir la reacción financiera y emocional
    ExperienciaUsuaio: query([Reaction], Reaction, (reaction) => {
        console.log("Experiencia:");
        console.log(reaction);
        return reaction;
    })
});
