import Header from "./Header";
import MenuSelection from "../contexts/MenuSelection"
import { useState } from "react";

export default function Timeline() {
    const [menuSelected, setMenuSelected] = useState(false);

    return(
        <MenuSelection.Provider value={{menuSelected, setMenuSelected }}>
            <Header />

        </MenuSelection.Provider>
    );
}