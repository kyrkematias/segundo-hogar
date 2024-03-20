import React, {useEffect} from 'react';

export function HomeView() {
    useEffect(() => {
        document.title = "Segundo Hogar - Inmuebles para estudiantes";
      }, []);
    return (
        <div>HomeView</div>
    )
}
