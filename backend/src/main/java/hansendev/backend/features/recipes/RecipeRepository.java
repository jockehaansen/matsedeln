package hansendev.backend.features.recipes;

import hansendev.backend.features.recipes.constants.Status;
import hansendev.backend.features.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByStatus(Status status);
}
