import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormsControl from "../components/FormInput/FormsControl";
import "../components/CSS/Buttons.css";
import "../components/CSS/Form.css";
import "../components/CSS/AddLand.css";

import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
const AddLand = (props) => {
  const { User } = useContext(UserContext);
  let history = useHistory();
  const listInfo = {
    governateOption: [],
    districtOption: [],
    landAreaOption: [],
    waterSourceOption: [],
  };
  // let assecibilityOption = [];
  // let typeOfExistingOption = [];
  const initialValues = {
    landName: "",
    landRegistryNo: "",
    governate: "",
    district: "",
    landArea: "",
    waterSource: "",
    assecibility: "",
    typeOfExisting: "",
    description: "",
  };
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
  // console.log(User.userData.id);
  const onSubmit = async (values) => {
    try {
      let userLandInfo = {
        landOwnerID: User.userData.id,
        landOwner: User.userData.name,
        landInfo: values,
      };
      let UL = await axios.post(
        "http://localhost:4000/usersLand/addLandInfo",
        userLandInfo
      );
      console.log(UL);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  const handleClick = () => {
    history.push("/Projects");
  };
  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    if (!User.userData && !token) {
      history.push("/SignIn");
    }
    const formInfo = async () => {
      const governate = await axios.get(
        "http://localhost:4000/landInfo/getGovernate"
      );
      listInfo.governateOption = [{ _id: 0, option: "" }].concat(
        governate.data
      );
      console.log(listInfo.governateOption);
      const district = await axios.get(
        "http://localhost:4000/landInfo/getDistrict"
      );
      listInfo.districtOption = [{ _id: 0, option: "" }].concat(district.data);
      console.log(listInfo.districtOption);
      const landArea = await axios.get(
        "http://localhost:4000/landInfo/getLandArea"
      );
      listInfo.landAreaOption = [{ _id: 0, option: "" }].concat(landArea.data);
      console.log(listInfo.landAreaOption);
      const waterSource = await axios.get(
        "http://localhost:4000/landInfo/getWaterSource"
      );
      listInfo.waterSourceOption = [{ _id: 0, option: "" }].concat(
        waterSource.data
      );
      console.log(listInfo.waterSourceOption);
    };
    formInfo();
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="root-container">
            <Form>
              <div className="header">Add Land</div>

              <FormsControl
                control="input"
                type="text"
                label=" Land Name"
                name="landName"
                placeholder="Land Name"
                autoFocus
              />
              <FormsControl
                control="input"
                type="text"
                label='Land Registry No"'
                name="landRegistryNo"
                placeholder="Registry Number"
              />
              <FormsControl
                control="select"
                label="Governate"
                name="governate"
                options={listInfo.governateOption}
                placeholder="Select Governate"
              />
              <FormsControl
                control="select"
                label=" District"
                name="district"
                options={listInfo.districtOption}
                placeholder="Select District"
              />
              <FormsControl
                control="select"
                label=" Land Area"
                name="landArea"
                options={listInfo.landAreaOption}
                placeholder="Select Area"
              />
              <FormsControl
                control="select"
                label=" Water Source"
                name="waterSource"
                options={listInfo.waterSourceOption}
                placeholder="Select Water Source"
              />
              <FormsControl
                control="input"
                type="text"
                label=" Type of existing"
                name="typeOfExisting"
                placeholder="Type of Existing"
              />
              <FormsControl
                control="input"
                type="text"
                label=" Accessible ?"
                name="assecibility"
                placeholder="Assecibility"
              />
              <FormsControl
                control="input"
                label=" Some Description"
                name="description"
              />
              <div className="btn-div">
                <button
                  type="button"
                  onClick={handleClick}
                  className="button add-land-btn"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="add-land-btn button"
                >
                  submit
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default AddLand;
