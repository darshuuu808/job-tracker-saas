import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { applicationSchema } from "../validation/applicationSchema";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";

import { createApplication } from "../services/applicationService";

function AddApplicationForm() {

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors

        }

    } = useForm({

        resolver: zodResolver(

            applicationSchema

        )

    });

    const onSubmit = async (data) => {

        try {

            const response = await createApplication(data);

            alert(response.message);

            console.log(response);

            reset();

        }

        catch (error) {

            alert(

                error.response?.data?.error ||

                "Something went wrong"

            );

        }

    };

    return (

        <Card>

            <form

                onSubmit={

                    handleSubmit(

                        onSubmit

                    )

                }

            >

                <h2>

                    Add Application

                </h2>

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

                    placeholder="Software Engineer Intern"

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

                        errors.status && (

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

                        placeholder="Write additional notes..."

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

                >

                    Add Application

                </Button>

            </form>

        </Card>

    );

}

export default AddApplicationForm;