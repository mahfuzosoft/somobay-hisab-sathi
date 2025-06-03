
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Users, DollarSign, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DonationManagement = () => {
  const [editingDonation, setEditingDonation] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [donations, setDonations] = useState([
    {
      id: 1,
      recipientName: "আব্দুল করিম",
      recipientFamily: "গরীব পরিবার",
      amount: 5000,
      purpose: "চিকিৎসা সহায়তা",
      date: "২০২৪-০৫-২০",
      category: "স্বাস্থ্য সেবা",
      status: "প্রদান করা হয়েছে"
    },
    {
      id: 2,
      recipientName: "রাশেদা বেগম",
      recipientFamily: "অসহায় বিধবা",
      amount: 3000,
      purpose: "খাদ্য সহায়তা",
      date: "২০২৪-০৫-১৮",
      category: "খাদ্য সহায়তা",
      status: "প্রদান করা হয়েছে"
    },
    {
      id: 3,
      recipientName: "মো. সালাম",
      recipientFamily: "দুর্ঘটনাগ্রস্ত পরিবার",
      amount: 8000,
      purpose: "জরুরি সহায়তা",
      date: "২০২৪-০৫-১৫",
      category: "জরুরি সাহায্য",
      status: "প্রদান করা হয়েছে"
    }
  ]);

  const [newDonation, setNewDonation] = useState({
    recipientName: "",
    recipientFamily: "",
    amount: "",
    purpose: "",
    category: ""
  });

  const categories = ["স্বাস্থ্য সেবা", "খাদ্য সহায়তা", "শিক্ষা সহায়তা", "জরুরি সাহায্য", "বাসস্থান সহায়তা", "অন্যান্য"];

  const handleAddDonation = () => {
    if (newDonation.recipientName && newDonation.amount && newDonation.purpose) {
      const donation = {
        id: donations.length + 1,
        recipientName: newDonation.recipientName,
        recipientFamily: newDonation.recipientFamily,
        amount: parseInt(newDonation.amount),
        purpose: newDonation.purpose,
        date: new Date().toLocaleDateString('bn-BD'),
        category: newDonation.category,
        status: "প্রদান করা হয়েছে"
      };
      setDonations([...donations, donation]);
      setNewDonation({ recipientName: "", recipientFamily: "", amount: "", purpose: "", category: "" });
    }
  };

  const handleEditDonation = (donation: any) => {
    setEditingDonation({ ...donation });
    setIsEditDialogOpen(true);
  };

  const handleUpdateDonation = () => {
    if (editingDonation) {
      setDonations(donations.map(don => 
        don.id === editingDonation.id ? editingDonation : don
      ));
      setIsEditDialogOpen(false);
      setEditingDonation(null);
    }
  };

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalRecipients = donations.length;
  const categoryCounts = donations.reduce((acc, donation) => {
    acc[donation.category] = (acc[donation.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">দান ও সাহায্য ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">গরীব ও অসহায়দের সাহায্যের হিসাব</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              নতুন সাহায্য যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন সাহায্য প্রদান</DialogTitle>
              <DialogDescription>
                সাহায্যের সকল তথ্য সঠিকভাবে পূরণ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  প্রাপকের নাম
                </Label>
                <Input
                  id="recipient"
                  value={newDonation.recipientName}
                  onChange={(e) => setNewDonation({...newDonation, recipientName: e.target.value})}
                  className="col-span-3"
                  placeholder="যিনি সাহায্য পাবেন"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="family" className="text-right">
                  পারিবারিক অবস্থা
                </Label>
                <Input
                  id="family"
                  value={newDonation.recipientFamily}
                  onChange={(e) => setNewDonation({...newDonation, recipientFamily: e.target.value})}
                  className="col-span-3"
                  placeholder="যেমন: গরীব পরিবার"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  সাহায্যের পরিমাণ
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newDonation.amount}
                  onChange={(e) => setNewDonation({...newDonation, amount: e.target.value})}
                  className="col-span-3"
                  placeholder="টাকার পরিমাণ"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  ক্যাটেগরি
                </Label>
                <Select value={newDonation.category} onValueChange={(value) => setNewDonation({...newDonation, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="সাহায্যের ধরন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  উদ্দেশ্য
                </Label>
                <Textarea
                  id="purpose"
                  value={newDonation.purpose}
                  onChange={(e) => setNewDonation({...newDonation, purpose: e.target.value})}
                  className="col-span-3"
                  placeholder="সাহায্যের বিস্তারিত কারণ"
                />
              </div>
            </div>
            <Button onClick={handleAddDonation} className="w-full">
              সাহায্য প্রদান করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট সাহায্য</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonations.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">সকল সাহায্যের পরিমাণ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সাহায্যপ্রাপ্ত</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients}</div>
            <p className="text-xs text-muted-foreground">জন সাহায্য পেয়েছেন</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">গড় সাহায্য</CardTitle>
            <Heart className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalDonations / totalRecipients).toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">প্রতি ব্যক্তির গড়</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">এই মাসে</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations.filter(d => d.date.includes('২০২৪-০৫')).length}</div>
            <p className="text-xs text-muted-foreground">টি সাহায্য প্রদান</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              ক্যাটেগরি অনুযায়ী সাহায্য
            </CardTitle>
            <CardDescription>
              বিভিন্ন খাতে সাহায্যের পরিসংখ্যান
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category}</span>
                  <Badge variant="outline">{count} টি</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              সাম্প্রতিক সাহায্য
            </CardTitle>
            <CardDescription>
              সর্বশেষ প্রদানকৃত সাহায্যের তালিকা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {donations.slice(0, 3).map((donation) => (
                <div key={donation.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium">{donation.recipientName}</p>
                    <p className="text-sm text-gray-600">{donation.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{donation.amount.toLocaleString()} টাকা</p>
                    <p className="text-xs text-gray-500">{donation.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            সাহায্যের তালিকা
          </CardTitle>
          <CardDescription>
            প্রদানকৃত সকল সাহায্যের বিস্তারিত তথ্য
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{donation.recipientName}</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {donation.status}
                    </Badge>
                    <Badge variant="secondary">
                      {donation.category}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">পারিবারিক অবস্থা:</span> {donation.recipientFamily}</p>
                    <p><span className="font-medium">তারিখ:</span> {donation.date}</p>
                    <p><span className="font-medium">উদ্দেশ্য:</span> {donation.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{donation.amount.toLocaleString()} টাকা</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEditDonation(donation)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Donation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>সাহায্য আপডেট করুন</DialogTitle>
            <DialogDescription>
              সাহায্যের তথ্য পরিবর্তন করুন
            </DialogDescription>
          </DialogHeader>
          {editingDonation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-recipient" className="text-right">প্রাপকের নাম</Label>
                <Input
                  id="edit-recipient"
                  value={editingDonation.recipientName}
                  onChange={(e) => setEditingDonation({...editingDonation, recipientName: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-family" className="text-right">পারিবারিক অবস্থা</Label>
                <Input
                  id="edit-family"
                  value={editingDonation.recipientFamily}
                  onChange={(e) => setEditingDonation({...editingDonation, recipientFamily: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">সাহায্যের পরিমাণ</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingDonation.amount}
                  onChange={(e) => setEditingDonation({...editingDonation, amount: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">ক্যাটেগরি</Label>
                <Select value={editingDonation.category} onValueChange={(value) => setEditingDonation({...editingDonation, category: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-purpose" className="text-right">উদ্দেশ্য</Label>
                <Textarea
                  id="edit-purpose"
                  value={editingDonation.purpose}
                  onChange={(e) => setEditingDonation({...editingDonation, purpose: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <Button onClick={handleUpdateDonation} className="w-full">
            সাহায্য আপডেট করুন
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationManagement;
