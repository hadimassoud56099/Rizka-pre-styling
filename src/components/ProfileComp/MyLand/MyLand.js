import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormsControl from "../../FormInput/FormsControl";
import "../../CSS/AddLand.css";
import "../../CSS/Form.css";
import "../../CSS/Buttons.css";
// import { useHistory } from "react-router-dom";
import MyLandDetails from "./MyLandDetails";
import * as Yup from "yup";
// import UserContext from "../../../context/UserContext";
import axios from "axios";

const MyLand = (props) => {
  // const{User}=useContext(UserContext);
  //   let history = useHistory();
  const initialValues = {
    LandSelector: "",
  };

  const validationSchema = Yup.object({
    LandSelector: Yup.string().required(" Field required"),
  });
  const [LandDetails, setLandDetails] = useState();
  const [landOptions, setLandOptions] = useState(null);

  let options = [
    {
      _id: 0,
      option: "",
    },
  ];
  let savedOptions = props.options;

  let landValues = {};
  const [depend, setdepend] = useState(false);
  let LandInfo1 = async (values) => {
    let Info = await axios.get("http://localhost:4000/usersLand/getMyLands", {
      headers: { "jwt-token": props.header },
    });
    for (let i = 0; i < Info.data.length; i++) {
      options.push({
        _id: Math.random(),
        option: Info.data[i].LandValues.landName,
      });
      if (Info.data[i].LandValues.landName == values.LandSelector) {
        landValues = Info.data[i].LandValues;
      }
    }
    setdepend(!depend);
    console.log("land Values", landValues);
    setLandDetails(
      <MyLandDetails landValues={landValues} dependency={depend} />
    );
  };

  const onSubmit = (values) => {
    LandInfo1(values);
  };
  useEffect(() => {
    setLandOptions((prevState) => prevState, savedOptions);
    console.log("savedoptions", savedOptions);
  }, [savedOptions]);

  let [spinner, setSpinner] = useState("Go to Land");
  const handleClick = () => {
    setSpinner(<div className="spinner" id="spinner"></div>);
    setTimeout(() => {
      setSpinner("Go to Land");
    }, 1000);
  };

  return (
    <>
      <Formik
        initialValues={savedOptions || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div className="header">Select Land</div>

              <FormsControl
                control="select"
                label=""
                name="LandSelector"
                options={savedOptions}
              />

              <div className="btn-div">
                <button
                  className="button land-btn"
                  id="submit"
                  onClick={handleClick}
                >
                  <span id="button-text">
                    <div> {spinner}</div>
                  </span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      {LandDetails}
    </>
  );
};
export default MyLand;
