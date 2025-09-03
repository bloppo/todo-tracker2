import useAppState from './AppState';

const Logout = () => {

    const setIsAuthenticated = useAppState((state) => state.setIsAuthenticated);

    const logout = () => {
        setIsAuthenticated(false)
    }

    return (
        <>
            <div>Log Out</div>
            <button onClick={() => logout()}>Login</button>
        </>
    )
}

export default Logout;
