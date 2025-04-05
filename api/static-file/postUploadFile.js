import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

export default function useUploadFile() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [objectKey, setObjectKey] = useState(null);

    const uploadFile = async (file) => {
        if (!file) {
            setError("No file provided");
            return null;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        const token = Cookies.get("token");

        try {
            const response = await api.post("/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            const { objectKey, message } = response.data;

            if (!objectKey) {
                setError(message || "Upload failed");
                return null;
            }

            setObjectKey(objectKey);
            return process.env.NEXT_PUBLIC_API_BASE_URL + "/file/download/" + objectKey
        } catch (err) {
            console.error("Upload error:", err);
            setError("An error occurred during upload.");
            return null;
        } finally {
            setUploading(false);
        }
    };

    return {
        uploadFile,     // function to call from component
        uploading,       // boolean
        objectKey,       // success result
        error,           // error message
    };
}
