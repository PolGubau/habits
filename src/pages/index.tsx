import Hero from "src/components/Hero/Hero";
import LoadingPage from "src/Layouts/Loading/Loading";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "src/Recoil/Atoms";

export default function HomePage() {
  const loading = useRecoilValue(loadingAtom);
  return loading ? <LoadingPage /> : <Hero />;
}
