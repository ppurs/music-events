package uj.wmii.musicevents.repository.util;

import org.springframework.data.domain.OffsetScrollPosition;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


import java.util.Optional;

public class OffsetBasedPageRequest implements Pageable {
    private final int limit;
    private final int offset;
    private final Sort sort = Sort.by(Sort.Direction.ASC, "date");

    public OffsetBasedPageRequest(int limit, int offset) {
        if (limit < 1) {
            throw new IllegalArgumentException("Limit must not be less than one!");
        }
        if (offset < 0) {
            throw new IllegalArgumentException("Offset index must not be less than zero!");
        }
        this.limit = limit;
        this.offset = offset;
    }

    public OffsetBasedPageRequest(int offset) {
        this(5, offset);
    }

    @Override
    public boolean isPaged() {
        return Pageable.super.isPaged();
    }

    @Override
    public boolean isUnpaged() {
        return Pageable.super.isUnpaged();
    }

    @Override
    public int getPageNumber() {
        return offset / limit;
    }
    @Override
    public int getPageSize() {
        return limit;
    }
    @Override
    public long getOffset() {
        return offset;
    }
    @Override
    public Sort getSort() {
        return sort;
    }

    @Override
    public Sort getSortOr(Sort sort) {
        return Pageable.super.getSortOr(sort);
    }

    @Override
    public Pageable next() {
        return new OffsetBasedPageRequest(getPageSize(), (int) (getOffset() + getPageSize()));
    }
    public Pageable previous() {
        return hasPrevious() ?
                new OffsetBasedPageRequest(getPageSize(), (int) (getOffset() - getPageSize())): this;
    }
    @Override
    public Pageable previousOrFirst() {
        return hasPrevious() ? previous() : first();
    }
    @Override
    public Pageable first() {
        return new OffsetBasedPageRequest(getPageSize(), 0);
    }

    @Override
    public Pageable withPage(int pageNumber) {
        return null;
    }

    @Override
    public boolean hasPrevious() {
        return offset > limit;
    }

    @Override
    public Optional<Pageable> toOptional() {
        return Pageable.super.toOptional();
    }

    @Override
    public OffsetScrollPosition toScrollPosition() {
        return Pageable.super.toScrollPosition();
    }
}