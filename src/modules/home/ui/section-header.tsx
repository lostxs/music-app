import Link from "next/link";

export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="mb-2 min-h-12">
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full items-end justify-end self-end">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex h-full items-end justify-end self-end">
          <Link href={href} className="text-muted-foreground text-sm">
            Смотреть все
          </Link>
        </div>
      </div>
    </div>
  );
}
