import { Toaster } from "sonner";
import { AsideMenuBar } from "./feat/asideMenuBar/AsideMenuBar";
import { Editor } from "./feat/editor/Editor";

const App = () => {
  return (
    <div className="flex" style={{ height: "100vh" }}>
      <Toaster position="bottom-right" richColors closeButton/>
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
