export function PriceTicker() {
  const prices = [
    { symbol: "GOLD", price: 2034.5, change: +12.3, changePercent: +0.61 },
    { symbol: "SILVER", price: 24.85, change: -0.15, changePercent: -0.6 },
    { symbol: "PLATINUM", price: 1045.2, change: +8.75, changePercent: +0.84 },
    { symbol: "PALLADIUM", price: 1234.8, change: -22.1, changePercent: -1.76 },
  ]

  return (
    <div className="bg-gray-800/50 border-y border-gray-700 py-3 overflow-hidden">
      <div className="flex gap-8 price-ticker">
        {prices.concat(prices).map((item, index) => (
          <div key={index} className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-serif font-semibold text-yellow-400">{item.symbol}</span>
            <span className="font-sans font-medium text-white">${item.price.toFixed(2)}</span>
            <span className={`font-sans text-sm ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
