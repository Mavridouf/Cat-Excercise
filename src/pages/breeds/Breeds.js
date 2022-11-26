import { Fragment, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BreedItem from "../../components/breed-item/BreedItem";
import TextInput from "../../components/text-input/TextInput";
import BreedsContext from "../../context/breeds-context";
import BreedDetails from "../breed-details/BreedDetails";
import classes from "./Breeds.module.css";

function Breeds() {
  const breedsContext = useContext(BreedsContext);
  const [breedFilter, setBreedFilter] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState(null);
  const { breedList, loading, fetchBreeds, clearBreedList } = breedsContext;

  useEffect(() => {
    fetchBreeds();
    return () => clearBreedList();
  }, []);

  useEffect(() => {
    const debouceTimer = setTimeout(() => {
      setFilteredBreeds(
        breedList?.filter((breed) => {
          return breed.name
            ?.toLowerCase()
            ?.includes(breedFilter?.toLowerCase());
        })
      );
    }, 300);

    return () => {
      clearTimeout(debouceTimer);
    };
  }, [breedList, breedFilter]);

  const breedListItems = () => {
    return filteredBreeds?.map((breed) => (
      <BreedItem key={breed.id} id={breed.id} name={breed.name} />
    ));
  };

  const handleInputChange = (event) => {
    setBreedFilter(event.target.value);
  };

  return (
    <Fragment>
      {loading && (
        <div className={classes["loading-container"]}>Loading ...</div>
      )}
      {!loading && breedList?.length > 0 && (
        <Fragment>
          <div className={classes["breeds-container"]}>
            <TextInput
              value={breedFilter}
              onHandleChange={handleInputChange}
              label="Filter"
            />
            {breedListItems()}
          </div>
        </Fragment>
      )}
      <Routes>
        <Route path=":id" element={<BreedDetails />}></Route>
      </Routes>
    </Fragment>
  );
}

export default Breeds;
