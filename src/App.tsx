import { Welcome } from "./feat/welcome/Welcome";
import { AsideMenuBar } from "./feat/asideMenuBar/AsideMenuBar";
import { Editor } from "./feat/editor/Editor";

const App = () => {
  return (
    <div className="flex" style={{ height: "100vh" }}>
      <div>
        <AsideMenuBar />
      </div>
      <main className="flex-1 bg-white">
        {/* <Welcome /> */}
        <Editor />
      </main>
    </div>
  )
};

export default App;
