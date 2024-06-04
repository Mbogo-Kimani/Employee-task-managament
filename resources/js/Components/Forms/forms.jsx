import React, { useState } from 'react';

export default function Form({input,setInput,errors,setErrors,onSubmit,children,className}) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const validate = (input) => {
    Object.keys(input).forEach((val) => {
        if(val == "email"){
           
            !isEmailValid(input[val]) && setErrors({...errors,[val]: "Email must be valid"});
        }
       
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({})
    validate(input)
    
    if (Object.keys(errors).length == 0) {
      onSubmit(e)
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}