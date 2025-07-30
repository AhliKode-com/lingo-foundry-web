"use client"

export default function CertificateErrorModal({ isOpen, onClose, orderItemId }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-900">
                            Certificate Download Error
                        </h3>
                    </div>
                    
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Something error when downloading certificate, please help contact admin, order item id: <span className="font-semibold text-gray-900">{orderItemId}</span>
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 