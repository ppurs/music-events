package uj.wmii.musicevents.service.strategy.offer_search_strategy;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Component
@AllArgsConstructor
public class OfferSearchStrategyFactory {
    private final Map<String, OfferSearchStrategy> searchStrategyMap;

    public OfferSearchStrategy getSearchStrategy(String searchType) {
        OfferSearchStrategy offerSearchStrategy = searchStrategyMap.getOrDefault(searchType, null);
        if (Objects.isNull(offerSearchStrategy)) {
            throw new RuntimeException("Unsupported strategy type");
        }

        return offerSearchStrategy;
    }
}
