import { useEffect, useRef } from 'react';

export function useAutoScroll<T extends HTMLElement>(dependency: any) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [dependency]);

    return ref;
}
