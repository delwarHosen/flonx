// utils/routeStore.ts
let currentRoute = '';

export const setCurrentRoute = (route: string) => {
    currentRoute = route;
};

export const getCurrentRoute = () => currentRoute;