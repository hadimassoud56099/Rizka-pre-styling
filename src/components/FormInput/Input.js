import React from 'react'
import {Field,ErrorMessage} from 'formik'
import "../CSS/Input.css"

const Input = (props) => {
    const{label,name,placeholder,onFocus,...rest}=props
    return (
        <div className="input-div">
        <label htmlFor={name} className='label'>{label}</label>
        <Field  id={name}  name={name}  placeholder={placeholder}  {...rest} onFocus={onFocus} className='input input-group' />
        <div className="danger-error"><ErrorMessage name={name} /></div>
        </div>
    )
}

export default Input
