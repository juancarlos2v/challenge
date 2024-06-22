package com.sinergia.challenge.exceptions;

import com.sinergia.challenge.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.net.http.HttpResponse;

public class DuplicatedEmailException  extends RuntimeException{
    public DuplicatedEmailException(){
        new ErrorResponse( "El mail ya esta en uso", HttpStatus.CONFLICT);
    }
}
