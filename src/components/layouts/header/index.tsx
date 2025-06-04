import { ReactElement } from "react";

export const Header = (): ReactElement => {
    return (
        <header>
            <h1>FlexReports</h1>
            <nav>
                <ul>
                    <li>{/* <a href="/">Home</a> */}</li>
                    <li>{/* <a href="/dashboard">Dashboard</a> */}</li>
                </ul>
            </nav>
        </header>
    );
};
