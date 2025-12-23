import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import CreateNote from "./pages/CreateNote"
import NoteDetails from "./pages/NoteDetails"

// -> Next lesson: we need to build the front-end for displays the data from backend
// -> Next lesson: now implements the tailwindcss framework to handle the styling websites
// -> Next lesson: now install icons library for accessing icons features from "lucide-react"
// --> Next Step: install "axios" onto frontend for further details when integrating backend and frontend
// -> Next lesson: now implements delete functionality
// => Upgrade Framework: use "daisyui" framework to make it easier when declaring some components 

function App() {
  return(
    <div className="h-screen relative w-full" data-theme="abyss">
      {/* implement "routes" and each single "route" from 'react-router' library */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateNote />}></Route>
        <Route path="/note/:id" element={<NoteDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App
