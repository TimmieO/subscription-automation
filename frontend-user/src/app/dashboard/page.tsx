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
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back, {user?.firstName || 'User'}! Here's an overview of your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Recent Executions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-accent/10 rounded-full">
                    <PlayIcon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Script #{i}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Executed 2 hours ago</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Token Usage</h2>
          <div className="space-y-4">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">750 / 1000 tokens used</span>
              <span className="text-primary font-medium">75%</span>
            </div>
            <Button className="w-full mt-2">Upgrade Plan</Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 