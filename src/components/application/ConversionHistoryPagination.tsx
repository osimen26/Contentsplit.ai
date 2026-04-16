import React from 'react'

export interface ConversionHistoryPaginationProps {
    currentPage: number
    totalPages: number
    startItem: number
    endItem: number
    totalItems: number
    onPageChange?: (page: number) => void
}

export const ConversionHistoryPagination: React.FC<ConversionHistoryPaginationProps> = ({
    currentPage,
    totalPages,
    startItem,
    endItem,
    totalItems,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="conversion-history-pagination">
            <div className="conversion-history-pagination-info">
                Showing {startItem}-{endItem} of {totalItems} conversions
            </div>
            <div className="conversion-history-pagination-controls">
                <button
                    className="button button-text button-medium conversion-history-pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                >
                    ←
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                        pageNum = i + 1;
                    } else if (currentPage <= 3) {
                        pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                    } else {
                        pageNum = currentPage - 2 + i;
                    }
                    return (
                        <button
                            key={pageNum}
                            className={`button button-text button-medium conversion-history-pagination-button ${currentPage === pageNum ? 'active' : ''
                                }`}
                            onClick={() => onPageChange?.(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}
                <button
                    className="button button-text button-medium conversion-history-pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange?.(currentPage + 1)}
                >
                    →
                </button>
            </div>
        </div>
    )
}
