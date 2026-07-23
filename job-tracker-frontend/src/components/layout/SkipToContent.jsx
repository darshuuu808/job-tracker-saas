export default function SkipToContent() {

    return (

        <a
            href="#main-content"
            className="
                sr-only
                focus:not-sr-only
                focus:absolute
                focus:top-4
                focus:left-4
                focus:z-50
                rounded-md
                bg-blue-600
                px-4
                py-2
                text-white
                font-medium
            "
        >

            Skip to main content

        </a>

    );

}