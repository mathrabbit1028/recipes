import { useState, useEffect } from "react"
import { RecipeCard } from "@/components/RecipeCard"
import { Pagination } from "@/components/Pagination"
import type { RecipesResponse } from "@/lib/types"

export default function RecipeList() {
  const [recipes, setRecipes] = useState<RecipesResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const recipesPerPage = 12

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true)
      try {
        const skip = (currentPage - 1) * recipesPerPage
        const response = await fetch(`https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${skip}`)
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error("Failed to fetch recipes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [currentPage])

  const totalPages = recipes ? Math.ceil(recipes.total / recipesPerPage) : 0

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Recipe Collection</h1>
          <p className="header-subtitle">Discover delicious recipes from around the world</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="recipe-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="loading-skeleton loading-card" />
            ))}
          </div>
        ) : recipes && recipes.recipes.length > 0 ? (
          <>
            <div className="recipe-grid">
              {recipes.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recipes found</p>
          </div>
        )}
      </main>
    </div>
  )
}