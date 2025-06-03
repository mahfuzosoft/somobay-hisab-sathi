
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, DollarSign, Target } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const InvestmentManagement = () => {
  const [investments, setInvestments] = useState([
    {
      id: 1,
      sector: "কৃষি ব্যবসা",
      amount: 200000,
      description: "ধান ব্যবসায় বিনিয়োগ",
      date: "২০২৪-০৩-১৫",
      expectedReturn: 15,
      currentProfit: 25000,
      status: "লাভজনক"
    },
    {
      id: 2,
      sector: "মৎস্য চাষ",
      amount: 150000,
      description: "পুকুরে মাছ চাষ প্রকল্প",
      date: "২০২৪-০২-২০",
      expectedReturn: 20,
      currentProfit: 18000,
      status: "লাভজনক"
    },
    {
      id: 3,
      sector: "দোকান ভাড়া",
      amount: 100000,
      description: "বাজারে দোকান ভাড়া দেওয়া",
      date: "২০২৪-০১-১০",
      expectedReturn: 12,
      currentProfit: 8000,
      status: "স্থিতিশীল"
    }
  ]);

  const [newInvestment, setNewInvestment] = useState({
    sector: "",
    amount: "",
    description: "",
    expectedReturn: ""
  });

  const sectors = ["কৃষি ব্যবসা", "মৎস্য চাষ", "পোল্ট্রি ফার্ম", "দোকান ভাড়া", "ব্যাংক ডিপোজিট", "অন্যান্য"];

  const handleAddInvestment = () => {
    if (newInvestment.sector && newInvestment.amount && newInvestment.description) {
      const investment = {
        id: investments.length + 1,
        sector: newInvestment.sector,
        amount: parseInt(newInvestment.amount),
        description: newInvestment.description,
        date: new Date().toLocaleDateString('bn-BD'),
        expectedReturn: parseInt(newInvestment.expectedReturn),
        currentProfit: 0,
        status: "নতুন"
      };
      setInvestments([...investments, investment]);
      setNewInvestment({ sector: "", amount: "", description: "", expectedReturn: "" });
    }
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProfit = investments.reduce((sum, inv) => sum + inv.currentProfit, 0);
  const profitableInvestments = investments.filter(inv => inv.status === "লাভজনক").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">বিনিয়োগ ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">সমিতির বিনিয়োগ ও মুনাফার হিসাব</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              নতুন বিনিয়োগ যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন বিনিয়োগ</DialogTitle>
              <DialogDescription>
                বিনিয়োগের সকল তথ্য সঠিকভাবে পূরণ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sector" className="text-right">
                  খাত
                </Label>
                <Select value={newInvestment.sector} onValueChange={(value) => setNewInvestment({...newInvestment, sector: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="বিনিয়োগের খাত নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  বিনিয়োগ
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                  className="col-span-3"
                  placeholder="টাকার পরিমাণ"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  বিবরণ
                </Label>
                <Textarea
                  id="description"
                  value={newInvestment.description}
                  onChange={(e) => setNewInvestment({...newInvestment, description: e.target.value})}
                  className="col-span-3"
                  placeholder="বিনিয়োগের বিস্তারিত"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="return" className="text-right">
                  প্রত্যাশিত লাভ (%)
                </Label>
                <Input
                  id="return"
                  type="number"
                  value={newInvestment.expectedReturn}
                  onChange={(e) => setNewInvestment({...newInvestment, expectedReturn: e.target.value})}
                  className="col-span-3"
                  placeholder="শতাংশে"
                />
              </div>
            </div>
            <Button onClick={handleAddInvestment} className="w-full">
              বিনিয়োগ যোগ করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট বিনিয়োগ</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvestment.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">সকল খাতে বিনিয়োগ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট মুনাফা</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProfit.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">বিনিয়োগের মুনাফা</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">লাভজনক প্রকল্প</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitableInvestments}</div>
            <p className="text-xs text-muted-foreground">টি প্রকল্প লাভজনক</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মুনাফার হার</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalProfit / totalInvestment) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">বার্ষিক গড় রিটার্ন</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            বিনিয়োগের তালিকা
          </CardTitle>
          <CardDescription>
            সমিতির সকল বিনিয়োগের বিস্তারিত তথ্য
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{investment.sector}</h3>
                    <Badge variant={
                      investment.status === "লাভজনক" ? "default" :
                      investment.status === "স্থিতিশীল" ? "secondary" : "outline"
                    } className={
                      investment.status === "লাভজনক" ? "text-green-600 border-green-600" :
                      investment.status === "স্থিতিশীল" ? "text-blue-600 border-blue-600" : ""
                    }>
                      {investment.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">বিবরণ:</span> {investment.description}</p>
                    <p><span className="font-medium">তারিখ:</span> {investment.date}</p>
                    <p><span className="font-medium">প্রত্যাশিত লাভ:</span> {investment.expectedReturn}%</p>
                    <p><span className="font-medium">বর্তমান মুনাফা:</span> {investment.currentProfit.toLocaleString()} টাকা</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{investment.amount.toLocaleString()} টাকা</p>
                  <p className="text-sm text-green-600 font-medium">+{investment.currentProfit.toLocaleString()} মুনাফা</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentManagement;
