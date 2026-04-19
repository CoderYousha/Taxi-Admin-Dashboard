export function useConstants() {
    const host = `${process.env.REACT_APP_LOCAL_HOST}`;
    const language = localStorage.getItem('language') || 'en';

    return {
        host, language
    };
}