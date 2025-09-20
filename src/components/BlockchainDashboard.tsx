import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Activity, 
  TrendingUp, 
  Shield, 
  MapPin, 
  Users, 
  Leaf,
  Hash,
  Clock,
  CheckCircle 
} from 'lucide-react';

interface BlockchainStats {
  totalTransactions: number;
  activeNodes: number;
  herbsBatches: number;
  verifiedFarmers: number;
  networkHealth: number;
}

interface Transaction {
  id: string;
  type: 'collection' | 'processing' | 'quality_test' | 'packaging';
  batchId: string;
  timestamp: string;
  farmer: string;
  status: 'confirmed' | 'pending';
  hash: string;
}

const BlockchainDashboard = () => {
  const [stats, setStats] = useState<BlockchainStats>({
    totalTransactions: 0,
    activeNodes: 0,
    herbsBatches: 0,
    verifiedFarmers: 0,
    networkHealth: 0
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalTransactions: 15247,
        activeNodes: 23,
        herbsBatches: 1834,
        verifiedFarmers: 456,
        networkHealth: 98.5
      });

      setTransactions([
        {
          id: '1',
          type: 'collection',
          batchId: 'ASH-2024-001',
          timestamp: '2024-01-25T10:30:00Z',
          farmer: 'Rajesh Kumar Sharma',
          status: 'confirmed',
          hash: '0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730'
        },
        {
          id: '2',
          type: 'quality_test',
          batchId: 'TUR-2024-032',
          timestamp: '2024-01-25T09:15:00Z',
          farmer: 'Priya Devi',
          status: 'confirmed',
          hash: '0x3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9a4ed373eb'
        },
        {
          id: '3',
          type: 'processing',
          batchId: 'BRA-2024-018',
          timestamp: '2024-01-25T08:45:00Z',
          farmer: 'Suresh Patel',
          status: 'pending',
          hash: '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        },
        {
          id: '4',
          type: 'packaging',
          batchId: 'NEE-2024-095',
          timestamp: '2024-01-25T07:20:00Z',
          farmer: 'Anita Singh',
          status: 'confirmed',
          hash: '0x2cf24dba4f21d4288094479b07b6a2b45c9b851e3b50a390e721e2b7a2b8c6c9'
        }
      ]);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collection':
        return <Leaf className="w-4 h-4" />;
      case 'processing':
        return <Activity className="w-4 h-4" />;
      case 'quality_test':
        return <Shield className="w-4 h-4" />;
      case 'packaging':
        return <Database className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'collection':
        return 'bg-success/10 text-success border-success/20';
      case 'processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'quality_test':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'packaging':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-natural-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-herb-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connecting to Blockchain Network</h2>
            <p className="text-muted-foreground">Loading network data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural-gradient py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Blockchain Network Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of the Ayurvedic herb traceability blockchain network
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-herb-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stats.totalTransactions.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stats.activeNodes}</div>
              <div className="text-sm text-muted-foreground">Active Nodes</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stats.herbsBatches.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Herb Batches</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stats.verifiedFarmers}</div>
              <div className="text-sm text-muted-foreground">Verified Farmers</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Network Health */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Network Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-success mb-2">
                    {stats.networkHealth}%
                  </div>
                  <Progress value={stats.networkHealth} className="w-full" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consensus Rate</span>
                    <span className="text-sm font-medium">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Block Time</span>
                    <span className="text-sm font-medium">3.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Latency</span>
                    <span className="text-sm font-medium">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Integrity</span>
                    <span className="text-sm font-medium text-success">100%</span>
                  </div>
                </div>

                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">Network Status: Healthy</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All nodes are synchronized and operating normally.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={getTypeColor(tx.type)}>
                            {getTypeIcon(tx.type)}
                            <span className="ml-1">{formatType(tx.type)}</span>
                          </Badge>
                          <div>
                            <p className="font-medium">Batch: {tx.batchId}</p>
                            <p className="text-sm text-muted-foreground">
                              Farmer: {tx.farmer}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={tx.status === 'confirmed' ? 'default' : 'secondary'}
                          className={tx.status === 'confirmed' ? 'bg-success text-success-foreground' : ''}
                        >
                          {tx.status === 'confirmed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                          {tx.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          Hash: {formatHash(tx.hash)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(tx.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Node Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Network Node Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Farmer Nodes</h3>
                  <p className="text-2xl font-bold text-primary mb-1">12</p>
                  <p className="text-sm text-muted-foreground">Active collection points</p>
                </div>

                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Processing Nodes</h3>
                  <p className="text-2xl font-bold text-warning mb-1">6</p>
                  <p className="text-sm text-muted-foreground">Processing facilities</p>
                </div>

                <div className="text-center p-6 border rounded-lg">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Validator Nodes</h3>
                  <p className="text-2xl font-bold text-success mb-1">5</p>
                  <p className="text-sm text-muted-foreground">Quality assurance labs</p>
                </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainDashboard;