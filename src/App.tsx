import { Routes, Route } from "react-router-dom";
import { Catalogue } from "./pages/catalogue";
import { Books } from "./pages/books";
import './App.css'
import { BookDetail } from "./pages/bookDetail";
import { Register} from "./pages/register";
import { Login } from "./pages/login";

function App() {

  return (
    <div className="flex justify-center items-center w-full">
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books /> } />
        <Route path="/books/:id" element={<BookDetail />}/>
      </Routes>
    </div>
  )
}

export default App
