import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function LanguageSwitcher() {

    const { i18n } = useTranslation();

    const changeLanguage = (language) => {

        i18n.changeLanguage(language);

    };

    return (

        <Select
            value={i18n.language}
            onValueChange={changeLanguage}
        >

            <SelectTrigger
                className="w-40"
                aria-label="Select language"
            >

                <div className="flex items-center gap-2">

                    <Languages size={16} />

                    <SelectValue />

                </div>

            </SelectTrigger>

            <SelectContent>

                <SelectItem value="en">

                    🇺🇸 English

                </SelectItem>

                <SelectItem value="ta">

                    🇮🇳 தமிழ்

                </SelectItem>

                <SelectItem value="te">

                    🇮🇳 తెలుగు

                </SelectItem>

            </SelectContent>

        </Select>

    );

}