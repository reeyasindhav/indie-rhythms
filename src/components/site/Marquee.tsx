export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-ink py-3 text-paper">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="label flex items-center gap-10 opacity-90">
            {item}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
