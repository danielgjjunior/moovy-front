import { useState } from "react";
import { Home } from "./pages/homeSearch/homeSearch";
import { Library } from "./pages/library/library";
import { Login } from "./pages/login/login";

import { BrowserRouter, Routes, Route } from "react-router-dom";


export function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Library" element={<Library/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
