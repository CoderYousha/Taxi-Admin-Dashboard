import { useState } from "react";

export function useSearch() {
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('');
    const [searchType, setSearchType] = useState('');

    return {
        search, setSearch, order, setOrder, searchType, setSearchType,
    };
}