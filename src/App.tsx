import { Welcome } from "./pages/Welcome";
import { AsideMenuBar } from "./components/AsideMenuBar";
import { Editor } from "./pages/Editor";

const App = () => {
  return (
    <div className="flex" style={{ height: "100vh" }}>
      <aside className="">
        <AsideMenuBar />
      </aside>
      <main className="flex-1 bg-white">
        {/* <Welcome /> */}
        <Editor />
      </main>
    </div>
  )
};

export default App;
