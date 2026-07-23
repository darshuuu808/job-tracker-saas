import { useState } from "react";
import { useTranslation } from "react-i18next";
import { uploadResume } from "../../services/resumeService";
import { Label } from "@/components/ui/label";

export default function ResumeUpload() {

    const { t } = useTranslation();

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleChange = async (e) => {

        const selected = e.target.files[0];

        if (!selected) return;

        if (selected.type !== "application/pdf") {

            alert(t("pdfOnly"));

            return;

        }

        setFile(selected);

        const formData = new FormData();

        formData.append("resume", selected);

        try {

            setUploading(true);

            await uploadResume(
                formData,
                (event) => {

                    if (event.total) {

                        setProgress(
                            Math.round(
                                (event.loaded * 100) /
                                event.total
                            )
                        );

                    }

                }
            );

            alert(
                t("resumeUploaded")
            );

        } catch (err) {

            console.error(err);

            alert(t("uploadFailed"));

        } finally {

            setUploading(false);

        }

    };

    return (

        <div className="border rounded-xl p-6 bg-white dark:bg-slate-900">

            <h2 className="text-xl font-bold mb-4">

                {t("resumeUpload")}

            </h2>

            <Label htmlFor="resume-upload">

                {t("chooseFile")}

            </Label>

            <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleChange}
                className="mt-2"
            />

            {file && (

                <div className="mt-4">

                    <p>

                        <strong>{t("file")}:</strong> {file.name}

                    </p>

                    <p>

                        <strong>{t("size")}:</strong>{" "}
                        {(file.size / 1024).toFixed(2)} KB

                    </p>

                </div>

            )}

            {uploading && (

                <div className="mt-4">

                    <div className="w-full bg-gray-300 rounded-full h-3">

                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <p className="mt-2">

                        {progress}%

                    </p>

                </div>

            )}

        </div>

    );

}