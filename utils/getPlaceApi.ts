const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

export async function getPlaceSuggestions(query: string) {
    if (!query || query.length < 2) return [];
    try {
        const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY!,
                "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
            },
            body: JSON.stringify({ input: query }),
        });

        const data = await res.json();
        if (!data?.suggestions) return [];

        return data.suggestions.map((s: any) => ({
            name: s.placePrediction?.text?.text,
            placeId: s.placePrediction?.placeId,
        }));
    } catch (error) {
        console.error("Autocomplete error:", error);
        return [];
    }
}

export async function getPlaceDetails(placeId: string) {
    try {
        const res = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,location&key=${GOOGLE_PLACES_API_KEY}`
        );

        if (!res.ok) return null;

        const place = await res.json();
        return {
            name: place.displayName?.text ?? "",
            latitude: place.location?.latitude ?? null,
            longitude: place.location?.longitude ?? null,
        };
    } catch (error) {
        console.error("Place details error:", error);
        return null;
    }
}