/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:40:36
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 10:40:37
 */

export default function TutorRegisterSuccess() {
    return (
        <div className="lingo-container min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-md text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                    Thank you for completing registration!
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    We’ve received your application and are currently reviewing it. You will receive an email
                    with the status of your application within 5 business days.
                </p>
            </div>
        </div>
    );
}
