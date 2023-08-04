import React from 'react';

export default function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, setValues, handleChange };
}
