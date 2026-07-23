import { Inbox } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function EmptyState({

    title,

    description

}) {

    const { t } = useTranslation();

    return (

        <div className="flex flex-col items-center justify-center py-20 text-center">

            <Inbox
                size={64}
                className="text-slate-400 mb-4"
            />

            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">

                {title ?? t("nothingHere")}

            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">

                {description ?? t("noDataAvailable")}

            </p>

        </div>

    );

}

export default memo(EmptyState);