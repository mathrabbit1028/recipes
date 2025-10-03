import { Link } from "react-router-dom"
import type { Recipe } from "@/lib/types"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
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

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.name}
          className="recipe-image"
        />
        <div className="recipe-info">
          <h3 className="recipe-title">{recipe.name}</h3>
          <div className="recipe-meta">
            <div className={getDifficultyClass(recipe.difficulty)}>
              {recipe.difficulty}
            </div>
            <div className="rating">
              <span>⭐</span>
              <span className="rating-value">{recipe.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="recipe-tags">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="tag">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
