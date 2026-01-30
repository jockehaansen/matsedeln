package hansendev.backend.features.recipes;

import hansendev.backend.features.recipes.constants.Status;
import hansendev.backend.features.recipes.models.Recipe;
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

}
