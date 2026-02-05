package hansendev.backend.features.recipes;

import hansendev.backend.features.recipes.constants.Status;
import hansendev.backend.features.recipes.models.Recipe;
import hansendev.backend.features.recipes.models.UpdatePortionsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/recipes/")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/available")
    public ResponseEntity<List<Recipe>> getAvailableRecipes(){
        return ResponseEntity.ok(recipeService.getAllByStatus(Status.AVAILABLE));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Recipe>> getUpcomingRecipes(){
        return ResponseEntity.ok(recipeService.getAllByStatus(Status.UPCOMING));
    }

    @PatchMapping("/{id}/portions")
    public ResponseEntity<Recipe> updatePortions(@PathVariable Long id, @RequestBody UpdatePortionsRequest request){
        return ResponseEntity.ok(recipeService.updatePortions(id, request));
    }

}
