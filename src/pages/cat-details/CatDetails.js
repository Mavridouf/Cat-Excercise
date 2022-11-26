import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import CatDetailsContext from "../../context/cat-details-context";
import classes from "./CatDetails.module.css";
import BreedInfo from "../../components/breed-info/BreedInfo";

function CatDetails() {
  const catDetailsContext = useContext(CatDetailsContext);
  const params = useParams();
  const navigate = useNavigate();

  const { catDetails, loading } = catDetailsContext;

  useEffect(() => {
    catDetailsContext.fetchCatDetails(params.id);

    return () => {
      catDetailsContext.clearDetails();
    };
  }, []);

  const copyImgUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log("ok"))
      .catch(() => console.log("failed"));
  };

  return (
    <Modal onClose={() => navigate(`/cats`)}>
      <div className={classes["body"]}>
        {loading && (
          <div className={classes["loading-container"]}>Loading ...</div>
        )}
        {!loading && catDetails && (
          <Fragment>
            <div className={classes.col1}>
              <img src={catDetails.url}></img>
            </div>
            <div className={classes.col2}>
              {catDetails.breeds && catDetails.breeds.length > 0 && (
                <div className={classes["breed-info-container"]}>
                  <BreedInfo breed={catDetails.breeds[0]} />
                </div>
              )}
              {(!catDetails.breeds || catDetails.breeds.length == 0) && (
                <div className={classes["no-details-container"]}>
                  No Details found
                </div>
              )}
              <div className={classes["footer"]}>
                <Button>Fav it</Button>
                <Button click={copyImgUrl}>Copy Link</Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  );
}

export default CatDetails;
