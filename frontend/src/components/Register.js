import React from "react";
import { Link } from 'react-router-dom';
import useForm from '../utils/useForm.js';
import AuthForm from './AuthForm.js';

const Register = (props) => {
  const { values, handleChange, setValues } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values.email, values.password)
      .then(() => {
        setValues({
          email: '',
          password: ''
        })
      })
      .catch(() => {
        return;
      })
  }

  return (
    <div className="access">
      <h2 className="access__title">Регистрация</h2>
      <AuthForm
        name='signup'
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={[
          values.email,
          values.password
        ]}
        buttonText="Зарегистрироваться"
      />
      <Link className="access__redirection" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )
};

export default Register;
