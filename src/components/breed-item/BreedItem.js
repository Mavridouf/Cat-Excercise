import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./BreedItem.module.css";

const BreedItem = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/breeds/${id}`)}
      className={classes["breed-item"]}
    >
      <span>{name}</span>
    </div>
  );
};

export default BreedItem;
