import { useEffect } from "react";

function useReveal() {

  useEffect(() => {

    const elements =
      document.querySelectorAll(".reveal");

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "revealed"
              );

            }

          });

        },

        {
          threshold: 0.12
        }

      );

    elements.forEach((el) =>
      observer.observe(el)
    );

    return () => {

      elements.forEach((el) =>
        observer.unobserve(el)
      );

    };

  }, []);

}

export default useReveal;