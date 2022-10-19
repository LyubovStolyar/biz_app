import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../services/auth";

function LogOut() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem(TOKEN_KEY);
        navigate('/login');
    }

    return (
        <a
            role="button"
            onClickCapture={handleLogout}
            className="">
            Log Out
        </a>
    );
}

export default LogOut;