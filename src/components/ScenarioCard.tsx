import { Sun, Battery, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScenarioResult {
  name: string;
  source: "Solar" | "Battery" | "Steg";
  solarUsed: number;
  batteryUsed: number;
  stegUsed: number;
  finalBatteryLevel: number;
  solarPercent: number;
  batteryPercent: number;
  stegPercent: number;
}

export function ScenarioCard({ scenario }: { scenario: ScenarioResult }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {scenario.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">Source: {scenario.source}</p>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Energy Usage */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-solar-light">
                <Sun className="h-4 w-4 text-solar" />
              </div>
              <span className="text-sm font-medium">Solar Used</span>
            </div>
            <span className="text-sm font-bold">{scenario.solarUsed.toFixed(2)} kWh</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-battery-light">
                <Battery className="h-4 w-4 text-battery" />
              </div>
              <span className="text-sm font-medium">Battery Used</span>
            </div>
            <span className="text-sm font-bold">{scenario.batteryUsed.toFixed(2)} kWh</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-grid-light">
                <Zap className="h-4 w-4 text-grid" />
              </div>
              <span className="text-sm font-medium">Grid Used</span>
            </div>
            <span className="text-sm font-bold">{scenario.stegUsed.toFixed(2)} kWh</span>
          </div>
        </div>

        {/* Battery Level */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Final Battery Level</span>
            <span className="text-lg font-bold text-battery">{scenario.finalBatteryLevel}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-battery transition-all duration-500"
              style={{ width: `${scenario.finalBatteryLevel}%` }}
            />
          </div>
        </div>

        {/* Energy Distribution */}
        <div>
          <p className="text-sm font-medium mb-3">Energy Distribution</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 rounded-lg bg-solar-light">
              <p className="text-xs text-muted-foreground mb-1">Solar</p>
              <p className="text-lg font-bold text-solar">{scenario.solarPercent}%</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-battery-light">
              <p className="text-xs text-muted-foreground mb-1">Battery</p>
              <p className="text-lg font-bold text-battery">{scenario.batteryPercent}%</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-grid-light">
              <p className="text-xs text-muted-foreground mb-1">Grid</p>
              <p className="text-lg font-bold text-grid">{scenario.stegPercent}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
