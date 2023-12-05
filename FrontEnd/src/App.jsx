// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sign_in from "./Sign_in";
import Sign_up from "./Sign_up";
import "./App.css";
import ReCycle from "./ReCycle";
import Form_Temp from "./Forms/Form_Temp";
import Form_LE from "./Forms/Form_LE";
import Form_tele from "./Forms/Form_tele";
import Form_lamps from "./Forms/Form_Lamps";
import Form_screen from "./Forms/Form_screen";
import Main_select_category from "./Main_select_category";
import Form_SE from "./Forms/Forms_SE";
import Pick_up from "./Pick_up";
import Price from "./Price";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Sign_up />} />
        <Route path="/sign_in" element={<Sign_in />} />
        <Route path="/Main_category" element={<Main_select_category/>} />
        <Route path="/temp" element={<Form_Temp/>} />
        <Route path="/larg" element={<Form_LE/>} />
        <Route path="/smal" element={<Form_SE/>} />
        <Route path="/tele" element={<Form_tele/>} />
        <Route path="/scre" element={<Form_screen/>}/>
        <Route path="/lamp" element={<Form_lamps/>} />
        <Route path="/pick" element={<Pick_up/>}/>
        <Route path="/price" element={<Price/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
