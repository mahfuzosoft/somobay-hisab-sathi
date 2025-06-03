
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Coins, Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SavingsManagement = () => {
  const [savings, setSavings] = useState([
    {
      id: 1,
      memberName: "রহিম উদ্দিন",
      amount: 5000,
      date: "২০২৪-০৬-০১",
      month: "জুন ২০২৪",
      status: "সম্পন্ন"
    },
    {
      id: 2,
      memberName: "ফাতেমা খাতুন",
      amount: 4000,
      date: "২০২৪-০৬-০২",
      month: "জুন ২০২৪",
      status: "সম্পন্ন"
    },
    {
      id: 3,
      memberName: "করিম মিয়া",
      amount: 4500,
      date: "২০২৪-০৬-০৩",
      month: "জুন ২০২৪",
      status: "সম্পন্ন"
    }
  ]);

  const [newSaving, setNewSaving] = useState({
    memberName: "",
    amount: "",
    month: "",
    date: new Date().toISOString().split('T')[0]
  });

  const members = ["রহিম উদ্দিন", "ফাতেমা খাতুন", "করিম মিয়া"];
  const months = [
    "জানুয়ারি ২০২৪", "ফেব্রুয়ারি ২০২৪", "মার্চ ২০২৪", "এপ্রিল ২০২৪",
    "মে ২০২৪", "জুন ২০২৪", "জুলাই ২০২৪", "আগস্ট ২০২৪"
  ];

  const handleAddSaving = () => {
    if (newSaving.memberName && newSaving.amount && newSaving.month) {
      const saving = {
        id: savings.length + 1,
        memberName: newSaving.memberName,
        amount: parseInt(newSaving.amount),
        date: new Date().toLocaleDateString('bn-BD'),
        month: newSaving.month,
        status: "সম্পন্ন"
      };
      setSavings([...savings, saving]);
      setNewSaving({ memberName: "", amount: "", month: "", date: new Date().toISOString().split('T')[0] });
    }
  };

  const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
  const currentMonthSavings = savings.filter(s => s.month === "জুন ২০২৪").reduce((sum, saving) => sum + saving.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">মাসিক সঞ্চয় ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">সদস্যদের মাসিক সঞ্চয়ের হিসাব</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              সঞ্চয় যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন সঞ্চয় এন্ট্রি</DialogTitle>
              <DialogDescription>
                সদস্যের মাসিক সঞ্চয়ের তথ্য যোগ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member" className="text-right">
                  সদস্য
                </Label>
                <Select value={newSaving.memberName} onValueChange={(value) => setNewSaving({...newSaving, memberName: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="সদস্য নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  পরিমাণ
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newSaving.amount}
                  onChange={(e) => setNewSaving({...newSaving, amount: e.target.value})}
                  className="col-span-3"
                  placeholder="টাকার পরিমাণ"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="month" className="text-right">
                  মাস
                </Label>
                <Select value={newSaving.month} onValueChange={(value) => setNewSaving({...newSaving, month: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="মাস নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddSaving} className="w-full">
              সঞ্চয় যোগ করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট সঞ্চয়</CardTitle>
            <Coins className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSavings.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">সকল সদস্যের সঞ্চয়</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">এই মাসের সঞ্চয়</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthSavings.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">জুন ২০২৪</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">গড় সঞ্চয়</CardTitle>
            <Coins className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalSavings / members.length).toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">প্রতি সদস্যের গড়</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            সঞ্চয়ের তালিকা
          </CardTitle>
          <CardDescription>
            সদস্যদের মাসিক সঞ্চয়ের বিস্তারিত
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savings.map((saving) => (
              <div key={saving.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{saving.memberName}</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {saving.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">মাস:</span> {saving.month}</p>
                    <p><span className="font-medium">তারিখ:</span> {saving.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{saving.amount.toLocaleString()} টাকা</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsManagement;
