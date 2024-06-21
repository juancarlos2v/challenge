package com.sinergia.challenge.utils;


import com.sinergia.challenge.exceptions.InvalidSessionException;

import java.util.regex.Pattern;

public class Validator {
    private static final String PASSWORD_PATTERN =
            "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public static void isValidate(String email, String password) throws InvalidSessionException {
        if (!email.contains("@") || !pattern.matcher(password).matches()){
            throw new InvalidSessionException("Usuario/contraseña incorrectos");
        }
    }

}
