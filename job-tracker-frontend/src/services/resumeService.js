import API from "./api";

export const uploadResume = (formData, onUploadProgress) => {

    return API.post(
        "/api/resume/upload",
        formData,
        {
            headers: {

                "Content-Type": "multipart/form-data"

            },

            onUploadProgress

        }
    );

};