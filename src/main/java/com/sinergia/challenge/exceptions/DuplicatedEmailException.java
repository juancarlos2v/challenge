package com.sinergia.challenge.exceptions;

public class DuplicatedEmailException  extends RuntimeException{
    public DuplicatedEmailException(String message){
        super(message);
    }
}
