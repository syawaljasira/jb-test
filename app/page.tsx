import Onboarding from "@/components/Onboarding";
import MainContextProvider from "@/context/MainContext";

export default function Home() {
  return (
    <div className="w-full flex overflow-hidden mx-auto bg-dark">
      <MainContextProvider>
        <Onboarding />
      </MainContextProvider>
    </div>
  );
}
