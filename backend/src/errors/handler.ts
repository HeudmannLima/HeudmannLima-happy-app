import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  
  // se o erro for uma instancia(objeto) da classe
  // ValidationError, é pq é erro de validação do Ypu,
  // percorre-se o array e mostra os erros pro FE de for amigável
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path!] = err.errors;
    });

    console.error(error)
    return res.status(400).json({ message: 'Validation Error', errors });
  }


  // Erros gerais
  return res.status(500).json({ message: 'Internal server error'}); 
};

export default errorHandler;