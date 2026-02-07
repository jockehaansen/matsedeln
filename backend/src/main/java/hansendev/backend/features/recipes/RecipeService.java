package hansendev.backend.features.recipes;

import hansendev.backend.features.recipes.constants.Status;
import hansendev.backend.features.recipes.models.Recipe;
import hansendev.backend.features.recipes.models.UpdatePortionsRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public List<Recipe> getAllByStatus(Status status){
        return recipeRepository.findByStatus(status);
    }

    @Transactional
    public Recipe updatePortions(Long id, UpdatePortionsRequest request){

        int delta = request.delta();
        if(delta != 1 && delta != -1 ){
            throw new IllegalArgumentException("Delta must be between 1 and -1");
        }

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));
        int portions = Math.max(0, recipe.getPortionsRemaining() + delta);
        recipe.setPortionsRemaining(portions);

        //recipe moved from available status when finished
        if (portions == 0){
            recipe.setStatus(Status.SAVED);
        }

        return recipeRepository.save(recipe);
    }

    @Transactional
    public void removeRecipe(Long id){
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        recipe.setStatus(Status.SAVED);
        recipeRepository.save(recipe);
    }
}
