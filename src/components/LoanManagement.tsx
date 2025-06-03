
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, DollarSign, Clock, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const LoanManagement = () => {
  const [refundingLoan, setRefundingLoan] = useState<any>(null);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [loans, setLoans] = useState([
    {
      id: 1,
      memberName: "ফাতেমা খাতুন",
      amount: 50000,
      purpose: "ব্যবসার জন্য",
      date: "২০২৪-০৫-১৫",
      status: "চলমান",
      installments: 12,
      paidInstallments: 4,
      monthlyPayment: 4500
    },
    {
      id: 2,
      memberName: "করিম মিয়া",
      amount: 30000,
      purpose: "চিকিৎসার জন্য",
      date: "২০২ৄ-০৪-২০",
      status: "সম্পন্ন",
      installments: 10,
      paidInstallments: 10,
      monthlyPayment: 3200
    },
    {
      id: 3,
      memberName: "রহিম উদ্দিন",
      amount: 75000,
      purpose: "বাড়ি মেরামত",
      date: "২০২৪-০৬-০১",
      status: "চলমান",
      installments: 15,
      paidInstallments: 1,
      monthlyPayment: 5300
    }
  ]);

  const [newLoan, setNewLoan] = useState({
    memberName: "",
    amount: "",
    purpose: "",
    installments: "",
    monthlyPayment: ""
  });

  const members = ["রহিম উদ্দিন", "ফাতেমা খাতুন", "করিম মিয়া"];

  const handleAddLoan = () => {
    if (newLoan.memberName && newLoan.amount && newLoan.purpose) {
      const loan = {
        id: loans.length + 1,
        memberName: newLoan.memberName,
        amount: parseInt(newLoan.amount),
        purpose: newLoan.purpose,
        date: new Date().toLocaleDateString('bn-BD'),
        status: "চলমান",
        installments: parseInt(newLoan.installments),
        paidInstallments: 0,
        monthlyPayment: parseInt(newLoan.monthlyPayment)
      };
      setLoans([...loans, loan]);
      setNewLoan({ memberName: "", amount: "", purpose: "", installments: "", monthlyPayment: "" });
    }
  };

  const handleRefundLoan = (loan: any) => {
    setRefundingLoan(loan);
    setRefundAmount("");
    setIsRefundDialogOpen(true);
  };

  const handleProcessRefund = () => {
    if (refundingLoan && refundAmount) {
      const refund = parseInt(refundAmount);
      const updatedLoan = {
        ...refundingLoan,
        paidInstallments: Math.min(refundingLoan.paidInstallments + Math.floor(refund / refundingLoan.monthlyPayment), refundingLoan.installments)
      };
      
      if (updatedLoan.paidInstallments >= updatedLoan.installments) {
        updatedLoan.status = "সম্পন্ন";
      }

      setLoans(loans.map(l => l.id === refundingLoan.id ? updatedLoan : l));
      setIsRefundDialogOpen(false);
      setRefundingLoan(null);
      setRefundAmount("");
    }
  };

  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const activeLoans = loans.filter(loan => loan.status === "চলমান");
  const completedLoans = loans.filter(loan => loan.status === "সম্পন্ন");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">লোন ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">সদস্যদের লোন ও পরিশোধের হিসাব</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="w-4 h-4 mr-2" />
              নতুন লোন যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন লোন আবেদন</DialogTitle>
              <DialogDescription>
                লোনের সকল তথ্য সঠিকভাবে পূরণ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member" className="text-right">
                  সদস্য
                </Label>
                <Select value={newLoan.memberName} onValueChange={(value) => setNewLoan({...newLoan, memberName: value})}>
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
                  লোনের পরিমাণ
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
                  className="col-span-3"
                  placeholder="টাকার পরিমাণ"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  উদ্দেশ্য
                </Label>
                <Textarea
                  id="purpose"
                  value={newLoan.purpose}
                  onChange={(e) => setNewLoan({...newLoan, purpose: e.target.value})}
                  className="col-span-3"
                  placeholder="লোনের উদ্দেশ্য"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="installments" className="text-right">
                  কিস্তির সংখ্যা
                </Label>
                <Input
                  id="installments"
                  type="number"
                  value={newLoan.installments}
                  onChange={(e) => setNewLoan({...newLoan, installments: e.target.value})}
                  className="col-span-3"
                  placeholder="মাসিক কিস্তি"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="monthly" className="text-right">
                  মাসিক পরিশোধ
                </Label>
                <Input
                  id="monthly"
                  type="number"
                  value={newLoan.monthlyPayment}
                  onChange={(e) => setNewLoan({...newLoan, monthlyPayment: e.target.value})}
                  className="col-span-3"
                  placeholder="মাসিক টাকার পরিমাণ"
                />
              </div>
            </div>
            <Button onClick={handleAddLoan} className="w-full">
              লোন অনুমোদন করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট লোন</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLoans.toLocaleString()} টাকা</div>
            <p className="text-xs text-muted-foreground">সকল লোনের পরিমাণ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">চলমান লোন</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLoans.length}</div>
            <p className="text-xs text-muted-foreground">টি লোন চলমান</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সম্পন্ন লোন</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLoans.length}</div>
            <p className="text-xs text-muted-foreground">টি লোন সম্পন্ন</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">আজকের পরিশোধ</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">১৮,০০০ টাকা</div>
            <p className="text-xs text-muted-foreground">প্রত্যাশিত পরিশোধ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            লোনের তালিকা
          </CardTitle>
          <CardDescription>
            সদস্যদের লোন ও পরিশোধের বিস্তারিত
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{loan.memberName}</h3>
                    <Badge variant={loan.status === "চলমান" ? "destructive" : "outline"} 
                           className={loan.status === "চলমান" ? "text-red-600 border-red-600" : "text-green-600 border-green-600"}>
                      {loan.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">উদ্দেশ্য:</span> {loan.purpose}</p>
                    <p><span className="font-medium">তারিখ:</span> {loan.date}</p>
                    <p><span className="font-medium">মাসিক পরিশোধ:</span> {loan.monthlyPayment.toLocaleString()} টাকা</p>
                    <p><span className="font-medium">অগ্রগতি:</span> {loan.paidInstallments}/{loan.installments} কিস্তি</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">{loan.amount.toLocaleString()} টাকা</p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-2 bg-orange-500 rounded-full"
                        style={{ width: `${(loan.paidInstallments / loan.installments) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  {loan.status === "চলমান" && (
                    <Button variant="outline" size="sm" onClick={() => handleRefundLoan(loan)}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      রিফান্ড
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refund Loan Dialog */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>লোন রিফান্ড করুন</DialogTitle>
            <DialogDescription>
              {refundingLoan?.memberName} এর লোন রিফান্ডের পরিমাণ নির্ধারণ করুন
            </DialogDescription>
          </DialogHeader>
          {refundingLoan && (
            <div className="grid gap-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">লোনের তথ্য:</h4>
                <p className="text-sm text-gray-600">মোট লোন: {refundingLoan.amount.toLocaleString()} টাকা</p>
                <p className="text-sm text-gray-600">মাসিক কিস্তি: {refundingLoan.monthlyPayment.toLocaleString()} টাকা</p>
                <p className="text-sm text-gray-600">পরিশোধিত কিস্তি: {refundingLoan.paidInstallments}/{refundingLoan.installments}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="refund-amount" className="text-right">রিফান্ড পরিমাণ</Label>
                <Input
                  id="refund-amount"
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="col-span-3"
                  placeholder="টাকার পরিমাণ"
                />
              </div>
            </div>
          )}
          <Button onClick={handleProcessRefund} className="w-full">
            রিফান্ড প্রক্রিয়া করুন
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanManagement;
