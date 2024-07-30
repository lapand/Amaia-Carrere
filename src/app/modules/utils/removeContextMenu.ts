import { MouseEvent } from "react";

const removeContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
};

export default removeContextMenu;