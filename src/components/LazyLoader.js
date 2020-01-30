import React, { useState, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default ({children}) => {
    const [shouldForceRender, setShouldForceRender] = useState(false);

    const expandCodeSnippets = (e) => {
        setShouldForceRender(true);
    }

    useEffect(() => {     
        window.addEventListener('expandLazyStuff', expandCodeSnippets);

        if (window.expandLazyStuffEvent_hasFired) {
            expandCodeSnippets();
        }

        return () => {
            window.removeEventListener('expandLazyStuff', expandCodeSnippets);
        }
    }, []);

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true, 
        rootMargin: "200px"
    });

    return (
        <div ref={ref}>
            {(shouldForceRender || inView) && children}
        </div>	
    )
}
