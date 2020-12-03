import React from 'react'
import {Field,ErrorMessage} from 'formik'
import "../CSS/Input.css"


const TextArea = (props) => {
    const{label,name}=props
    return (
 <div>
    <label htmlFor={name} className='label'>{label}</label>
    <Field as="textarea" id={name} name={name}  className='input input-group'/>
    <div className="danger-error"><ErrorMessage name={name} /></div>
</div>
    )
}

export default TextArea
