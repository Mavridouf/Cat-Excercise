import { Routes, Route, Navigate } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import CatsLanding from "./pages/cats-landing/CatsLanding";
import Breeds from "./pages/breeds/Breeds";
import Favourites from "./pages/favourites/Favourites";
import { CatsProvider } from "./context/cats-context";
import { CatDetailsProvider } from "./context/cat-details-context";

function App() {
  return (
    <CatsProvider>
      <CatDetailsProvider>
        <div className="App">
          <Header></Header>
          <div className={classes.container}>
            <Routes>
              <Route path="/" element={<Navigate replace to="/cats" />} />
              <Route path="/cats/*" element={<CatsLanding />}></Route>
              <Route path="/breeds" element={<Breeds />}></Route>
              <Route path="/favourites" element={<Favourites />}></Route>
            </Routes>
          </div>
        </div>
      </CatDetailsProvider>
    </CatsProvider>
  );
}

export default App;
