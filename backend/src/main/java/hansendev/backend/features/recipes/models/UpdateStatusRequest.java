package hansendev.backend.features.recipes.models;

import hansendev.backend.features.recipes.constants.Status;

public record UpdateStatusRequest(Status status) {
}
