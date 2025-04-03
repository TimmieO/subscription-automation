import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeftIcon, 
  PlayIcon, 
  CodeIcon, 
  ClockIcon, 
  StarIcon,
  HistoryIcon,
  SettingsIcon,
  UsersIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock data for a specific script
const script = {
  id: '1',
  name: 'Data Backup',
  description: 'Automated backup script for database and files',
  language: 'Python',
  category: 'Backup',
  executionTime: '2m 30s',
  popularity: 4.8,
  author: 'John Doe',
  lastUpdated: '2024-03-15',
  version: '1.2.0',
  requirements: [
    'Python 3.8+',
    'boto3',
    'pymysql',
  ],
  parameters: [
    {
      name: 'backup_path',
      type: 'string',
      required: true,
      description: 'Path where backups will be stored',
    },
    {
      name: 'retention_days',
      type: 'number',
      required: false,
      default: 30,
      description: 'Number of days to retain backups',
    },
  ],
  recentExecutions: [
    {
      id: '1',
      status: 'success',
      startedAt: '2024-03-20 10:30:00',
      duration: '2m 15s',
      triggeredBy: 'Scheduled',
    },
    {
      id: '2',
      status: 'failed',
      startedAt: '2024-03-19 15:45:00',
      duration: '1m 30s',
      triggeredBy: 'Manual',
      error: 'Invalid backup path',
    },
  ],
};

export default function ScriptDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/scripts">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{script.name}</h1>
          <p className="text-muted-foreground">{script.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Script Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="flex items-center">
                      <CodeIcon className="mr-2 h-4 w-4" />
                      {script.language}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p>{script.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Execution Time</p>
                    <p className="flex items-center">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      {script.executionTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Popularity</p>
                    <p className="flex items-center text-yellow-500">
                      <StarIcon className="mr-2 h-4 w-4 fill-current" />
                      {script.popularity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Author</p>
                    <p className="flex items-center">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      {script.author}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p>{script.lastUpdated}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2">
                  {script.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Parameters</h2>
                <div className="space-y-4">
                  {script.parameters.map((param, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{param.name}</p>
                          <p className="text-sm text-muted-foreground">{param.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{param.type}</p>
                          {param.required ? (
                            <p className="text-xs text-destructive">Required</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              Default: {param.default}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <Card className="p-6">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>
                    {`import boto3
import pymysql
from datetime import datetime, timedelta

def backup_database(backup_path, retention_days=30):
    # Connect to database
    conn = pymysql.connect(
        host='localhost',
        user='admin',
        password='****',
        database='mydb'
    )
    
    # Create backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f"{backup_path}/backup_{timestamp}.sql"
    
    # Upload to S3
    s3 = boto3.client('s3')
    s3.upload_file(backup_file, 'my-backup-bucket', f"backups/{backup_file}")
    
    # Clean up old backups
    cleanup_old_backups(backup_path, retention_days)
    
    return backup_file`}
                  </code>
                </pre>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Executions</h2>
                <div className="space-y-4">
                  {script.recentExecutions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div>
                        <p className="font-medium">
                          {execution.startedAt}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {execution.triggeredBy} • {execution.duration}
                        </p>
                        {execution.error && (
                          <p className="text-sm text-destructive mt-1">
                            {execution.error}
                          </p>
                        )}
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          execution.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {execution.status}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Script Settings</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p>{script.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Schedule</p>
                    <p>Daily at 2:00 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notifications</p>
                    <p>Email on failure</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button className="w-full flex items-center justify-center">
                <PlayIcon className="mr-2 h-4 w-4" />
                Execute Now
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <HistoryIcon className="mr-2 h-4 w-4" />
                View History
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Usage Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Executions</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Duration</p>
                <p className="text-2xl font-bold">2m 15s</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 