package uj.wmii.musicevents.dto.mapper.profile;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

@Component
@AllArgsConstructor
public class ProfileMapperFactory {
    private final Map<String, ProfileMapper> mapperMap;

    public ProfileMapper getAccountMapper(String accountType) {
        ProfileMapper accountMapper = mapperMap.getOrDefault(accountType, null);
        if (Objects.isNull(accountMapper)) {
            throw new RuntimeException("Unsupported account type");
        }

        return accountMapper;
    }
}
