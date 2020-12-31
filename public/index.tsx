import hydrate from "preact-iso/hydrate";
import { LocationProvider, Router } from "preact-iso/router";
import { ErrorBoundary } from "preact-iso/lazy";

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import Home from "./pages/home/index";
import NotFound from "./pages/_404";

export function App() {
  return (
    <LocationProvider>
      <DndProvider
        backend={TouchBackend}
        options={{ enableTouchEvents: false, enableMouseEvents: true }}
      >
        <div className="app">
          <ErrorBoundary>
            <Router>
              <Home path="/" />
              <NotFound />
            </Router>
          </ErrorBoundary>
        </div>
      </DndProvider>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import("preact-iso/prerender");
  return await prerender(<App {...data} />);
}
