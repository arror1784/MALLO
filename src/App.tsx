import { Route, Routes } from "react-router";
import { DeviceFrame } from "@/components/DeviceFrame";
import { ComingSoon } from "@/screens/ComingSoon";
import { Onboarding } from "@/screens/Onboarding";
import { screens } from "@/routes/screens";

const implementedComponents: Record<string, () => React.JSX.Element> = {
  "/": Onboarding,
};

export function App() {
  return (
    <DeviceFrame>
      <Routes>
        {screens.map((screen) => {
          const Component = implementedComponents[screen.path];
          return (
            <Route
              key={screen.path}
              path={screen.path}
              element={
                Component ? (
                  <Component />
                ) : (
                  <ComingSoon label={screen.label} figmaNodeId={screen.figmaNodeId} />
                )
              }
            />
          );
        })}
      </Routes>
    </DeviceFrame>
  );
}
