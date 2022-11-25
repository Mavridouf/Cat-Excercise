import React from "react";
import classes from "./BreedInfo.module.css";

const BreedInfo = (props) => {
  const { breed } = props;
  return (
    <div className={classes["breed-details"]}>
      <h3>{breed.name}</h3>
      <p>{breed.description}</p>
      <p>{breed.temperament}</p>
      <p>{breed.country}</p>
      <p>{breed.weight.metric} kg</p>
      <p>{breed.life_span} average life span</p>
    </div>
  );
};

export default BreedInfo;
