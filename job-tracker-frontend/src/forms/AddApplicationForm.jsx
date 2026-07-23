import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { applicationSchema } from "../validation/applicationSchema";
import useApplicationStore from "../store/applicationStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

function AddApplicationForm() {

    const { t } = useTranslation();

    const addApplication = useApplicationStore(
        (state) => state.addApplication
    );

    const selectedJob = useApplicationStore(
        (state) => state.selectedJob
    );

    const clearSelectedJob = useApplicationStore(
        (state) => state.clearSelectedJob
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(applicationSchema)
    });

    useEffect(() => {

        if (!selectedJob) return;

        setValue("company", selectedJob.company);
        setValue("role", selectedJob.title);
        setValue("status", "Applied");
        setValue("notes", `Location: ${selectedJob.location}`);
        setValue(
            "appliedDate",
            new Date().toISOString().split("T")[0]
        );

        clearSelectedJob();

    }, [
        selectedJob,
        setValue,
        clearSelectedJob
    ]);

    const onSubmit = async (data) => {

        try {

            await addApplication(data);

            toast.success(
                t("applicationAdded")
            );

            reset();

        } catch (error) {

            toast.error(
                error.response?.data?.error ||
                error.message ||
                t("applicationFailed")
            );

        }

    };

    return (

        <Card className="shadow-lg">

            <CardHeader>

                <CardTitle>

                    {t("addApplication")}

                </CardTitle>

                <CardDescription>

                    {t("trackApplications")}

                </CardDescription>

            </CardHeader>

            <CardContent>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    <div className="space-y-2">

                        <Label htmlFor="company">

                            {t("company")}

                        </Label>

                        <Input
                            id="company"
                            placeholder={t("company")}
                            aria-describedby={
                                errors.company
                                    ? "company-error"
                                    : undefined
                            }
                            {...register("company")}
                        />

                        {errors.company && (

                            <p
                                id="company-error"
                                className="text-sm text-red-500"
                            >

                                {errors.company.message}

                            </p>

                        )}

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="role">

                            {t("role")}

                        </Label>

                        <Input
                            id="role"
                            placeholder={t("role")}
                            aria-describedby={
                                errors.role
                                    ? "role-error"
                                    : undefined
                            }
                            {...register("role")}
                        />

                        {errors.role && (

                            <p
                                id="role-error"
                                className="text-sm text-red-500"
                            >

                                {errors.role.message}

                            </p>

                        )}

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="status">

                            {t("status")}

                        </Label>

                        <Select
                            onValueChange={(value) =>
                                setValue(
                                    "status",
                                    value,
                                    {
                                        shouldValidate: true
                                    }
                                )
                            }
                            defaultValue="Applied"
                        >

                            <SelectTrigger
                                id="status"
                                aria-label="Application status"
                            >

                                <SelectValue
                                    placeholder={t("filterStatus")}
                                />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="Applied">

                                    Applied

                                </SelectItem>

                                <SelectItem value="Phone Screen">

                                    Phone Screen

                                </SelectItem>

                                <SelectItem value="Interview">

                                    Interview

                                </SelectItem>

                                <SelectItem value="Offer">

                                    Offer

                                </SelectItem>

                                <SelectItem value="Rejected">

                                    Rejected

                                </SelectItem>

                            </SelectContent>

                        </Select>

                        {errors.status && (

                            <p
                                id="status-error"
                                className="text-sm text-red-500"
                            >

                                {errors.status.message}

                            </p>

                        )}

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="appliedDate">

                            {t("appliedDate")}

                        </Label>

                        <Input
                            id="appliedDate"
                            type="date"
                            aria-describedby={
                                errors.appliedDate
                                    ? "date-error"
                                    : undefined
                            }
                            {...register("appliedDate")}
                        />

                        {errors.appliedDate && (

                            <p
                                id="date-error"
                                className="text-sm text-red-500"
                            >

                                {errors.appliedDate.message}

                            </p>

                        )}

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="notes">

                            {t("notes")}

                        </Label>

                        <Textarea
                            id="notes"
                            rows={4}
                            placeholder={t("notes")}
                            {...register("notes")}
                        />

                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >

                        {isSubmitting
                            ? t("adding")
                            : t("add")}

                    </Button>

                </form>

            </CardContent>

        </Card>

    );

}

export default AddApplicationForm;