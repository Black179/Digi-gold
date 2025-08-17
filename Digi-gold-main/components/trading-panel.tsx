import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function TradingPanel() {
  return (
    <div className="space-y-4">
      <h3 className="font-serif font-bold text-xl text-white">Quick Trade</h3>

      <Card className="glass-panel border-yellow-400/20 p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Current Gold Price</p>
            <p className="font-serif font-black text-3xl text-yellow-400">$2,034.50</p>
            <p className="text-sm text-green-400">+$12.30 (+0.61%)</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Amount (USD)</label>
              <Input type="number" placeholder="1000.00" className="bg-gray-800/50 border-gray-600 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="gold-gradient text-gray-900 font-serif font-bold hover:opacity-90 gold-glow">
                Buy Gold
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Sell Gold
              </Button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">Processing securely with bank-grade encryption</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
