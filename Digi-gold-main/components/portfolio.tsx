import { Card } from "@/components/ui/card"

export function Portfolio() {
  const holdings = [
    { type: "Physical Gold", amount: "77.5g", value: 5086.25, change: +2.1 },
    { type: "Gold ETF", amount: "50 shares", value: 4250.0, change: +1.8 },
    { type: "Gold Futures", amount: "1 contract", value: 3511.25, change: -0.5 },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-serif font-bold text-xl text-white">Your Holdings</h3>

      <div className="grid gap-4">
        {holdings.map((holding, index) => (
          <Card key={index} className="glass-panel border-yellow-400/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-semibold text-white">{holding.type}</h4>
                <p className="text-sm text-gray-400">{holding.amount}</p>
              </div>
              <div className="text-right">
                <p className="font-sans font-semibold text-white">${holding.value.toFixed(2)}</p>
                <p className={`text-sm ${holding.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {holding.change >= 0 ? "+" : ""}
                  {holding.change.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
