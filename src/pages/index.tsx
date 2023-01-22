import BodyComponent from "src/components/BodyComponent/BodyComponent";
import AppLayout from "src/components/Layout/AppLayout/index";

export default function HomePage(): JSX.Element {
  return (
    <AppLayout>
      <main className="main">
        <BodyComponent />
      </main>
    </AppLayout>
  );
}
