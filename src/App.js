import { Routes, Route, Navigate } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import CatsLanding from "./pages/cats-landing/CatsLanding";
import Breeds from "./pages/breeds/Breeds";
import Favourites from "./pages/favourites/Favourites";
import { CatsProvider } from "./context/cats-context";
import { BreedsProvider } from "./context/breeds-context";
import { CatDetailsProvider } from "./context/cat-details-context";
import { ToastsProvider } from "./context/toasts-context";
import Toasts from "./components/toasts/Toasts";
import { FavouritesProvider } from "./context/favourites-context";

function App() {
  return (
    <ToastsProvider>
      <div className="App">
        <Toasts />
        <Header></Header>
        <div className={classes.container}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/cats" />} />
            <Route
              path="/cats/*"
              element={
                <CatsProvider>
                  <CatDetailsProvider>
                    <CatsLanding />
                  </CatDetailsProvider>
                </CatsProvider>
              }
            ></Route>
            <Route
              path="/breeds/*"
              element={
                <BreedsProvider>
                  <CatsProvider>
                    <Breeds />
                  </CatsProvider>
                </BreedsProvider>
              }
            ></Route>
            <Route
              path="/favourites"
              element={
                <FavouritesProvider>
                  <Favourites />
                </FavouritesProvider>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </ToastsProvider>
  );
}

export default App;
