// import "vditor/dist/index.css";
import { Editor } from "./pages/Editor";
import React from "react";
import { Welcome } from "./pages/Welcome";

const App = () => {
  return (
    <main className="bg-white">
      <Welcome />
      {/* <Editor /> */}
    </main>
  )
};

export default App;
