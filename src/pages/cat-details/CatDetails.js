import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import CatDetailsContext from "../../context/cat-details-context";
import classes from "./CatDetails.module.css";

function CatDetails() {
  const catDetailsContext = useContext(CatDetailsContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    catDetailsContext.fetchCatDetails(params.id);

    return () => {
      catDetailsContext.clearDetails();
    };
  }, []);

  const copyImgUrl = () => {
    navigator.clipboard
      .writeText(catDetailsContext?.catDetails?.url)
      .then(() => console.log("ok"))
      .catch(() => console.log("failed"));
  };

  return (
    <Modal onClose={() => navigate(`/cats`)}>
      <div className={classes["modal-header"]}>
        <h2 className={classes.title}>Cat Details</h2>
        <Button click={() => navigate(`/cats`)}>Close</Button>
      </div>
      {catDetailsContext.loading && (
        <div className={classes["loading-container"]}>Loading ...</div>
      )}
      {!catDetailsContext.loading && catDetailsContext.catDetails && (
        <div className={classes["body-first-section"]}>
          <div className={classes["img-container"]}>
            <img src={catDetailsContext.catDetails.url}></img>
            <div className={classes["img-btn"]}>
              <Button>Fav It</Button>
            </div>
          </div>
          <div className={classes["url-btn"]}>
            <Button click={copyImgUrl}>Copy Url</Button>
          </div>
          {catDetailsContext.catDetails.breeds &&
            catDetailsContext.catDetails.breeds.length >= 1 && (
              <div className={classes["breed-details"]}>
                <h3>{catDetailsContext.catDetails.breeds[0].name}</h3>
                <p>{catDetailsContext.catDetails.breeds[0].description}</p>
                <p>{catDetailsContext.catDetails.breeds[0].temperament}</p>
                <p>{catDetailsContext.catDetails.breeds[0].country}</p>
                <p>{catDetailsContext.catDetails.breeds[0].weight.metric} kg</p>
                <p>
                  {catDetailsContext.catDetails.breeds[0].life_span} average
                  life span
                </p>
              </div>
            )}
        </div>
      )}
    </Modal>
  );
}

export default CatDetails;
