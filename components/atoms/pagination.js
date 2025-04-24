import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({
    currentPage,
    setCurrentPage,
    totalPages,
    onPageChange
}) {
    const handleChange = (page) => {
        setCurrentPage(page);
        if (onPageChange) onPageChange(page);
    };
    return (
        <div className="flex justify-center items-center gap-4 my-[60px]">
            {/* Prev Button */}
            <button
                onClick={() => handleChange((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                currentPage === 1
                    ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed"
                    : "bg-[#FFF3EF] hover:opacity-80"
                }`}
            >
                <FaArrowLeft className="text-[#E35D33]" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                key={pageNum}
                onClick={() => handleChange(pageNum)}
                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium animation-effect ${
                    currentPage === pageNum
                    ? "bg-[#E15C31] text-white"
                    : "text-black hover:bg-[#FFF3EF] hover:text-[#E35D33]"
                }`}
                >
                {String(pageNum).padStart(2, "0")}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => handleChange((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                currentPage === totalPages
                    ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed"
                    : "bg-[#FFF3EF] hover:opacity-80"
                }`}
            >
                <FaArrowRight className="text-[#E35D33]" />
            </button>
        </div>
    );
}
