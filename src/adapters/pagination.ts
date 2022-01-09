const paginationAdapter = <T>({
    items,
    itemsPerPage = 10,
    page,
}: {
    items: T[];
    itemsPerPage?: number;
    page: number;
}) => {
    const total = Math.ceil(items.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    return { items: paginatedItems, page, total };
};

export default paginationAdapter;
