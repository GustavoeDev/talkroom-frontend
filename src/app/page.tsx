import LeftSide from "@/components/layouts/left-side";
import BannerDefault from "@/components/shared/banner-default";

export default function Home() {
  return (
    <main className="h-screen w-full flex">
      <LeftSide />
      <div className="flex-1">
        <BannerDefault />
      </div>
    </main>
  );
}
