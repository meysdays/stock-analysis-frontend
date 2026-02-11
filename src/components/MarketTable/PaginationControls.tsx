interface PaginationControlsProps {
    onLoadMore: () => void;
    isLoadingMore: boolean;
    hasMore: boolean;
}

export const PaginationControls = ({
    onLoadMore,
    isLoadingMore,
    hasMore,
}: PaginationControlsProps) => {
    if (!hasMore) return null;

    return (
        <div className="flex items-center justify-center gap-4 py-10 px-5">
            <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className={`border-0 bg-transparent text-base font-semibold uppercase transition-all duration-300 ${isLoadingMore
                        ? "opacity-50 cursor-not-allowed"
                        : "text-orange-600 hover:text-orange-500 cursor-pointer"
                    }`}
                style={{
                    letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                    if (!isLoadingMore) {
                        (e.target as HTMLButtonElement).style.letterSpacing = "1px";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoadingMore) {
                        (e.target as HTMLButtonElement).style.letterSpacing = "0.5px";
                    }
                }}
            >
                {isLoadingMore ? "Loading..." : "See More"}
            </button>

            <span className="text-gray-300">|</span>
        </div>
    );
};
