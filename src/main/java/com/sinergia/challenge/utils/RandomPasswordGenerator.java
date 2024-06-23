package com.sinergia.challenge.utils;
import java.security.SecureRandom;

public class RandomPasswordGenerator {


    private static final String ALLOWED_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    private static final SecureRandom random = new SecureRandom();

    public static String generatePassword() {
        StringBuilder password = new StringBuilder();

        password.append(randomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
        password.append(randomChar("abcdefghijklmnopqrstuvwxyz"));
        password.append(randomChar("0123456789")); // Dígito

        for (int i = 3; i < 12; i++) {
            password.append(randomChar(ALLOWED_CHARACTERS));
        }

        for (int i = password.length() - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            char temp = password.charAt(index);
            password.setCharAt(index, password.charAt(i));
            password.setCharAt(i, temp);
        }

        return password.toString();
    }

    private static char randomChar(String characters) {
        int index = random.nextInt(characters.length());
        return characters.charAt(index);
    }

    public static void main(String[] args) {
        String password = generatePassword();
        System.out.println("Contraseña generada: " + password);
        boolean matchesRegex = password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$");
    }
}

