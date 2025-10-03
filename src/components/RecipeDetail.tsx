import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Recipe } from "@/lib/types"
import { Clock, ChefHat, Users, Flame, Star, ArrowLeft } from "lucide-react"

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        if (!response.ok) {
          throw new Error("Recipe not found")
        }
        const data = await response.json()
        setRecipe(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch recipe")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "difficulty-badge difficulty-easy"
      case "medium":
        return "difficulty-badge difficulty-medium"
      case "hard":
        return "difficulty-badge difficulty-hard"
      default:
        return "difficulty-badge"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="recipe-detail-header">
          <div className="container">
            <Link to="/" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </Link>
          </div>
        </div>
        <main className="container recipe-detail-content">
          <div className="loading-skeleton" style={{ height: "400px", borderRadius: "12px" }} />
        </main>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen">
        <div className="recipe-detail-header">
          <div className="container">
            <Link to="/" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </Link>
          </div>
        </div>
        <main className="container recipe-detail-content">
          <div className="error-message">
            <h2>Recipe not found</h2>
            <p>{error || "The recipe you're looking for doesn't exist."}</p>
          </div>
        </main>
      </div>
    )
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <div className="min-h-screen">
      <div className="recipe-detail-header">
        <div className="container">
          <Link to="/" className="back-button">
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Link>
        </div>
      </div>

      <main className="container recipe-detail-content">
        <div className="recipe-hero">
          <div className="recipe-hero-image">
            <img 
              src={recipe.image || "/placeholder.svg"} 
              alt={recipe.name}
              className="recipe-image-large"
            />
          </div>

          <div className="recipe-hero-info">
            <h1 className="recipe-title-large">{recipe.name}</h1>

            <div className="recipe-badges">
              <div className={getDifficultyClass(recipe.difficulty)}>
                {recipe.difficulty}
              </div>
              <div className="rating-large">
                <Star className="star-icon" />
                <span className="rating-value-large">{recipe.rating.toFixed(1)}</span>
                <span className="rating-count">({recipe.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="recipe-stats">
              <div className="stat-item">
                <Clock className="stat-icon" />
                <div>
                  <p className="stat-label">Total Time</p>
                  <p className="stat-value">{totalTime} min</p>
                </div>
              </div>
              <div className="stat-item">
                <Users className="stat-icon" />
                <div>
                  <p className="stat-label">Servings</p>
                  <p className="stat-value">{recipe.servings}</p>
                </div>
              </div>
              <div className="stat-item">
                <Flame className="stat-icon" />
                <div>
                  <p className="stat-label">Calories</p>
                  <p className="stat-value">{recipe.caloriesPerServing} kcal</p>
                </div>
              </div>
              <div className="stat-item">
                <ChefHat className="stat-icon" />
                <div>
                  <p className="stat-label">Cuisine</p>
                  <p className="stat-value">{recipe.cuisine}</p>
                </div>
              </div>
            </div>

            <div className="recipe-tags-large">
              {recipe.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="ingredients-section">
            <div className="card">
              <div className="card-header">
                <h2 className="section-title">Ingredients</h2>
              </div>
              <div className="card-content">
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="ingredient-bullet">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="instructions-section">
            <div className="card">
              <div className="card-header">
                <h2 className="section-title">Instructions</h2>
              </div>
              <div className="card-content">
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="instruction-item">
                      <span className="instruction-number">
                        {index + 1}
                      </span>
                      <p className="instruction-text">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-info-section">
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">Recipe Information</h2>
            </div>
            <div className="card-content">
              <div className="info-grid">
                <div className="info-item">
                  <p className="info-label">Meal Type</p>
                  <p className="info-value">{recipe.mealType.join(", ")}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Cuisine</p>
                  <p className="info-value">{recipe.cuisine}</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Prep Time</p>
                  <p className="info-value">{recipe.prepTimeMinutes} minutes</p>
                </div>
                <div className="info-item">
                  <p className="info-label">Cook Time</p>
                  <p className="info-value">{recipe.cookTimeMinutes} minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}