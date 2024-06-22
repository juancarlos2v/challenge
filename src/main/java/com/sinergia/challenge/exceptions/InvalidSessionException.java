package com.sinergia.challenge.exceptions;

import com.sinergia.challenge.dto.ErrorResponse;
import org.springframework.http.HttpStatus;

public class InvalidSessionException extends Exception{
    public  InvalidSessionException(String message) {
        super(message);

    }
}
