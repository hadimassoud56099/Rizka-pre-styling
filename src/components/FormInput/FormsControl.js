import React from 'react'
import CheckBoxes from './CheckBoxes'
import Input from './Input'
import RadioButton from './RadioButton'
import Select from './Select'
import TextArea from './TextArea'



//this component will decide which of the form fields will be rendered
const FormsControl = (props) => {
    const {control,...rest}=props
    switch(control){
        case 'input':return<Input {...rest}/>
        case 'textArea':return<TextArea {...rest}/>
        case 'select':return<Select {...rest}/>
        case 'radio':return<RadioButton {...rest}/>
        case 'checkbox': return <CheckBoxes {...rest}/>
       
        default: return null;


    }
  
}

export default FormsControl
