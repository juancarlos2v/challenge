package com.sinergia.challenge.utils;
import java.security.SecureRandom;

public class RandomPasswordGenerator {

    // Caracteres permitidos para la contraseña
    private static final String ALLOWED_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";

    // Generador seguro de números aleatorios
    private static final SecureRandom random = new SecureRandom();

    public static String generatePassword() {
        StringBuilder password = new StringBuilder();

        // Agregar al menos una letra mayúscula, una letra minúscula y un dígito
        password.append(randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ")); // Letra mayúscula
        password.append(randomChar("abcdefghijklmnopqrstuvwxyz")); // Letra minúscula
        password.append(randomChar("0123456789")); // Dígito

        // Generar el resto de la contraseña hasta alcanzar la longitud mínima requerida
        for (int i = 3; i < 12; i++) { // Longitud mínima de 12 caracteres total
            password.append(randomChar(ALLOWED_CHARACTERS));
        }

        // Mezclar los caracteres para una distribución más aleatoria
        for (int i = password.length() - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            char temp = password.charAt(index);
            password.setCharAt(index, password.charAt(i));
            password.setCharAt(i, temp);
        }

        return password.toString();
    }

    // Método auxiliar para obtener un carácter aleatorio de una cadena dada
    private static char randomChar(String characters) {
        int index = random.nextInt(characters.length());
        return characters.charAt(index);
    }

    public static void main(String[] args) {
        // Generar y mostrar una contraseña aleatoria que cumpla con los criterios
        String password = generatePassword();
        System.out.println("Contraseña generada: " + password);

        // Validar que la contraseña cumpla con la expresión regular
        boolean matchesRegex = password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$");
        System.out.println("¿Cumple con la expresión regular? " + matchesRegex);
    }
}

