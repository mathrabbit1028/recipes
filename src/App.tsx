import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RecipeList from "./components/RecipeList"
import RecipeDetail from "./components/RecipeDetail"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}