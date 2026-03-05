
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CouponData {
  id: string;
  code: string;
  discount: number;
  valid: boolean;
  expiresAt: string | null;
  timesUsed: number;
  maxUses: number | null;
  createdAt: string;
}

export const CouponManager: React.FC = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<CouponData[]>([
    {
      id: '1',
      code: 'WELCOME10',
      discount: 10,
      valid: true,
      expiresAt: null,
      timesUsed: 45,
      maxUses: 100,
      createdAt: '2025-01-15'
    },
    {
      id: '2',
      code: 'SUMMER20',
      discount: 20,
      valid: true,
      expiresAt: '2025-08-31',
      timesUsed: 12,
      maxUses: null,
      createdAt: '2025-03-01'
    },
    {
      id: '3',
      code: 'TESTCODE',
      discount: 5,
      valid: true,
      expiresAt: '2025-12-31',
      timesUsed: 3,
      maxUses: 50,
      createdAt: '2025-02-20'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponData | null>(null);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 10,
    expiresAt: '',
    maxUses: ''
  });
  
  const handleCreateCoupon = () => {
    if (!newCoupon.code || newCoupon.discount <= 0) {
      toast({
        title: "Invalid input",
        description: "Please provide a valid code and discount percentage",
        variant: "destructive",
      });
      return;
    }
    
    // Check if coupon code already exists
    if (coupons.some(c => c.code === newCoupon.code)) {
      toast({
        title: "Duplicate code",
        description: "This coupon code already exists",
        variant: "destructive",
      });
      return;
    }
    
    const couponData: CouponData = {
      id: Math.random().toString().substring(2, 10),
      code: newCoupon.code,
      discount: Number(newCoupon.discount),
      valid: true,
      expiresAt: newCoupon.expiresAt || null,
      timesUsed: 0,
      maxUses: newCoupon.maxUses ? Number(newCoupon.maxUses) : null,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setCoupons(prev => [...prev, couponData]);
    setIsDialogOpen(false);
    
    // Reset form
    setNewCoupon({
      code: '',
      discount: 10,
      expiresAt: '',
      maxUses: ''
    });
    
    toast({
      title: "Coupon created",
      description: `Coupon code "${couponData.code}" has been created successfully.`
    });
  };
  
  const handleUpdateCoupon = () => {
    if (!editingCoupon) return;
    
    setCoupons(prev => prev.map(c => 
      c.id === editingCoupon.id ? editingCoupon : c
    ));
    
    setEditingCoupon(null);
    
    toast({
      title: "Coupon updated",
      description: `Coupon code "${editingCoupon.code}" has been updated successfully.`
    });
  };
  
  const handleDeleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    
    toast({
      title: "Coupon deleted",
      description: "The coupon code has been deleted successfully."
    });
  };
  
  const handleToggleCouponValidity = (id: string) => {
    setCoupons(prev => prev.map(c => 
      c.id === id ? { ...c, valid: !c.valid } : c
    ));
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coupon Codes</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Add a new discount coupon code for your customers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., SUMMER20"
                  value={newCoupon.code}
                  onChange={e => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={newCoupon.discount}
                  onChange={e => setNewCoupon(prev => ({ ...prev, discount: Number(e.target.value) }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expires">Expiry Date (Optional)</Label>
                <Input
                  id="expires"
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={e => setNewCoupon(prev => ({ ...prev, expiresAt: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxUses">Maximum Uses (Optional)</Label>
                <Input
                  id="maxUses"
                  type="number"
                  min="1"
                  placeholder="Unlimited if blank"
                  value={newCoupon.maxUses}
                  onChange={e => setNewCoupon(prev => ({ ...prev, maxUses: e.target.value }))}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateCoupon}>Create Coupon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Coupon Codes</CardTitle>
          <CardDescription>
            Manage discount coupons for your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map(coupon => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.valid ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(coupon.expiresAt)}</TableCell>
                  <TableCell>
                    {coupon.timesUsed}
                    {coupon.maxUses ? ` / ${coupon.maxUses}` : ''}
                  </TableCell>
                  <TableCell>{formatDate(coupon.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleCouponValidity(coupon.id)}
                      >
                        {coupon.valid ? 'Disable' : 'Enable'}
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Coupon</DialogTitle>
                            <DialogDescription>
                              Update details for coupon code {coupon.code}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor={`edit-discount-${coupon.id}`}>Discount Percentage</Label>
                              <Input
                                id={`edit-discount-${coupon.id}`}
                                type="number"
                                min="1"
                                max="100"
                                defaultValue={coupon.discount}
                                onChange={e => setEditingCoupon(prev => 
                                  prev ? { ...prev, discount: Number(e.target.value) } : null
                                )}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`edit-expires-${coupon.id}`}>Expiry Date (Optional)</Label>
                              <Input
                                id={`edit-expires-${coupon.id}`}
                                type="date"
                                defaultValue={coupon.expiresAt || ''}
                                onChange={e => setEditingCoupon(prev => 
                                  prev ? { ...prev, expiresAt: e.target.value || null } : null
                                )}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`edit-max-uses-${coupon.id}`}>Maximum Uses (Optional)</Label>
                              <Input
                                id={`edit-max-uses-${coupon.id}`}
                                type="number"
                                min="1"
                                placeholder="Unlimited if blank"
                                defaultValue={coupon.maxUses || ''}
                                onChange={e => setEditingCoupon(prev => 
                                  prev ? { ...prev, maxUses: e.target.value ? Number(e.target.value) : null } : null
                                )}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingCoupon(null)}>Cancel</Button>
                            <Button onClick={handleUpdateCoupon}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the coupon code "{coupon.code}".
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCoupon(coupon.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              {coupons.length === 0 ? 'No coupon codes available' : `Showing ${coupons.length} coupon codes`}
            </TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
