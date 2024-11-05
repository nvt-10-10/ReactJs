export const authMiddleware = store => next => action => {
    const state = store.getState();
    if (action.requiresAuth && !state.auth.isAuthenticated) {
      return;
    }
    return next(action);
  };
  
