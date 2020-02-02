import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default ({children}) => {
    const [shouldForceRender, setShouldForceRender] = useState(false);

    const expandCodeSnippets = (e) => {
        setShouldForceRender(true);
    }

    // @todo: Don't set up a new event listener for each instance. P
    // Put it in a top-level context. 
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
