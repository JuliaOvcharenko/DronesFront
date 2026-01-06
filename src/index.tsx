import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css"


let rootElement = document.querySelector("#root") as HTMLElement

let root = createRoot(rootElement)

root.render(<App></App>)