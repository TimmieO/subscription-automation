import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { 
  CodeIcon, 
  PlayIcon, 
  CreditCardIcon, 
  ActivityIcon 
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: 'Available Scripts', value: '12', icon: CodeIcon },
    { name: 'Executions This Month', value: '24', icon: PlayIcon },
    { name: 'Tokens Remaining', value: user?.subscription?.tokensRemaining.toString() || '0', icon: CreditCardIcon },
    { name: 'Active Automations', value: '3', icon: ActivityIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName || 'User'}! Here's an overview of your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Executions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Script #{i}</p>
                  <p className="text-sm text-muted-foreground">Completed 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">{user?.subscription?.level || 'Free'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tokens Used</span>
              <span className="font-medium">76 / 100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Renewal Date</span>
              <span className="font-medium">May 15, 2024</span>
            </div>
            <Button className="w-full mt-4">Manage Subscription</Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 