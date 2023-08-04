import React from "react";
import useForm from '../utils/useForm.js';
import AuthForm from './AuthForm.js';

const Login = (props) => {
  const { values, handleChange, setValues } = useForm({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password)
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
      <h2 className="access__title">Вход</h2>
      <AuthForm
        name='signin'
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={[
          values.email,
          values.password
        ]}
        buttonText="Войти"
      />
    </div>
  )
};

export default Login;
