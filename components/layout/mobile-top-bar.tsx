import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";

export function MobileTopBar() {
  return (
    <header className="glass fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-full px-3 py-2 md:hidden">
      <Link href="/" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
        <Image src="/images/vvk-dev-logo.png" alt="VVKDEV logo" width={26} height={26} className="rounded-full" priority />
        VVKDEV
      </Link>
      <MobileMenu />
    </header>
  );
}
