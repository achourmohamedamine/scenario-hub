import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Battery, Zap, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your energy consumption and manage scenarios</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Solar Production</CardTitle>
              <div className="p-2 rounded-lg bg-solar-light">
                <Sun className="h-4 w-4 text-solar" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245.8 kWh</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
              <div className="p-2 rounded-lg bg-battery-light">
                <Battery className="h-4 w-4 text-battery" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground mt-1">Fully charged</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Grid Usage</CardTitle>
              <div className="p-2 rounded-lg bg-grid-light">
                <Zap className="h-4 w-4 text-grid" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.2 kWh</div>
              <p className="text-xs text-muted-foreground mt-1">-8% from last month</p>
            </CardContent>
          </Card>

         
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Link to="/scenarios" className="flex-1">
              <Button className="w-full gap-2" size="lg">
                <Zap className="h-5 w-5" />
                Run Energy Scenarios
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;