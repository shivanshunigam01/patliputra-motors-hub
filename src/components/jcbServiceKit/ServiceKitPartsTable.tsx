import { cn } from "@/lib/utils";
import { formatInr, type ServiceKit } from "@/data/jcbServiceKits";

export function ServiceKitPartsTable({ kit }: Readonly<{ kit: ServiceKit }>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-[hsl(210,100%,35%)] text-white">
            <th className="px-3 py-2.5 text-left font-semibold">SR NO.</th>
            <th className="px-3 py-2.5 text-left font-semibold">Item No.</th>
            <th className="px-3 py-2.5 text-left font-semibold">Item Description</th>
            <th className="px-3 py-2.5 text-center font-semibold">Qty</th>
            <th className="px-3 py-2.5 text-right font-semibold">MRP</th>
            <th className="px-3 py-2.5 text-right font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {kit.items.map((item, idx) => (
            <tr
              key={item.srNo}
              className={cn(
                "border-t border-border",
                idx % 2 === 0 ? "bg-card" : "bg-muted/40"
              )}
            >
              <td className="px-3 py-2">{item.srNo}</td>
              <td className="px-3 py-2 font-mono text-xs">{item.itemNo}</td>
              <td className="px-3 py-2">{item.description}</td>
              <td className="px-3 py-2 text-center">{item.quantity}</td>
              <td className="px-3 py-2 text-right">{formatInr(item.mrp)}</td>
              <td className="px-3 py-2 text-right font-medium">{formatInr(item.value)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-[hsl(210,100%,35%)] bg-[hsl(210,100%,35%)]/10 font-bold">
            <td colSpan={4} className="px-3 py-2.5 text-right uppercase tracking-wide">
              Total
            </td>
            <td className="px-3 py-2.5 text-right">{formatInr(kit.totalMrp)}</td>
            <td className="px-3 py-2.5 text-right text-jcb">{formatInr(kit.totalValue)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
