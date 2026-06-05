import { useEffect, useState } from "react";

import "./stickyNav.css";

function StickyNav() {


const [active, setActive] =
    useState("Atlas");

const items = [
    { label: "Atlas", id: "atlas" },
    { label: "Economy", id: "economy" },
    { label: "Climate", id: "climate" },
    { label: "Lifestyle", id: "lifestyle" },
    { label: "Mobility", id: "mobility" },
    { label: "Pulse", id: "pulse" },
    { label: "News", id: "news" }
];

useEffect(() => {

    const handleScroll = () => {

        const scrollPosition =
            window.scrollY + 220;

        items.forEach((item) => {

            const section =
                document.getElementById(item.id);

            if (!section) return;

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                setActive(item.label);

            }

        });

    };

    window.addEventListener(
        "scroll",
        handleScroll
    );

    return () =>
        window.removeEventListener(
            "scroll",
            handleScroll
        );

}, [items]);

return (

    <section className="stickyNavWrapper">

        <div className="stickyNav">

            {items.map((item) => (

                <button
                    key={item.id}
                    className={`navItem ${
                        active === item.label
                            ? "activeNav"
                            : ""
                    }`}
                    onClick={() => {

                        setActive(item.label);

                        const section =
                            document.getElementById(item.id);

                        if (section) {

                            const yOffset = -140;

                            const y =
                                section.getBoundingClientRect().top +
                                window.pageYOffset +
                                yOffset;

                            window.scrollTo({
                                top: y,
                                behavior: "smooth"
                            });

                        }

                    }}
                >

                    {item.label}

                </button>

            ))}

        </div>

    </section>

);


}

export default StickyNav;
