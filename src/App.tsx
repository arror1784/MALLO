import { Route, Routes } from "react-router";
import { DeviceFrame } from "@/components/DeviceFrame";
import { ComingSoon } from "@/screens/ComingSoon";
import { Onboarding } from "@/screens/Onboarding";
import { SignUp } from "@/screens/SignUp";
import { Consent } from "@/screens/Consent";
import { RecordPrepare } from "@/screens/RecordPrepare";
import { Home } from "@/screens/Home";
import { Record } from "@/screens/Record";
import { RecordProcessing } from "@/screens/RecordProcessing";
import { screens } from "@/routes/screens";

const implementedComponents: Record<string, () => React.JSX.Element> = {
  "/": Onboarding,
  "/signup": SignUp,
  "/consent": Consent,
  "/record/prepare": RecordPrepare,
  "/home": Home,
  "/record": Record,
  "/record/processing": RecordProcessing,
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
