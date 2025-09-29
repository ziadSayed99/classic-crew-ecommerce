import Router from "./router";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  );
}

export default App;
