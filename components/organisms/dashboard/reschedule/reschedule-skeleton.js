export default function RescheduleSkeleton() {
    const skeletonRows = Array(5).fill(null);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-md border border-gray-200 bg-white animate-pulse w-full">
            <div className="h-5 w-3/4 bg-gray-300 rounded mb-4"></div>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                </div>
            </div>

            {skeletonRows.map((_, idx) => (
                <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4"
                >
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
            ))}

            <div className="h-10 w-24 bg-gray-300 rounded mt-6"></div>
        </div>
    );
}
