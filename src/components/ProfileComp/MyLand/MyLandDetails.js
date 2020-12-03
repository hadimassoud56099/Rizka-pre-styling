import React, { useEffect, useState, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormsControl from "../../FormInput/FormsControl";
import "../../CSS/AddLand.css";
import "../../CSS/Form.css";
import "../../CSS/Buttons.css";
import { useHistory } from "react-router-dom";
import AddLand from "../../../containers/AddLand";
import axios from "axios";

const MyLandDetails = (props) => {
  let history = useHistory();
  const listInfo = {
    governateOption: [],
    districtOption: [],
    landAreaOption: [],
    waterSourceOption: [],
  };

  const savedValues = {
    landName: props.landValues.landName,
    landRegistryNo: props.landValues.landRegistryNo,
    governate: props.landValues.governate,
    district: props.landValues.district,
    landArea: props.landValues.landArea,
    waterSource: props.landValues.waterSource,
    assecibility: props.landValues.assecibility,
    description: props.landValues.description,
    typeOfExisting: props.landValues.typeOfExisting,
  };
  const [formValues, setFormValues] = useState("");
  //   const memorizedValues=useMemo(()=>{setFormValues(savedValues)},[savedValues])

  const validationSchema = Yup.object({
    landName: Yup.string().required(" Field required"),
    landRegistryNo: Yup.string().required(" Field required"),
    governate: Yup.string().required(" Field required"),
    district: Yup.string().required(" Field required"),
    landArea: Yup.string().required(" Field required"),
    waterSource: Yup.string().required(" Field required"),
    assecibility: Yup.string().required(" Field required"),
    typeOfExisting: Yup.string().required(" Field required"),
    description: Yup.string().required(" Field required"),
  });
  console.log(props.submitValue);
  useEffect(() => {
    setFormValues(savedValues);
  }, [props.dependency]);

  const handleAddLand = () => {
    history.push("/AddLand");
  };
  const onSubmit = (values) => {
    console.log("values.name", values.name);
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form class="land-box">
            <div className="box-container">
              <div className="box">
                <FormsControl
                  control="input"
                  label="Land Name"
                  name="landName"
                />
                <FormsControl
                  control="input"
                  label='Land Registry No"'
                  name="landRegistryNo"
                />
                <FormsControl
                  control="input"
                  label="Governate"
                  name="governate"
                />
              </div>
              <div className="box">
                <FormsControl
                  control="input"
                  label=" District"
                  name="district"
                />

                <FormsControl
                  control="input"
                  label=" Land Area"
                  name="landArea"
                />
                <FormsControl
                  control="input"
                  label=" Water Source"
                  name="waterSource"
                />
              </div>
              <div className="box">
                <FormsControl
                  control="input"
                  label=" Type of existing"
                  name="typeOfExisting"
                />
                <FormsControl
                  control="input"
                  label=" Accessible ?"
                  name="assecibility"
                />

                <FormsControl
                  control="textArea"
                  label=" Some Description"
                  name="description"
                />
              </div>
            </div>
            <div className="btn-div">
              <button
                type="submit"
                disabled={!formik.isValid}
                className=" button land-btn "
                onClick={handleAddLand}
              >
                Add Land
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default MyLandDetails;
