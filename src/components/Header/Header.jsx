import { Link } from "react-router";

function Header() {
    return ( 
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Головна</Link></li>
                    <li><Link to="/recipe/123">Рецепт</Link></li>
                    <li><Link to="/recipe/add">Додати рецепт</Link></li>
                    <li><Link to="/user/456">Мій профіль</Link></li>
                </ul>
            </nav>
        </header>
     );
}

export default Header;