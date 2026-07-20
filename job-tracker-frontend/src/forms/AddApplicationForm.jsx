import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { applicationSchema } from "../validation/applicationSchema";
import useApplicationStore from "../store/applicationStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

        resolver: zodResolver(
            applicationSchema
        )

    });

    useEffect(() => {

        if (!selectedJob) return;

        setValue(
            "company",
            selectedJob.company
        );

        // Your schema uses "role"
        setValue(
            "role",
            selectedJob.title
        );

        setValue(
            "status",
            "Applied"
        );

        setValue(
            "notes",
            `Location: ${selectedJob.location}`
        );

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
                "Application added successfully!"
            );

            reset();

        }

        catch (error) {

            toast.error(

                error.response?.data?.error ||

                error.message ||

                "Unable to add application."

            );

        }

    };

    return (

        <Card className="shadow-lg">

            <CardHeader>

                <CardTitle>

                    Add Job Application

                </CardTitle>

                <CardDescription>

                    Track your latest applications

                </CardDescription>

            </CardHeader>

            <CardContent>

                <form

                    onSubmit={handleSubmit(onSubmit)}

                    className="space-y-6"

                >

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Company

                        </label>

                        <Input

                            placeholder="Google"

                            {...register("company")}

                        />

                        {

                            errors.company && (

                                <p className="text-sm text-red-500">

                                    {errors.company.message}

                                </p>

                            )

                        }

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Role

                        </label>

                        <Input

                            placeholder="Software Engineer"

                            {...register("role")}

                        />

                        {

                            errors.role && (

                                <p className="text-sm text-red-500">

                                    {errors.role.message}

                                </p>

                            )

                        }

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Status

                        </label>

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

                            <SelectTrigger>

                                <SelectValue

                                    placeholder="Select Status"

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

                        {

                            errors.status && (

                                <p className="text-sm text-red-500">

                                    {errors.status.message}

                                </p>

                            )

                        }

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Applied Date

                        </label>

                        <Input

                            type="date"

                            {...register("appliedDate")}

                        />

                        {

                            errors.appliedDate && (

                                <p className="text-sm text-red-500">

                                    {errors.appliedDate.message}

                                </p>

                            )

                        }

                    </div>

                    <div className="space-y-2">

                        <label className="text-sm font-medium">

                            Notes

                        </label>

                        <Textarea

                            rows={4}

                            placeholder="Additional notes..."

                            {...register("notes")}

                        />

                    </div>

                    <Button

                        type="submit"

                        className="w-full"

                        disabled={isSubmitting}

                    >

                        {

                            isSubmitting

                                ? "Adding..."

                                : "Add Application"

                        }

                    </Button>

                </form>

            </CardContent>

        </Card>

    );

}

export default AddApplicationForm;