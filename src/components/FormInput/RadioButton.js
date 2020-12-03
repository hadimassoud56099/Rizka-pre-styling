import React from 'react'
import { Field, ErrorMessage } from 'formik'
import "../CSS/Input.css"

const RadioButton = (props) => {
    const { label, name, options } = props
    return (
       <>
            <label htmlFor={name} className='label '>{label}</label>
            <div className='input-group '>
            <Field name={name} className='input' >
                {
                    ({ field }) => {
                      
                        return options.map(option => {
                            return (
                                <div key={option.key } >
                                    
                                    <input type="radio" id={option.value} {...field} value={option.value} checked={field.value === option.value}  />
                                    <label htmlFor={option.value} >{option.key}</label>
                                </div>


                            )
                        })
                    }
                }
            </Field>
        </div>
        <div className="danger-error"><ErrorMessage name={name} /></div>
        </>
    )
}

export default RadioButton
