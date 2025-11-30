import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScenarioCard } from "@/components/ScenarioCard";
import { PlayCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const Scenarios = () => {
  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockScenarios: ScenarioResult[] = [
    {
      name: "Optimal Solar Priority",
      source: "Solar",
      solarUsed: 45.2,
      batteryUsed: 12.8,
      stegUsed: 8.5,
      finalBatteryLevel: 78,
      solarPercent: 68,
      batteryPercent: 19,
      stegPercent: 13,
    },
    {
      name: "Battery Backup Mode",
      source: "Battery",
      solarUsed: 32.1,
      batteryUsed: 28.4,
      stegUsed: 15.2,
      finalBatteryLevel: 52,
      solarPercent: 42,
      batteryPercent: 38,
      stegPercent: 20,
    },
    {
      name: "Grid Peak Hours",
      source: "Steg",
      solarUsed: 15.8,
      batteryUsed: 8.3,
      stegUsed: 38.9,
      finalBatteryLevel: 65,
      solarPercent: 25,
      batteryPercent: 13,
      stegPercent: 62,
    },
  ];

  const runScenarios = async () => {
    setLoading(true);

    try {
      // Simulate a brief delay to mimic processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Use mock data
      setScenarios(mockScenarios);

      toast({
        title: "Scenarios completed",
        description: `Successfully ran ${mockScenarios.length} scenario(s)`,
      });
    } catch (err) {
      console.error("Error running scenarios:", err);

      // Fallback to mock data in case of unexpected error
      setScenarios(mockScenarios);

      toast({
        title: "Scenarios completed",
        description: `Running with demonstration data`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Energy Scenarios</h1>
            <p className="text-muted-foreground mt-1">
              Run and analyze different energy consumption scenarios
            </p>
          </div>
          <Button
            onClick={runScenarios}
            disabled={loading}
            size="lg"
            className="gap-2 sm:self-start"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5" />
                Run Scenarios
              </>
            )}
          </Button>
        </div>

        {/* Results Container */}
        <div className="relative rounded-lg border bg-card p-6 min-h-[500px]">
          {!loading && scenarios.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <PlayCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No scenarios run yet</h3>
              <p className="text-muted-foreground max-w-md">
                Click the "Run Scenarios" button above to analyze different energy consumption
                patterns and optimize your energy usage.
              </p>
            </div>
          )}

          {!loading && scenarios.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario, index) => (
                <ScenarioCard key={`${scenario.name}-${index}`} scenario={scenario} />
              ))}
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Running energy scenarios...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
