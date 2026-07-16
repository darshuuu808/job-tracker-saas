import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { applicationSchema } from "../validation/applicationSchema";

import useApplicationStore from "../store/applicationStore";

import Input from "../components/Input/Input";

import Button from "../components/Button/Button";

import Card from "../components/Card/Card";

function AddApplicationForm() {

    const addApplication = useApplicationStore(

        (state) =>

            state.addApplication

    );

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

            isSubmitting

        }

    } = useForm({

        resolver: zodResolver(

            applicationSchema

        )

    });

    const onSubmit = async (

        data

    ) => {

        try {

            await addApplication(data);

            alert(

                "Application added successfully."

            );

            reset();

        }

        catch (error) {

            alert(

                error.response?.data?.error ||

                error.message ||

                "Unable to add application."

            );

        }

    };

    return (

        <Card>

            <h2>

                Add Job Application

            </h2>

            <form

                onSubmit={

                    handleSubmit(

                        onSubmit

                    )

                }

            >

                <Input

                    label="Company"

                    placeholder="Google"

                    {

                        ...register(

                            "company"

                        )

                    }

                    error={

                        errors.company?.message

                    }

                />

                <Input

                    label="Role"

                    placeholder="Software Engineer"

                    {

                        ...register(

                            "role"

                        )

                    }

                    error={

                        errors.role?.message

                    }

                />

                <div className="input-group">

                    <label>

                        Status

                    </label>

                    <select

                        {

                            ...register(

                                "status"

                            )

                        }

                    >

                        <option value="">

                            Select Status

                        </option>

                        <option value="Applied">

                            Applied

                        </option>

                        <option value="Phone Screen">

                            Phone Screen

                        </option>

                        <option value="Interview">

                            Interview

                        </option>

                        <option value="Offer">

                            Offer

                        </option>

                        <option value="Rejected">

                            Rejected

                        </option>

                    </select>

                    {

                        errors.status &&

                        (

                            <span className="error">

                                {

                                    errors.status.message

                                }

                            </span>

                        )

                    }

                </div>

                <Input

                    label="Applied Date"

                    type="date"

                    {

                        ...register(

                            "appliedDate"

                        )

                    }

                    error={

                        errors.appliedDate?.message

                    }

                />

                <div className="input-group">

                    <label>

                        Notes

                    </label>

                    <textarea

                        rows="4"

                        placeholder="Additional Notes"

                        {

                            ...register(

                                "notes"

                            )

                        }

                    />

                </div>

                <Button

                    type="submit"

                    variant="primary"

                    disabled={

                        isSubmitting

                    }

                >

                    {

                        isSubmitting

                        ?

                        "Adding..."

                        :

                        "Add Application"

                    }

                </Button>

            </form>

        </Card>

    );

}

export default AddApplicationForm;