import React from 'react'
import {Field,ErrorMessage} from 'formik'
import "../CSS/Input.css"


const Select = (props) => {
    const{label,name,options,placeholder,onFocus,...rest}=props
    return (
        <div className="input-div">
        <label htmlFor={name} className='label'>{label}</label>
        <Field as="select" id={name} name={name} placeholder={placeholder}  {...rest} className='input input-group'>
            {
                options.map(option => {
                return(
                <option className="select-option" key={option.value} value={option.value}>
                    {option.option}
                    </option>
                )
            })}
        </Field>
        <div className="danger-error"><ErrorMessage name={name} /></div>
        </div>
       
    )
}

export default Select
