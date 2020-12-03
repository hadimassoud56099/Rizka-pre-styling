import React from 'react'
import { Field, ErrorMessage } from 'formik'
import "../CSS/Input.css"

const CheckBoxes = (props) => {
    const { label, name, options } = props
    return (
        <div>
            <label htmlFor={name} className='label'>{label}</label>
            <Field name={name} className='input'>
                {
                    ({ field }) => {
                        console.log("Field",field)
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key}>
                                   
                                    <label htmlFor={option.value}>{option.key}</label>
                                    <input type="checkbox" id={option.value} {...field} value={option.value} checked={field.value.includes(option.value) } />
                                   
                                </React.Fragment>


                            )
                        })
                    }
                }
            </Field>
            <div className="danger-error"><ErrorMessage name={name} /></div>
        </div>
    )
}

export default CheckBoxes
