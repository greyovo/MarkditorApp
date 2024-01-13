import { Welcome } from "./pages/Welcome";
import { AsideMenuBar } from "./components/AsideMenuBar";

const App = () => {
  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>
      <aside>
        <AsideMenuBar />
      </aside>
      <main className="flex-1 bg-white">
        <Welcome />
        {/* <Editor /> */}
      </main>
    </div>
  )
};

export default App;
