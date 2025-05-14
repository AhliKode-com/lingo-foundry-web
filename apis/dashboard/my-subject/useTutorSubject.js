import api from "@/lib/api"
import Cookies from "js-cookie"
import {toast} from "react-toastify";

export function useTutorSubject() {
    const postTutorSubject = async ({subjectId, subjectLevelId, description, minimumSession, maximumSession, hourlyRate}) => {
        const token = Cookies.get("token")
        try {
            const response = await api.post("/tutor/tutor-subject/add", {
                subjectId,
                subjectLevelId,
                description,
                minimumSession,
                maximumSession,
                hourlyRate
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data.data
        } catch (err) {
            toast.error(err.message)
            return err
        }
    }

    const putTutorSubject = async ({tutorSubjectId, description, minimumSession, maximumSession, hourlyRate}) => {
        const token = Cookies.get("token")
        try {
            const response = await api.put("/tutor/tutor-subject/update", {
                tutorSubjectId,
                description,
                minimumSession,
                maximumSession,
                hourlyRate
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data.data
        } catch (err) {
            toast.error(err.message)
            return err
        }
    }

    return { postTutorSubject, putTutorSubject };
}
