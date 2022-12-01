import { Fragment, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BreedItem from "../../components/breed-item/BreedItem";
import Spinner from "../../components/spinner/Spinner";
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
  }, [clearBreedList, fetchBreeds]);

  useEffect(() => {
    let debouceTimer;
    if (breedFilter === "") {
      setFilteredBreeds(breedList);
    } else {
      debouceTimer = setTimeout(() => {
        setFilteredBreeds(
          breedList?.filter((breed) => {
            return breed.name
              ?.toLowerCase()
              ?.includes(breedFilter?.toLowerCase());
          })
        );
      }, 300);
    }
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
      {loading && <Spinner />}
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
        <Route path=":id" element={<BreedDetails />}/>
      </Routes>
    </Fragment>
  );
}

export default Breeds;
