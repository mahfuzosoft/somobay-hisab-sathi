import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, Calendar, TrendingUp, Heart, DollarSign } from "lucide-react";

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    {
      title: "মোট সঞ্চয়",
      value: "৫,৪৫,০০০ টাকা",
      icon: Coins,
      color: "from-green-500 to-green-600",
      change: "+১২,০০০ এই মাসে",
      clickable: true,
      tab: "savings"
    },
    {
      title: "চলমান লোন",
      value: "২,৮৫,০০০ টাকা",
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
      change: "১৮টি একটিভ লোন",
      clickable: true,
      tab: "loans"
    },
    {
      title: "মোট বিনিয়োগ",
      value: "৪,৫০,০০০ টাকা",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      change: "৩টি সক্রিয় প্রকল্প",
      clickable: true,
      tab: "investments"
    },
    {
      title: "বিনিয়োগের মুনাফা",
      value: "৪৫,০০০ টাকা",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      change: "+৮% বৃদ্ধি",
      clickable: false
    },
    {
      title: "সাহায্য প্রদান",
      value: "২৮,০০০ টাকা",
      icon: Heart,
      color: "from-red-500 to-red-600",
      change: "১২টি পরিবারকে",
      clickable: true,
      tab: "donations"
    },
    {
      title: "নেট ব্যালেন্স",
      value: "৭,২৫,০০০ টাকা",
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
      change: "সুস্থিত অবস্থা",
      clickable: false
    }
  ];

  const recentActivities = [
    { type: "সঞ্চয়", member: "রহিম উদ্দিন", amount: "৫,০০০ টাকা", date: "আজ" },
    { type: "লোন", member: "ফাতেমা খাতুন", amount: "২৫,০০০ টাকা", date: "গতকাল" },
    { type: "দান", member: "গরীব পরিবার", amount: "৩,০০০ টাকা", date: "২ দিন আগে" },
    { type: "মুনাফা", member: "বিনিয়োগ", amount: "+৮,০০০ টাকা", date: "৩ দিন আগে" },
    { type: "সঞ্চয়", member: "করিম মিয়া", amount: "৪,০০০ টাকা", date: "৪ দিন আগে" }
  ];

  // সদস্য অনুযায়ী সঞ্চয়ের ডেটা
  const memberSavings = [
    { memberName: "রহিম উদ্দিন", totalSavings: 45000, currentLoan: 12000 },
    { memberName: "ফাতেমা খাতুন", totalSavings: 38000, currentLoan: 8000 },
    { memberName: "করিম মিয়া", totalSavings: 42000, currentLoan: 0 },
    { memberName: "সালমা খাতুন", totalSavings: 35000, currentLoan: 5000 },
    { memberName: "আব্দুল করিম", totalSavings: 40000, currentLoan: 3000 }
  ];

  const handleCardClick = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                stat.clickable ? 'cursor-pointer hover:scale-105' : ''
              }`}
              onClick={() => stat.clickable && stat.tab && handleCardClick(stat.tab)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">সাম্প্রতিক কার্যক্রম</CardTitle>
            <CardDescription>
              সর্বশেষ আর্থিক লেনদেনের তালিকা
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="font-medium text-gray-900">{activity.member}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        activity.type === "সঞ্চয়" ? "default" :
                        activity.type === "লোন" ? "destructive" :
                        activity.type === "দান" ? "secondary" : "outline"
                      }>
                        {activity.type}
                      </Badge>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm text-gray-600">{activity.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">সদস্য সঞ্চয় ও লোন</CardTitle>
            <CardDescription>
              প্রতিটি সদস্যের মোট সঞ্চয়ের পরিমাণ ও চলমান লোন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberSavings.map((member, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{member.memberName}</p>
                  </div>
                  <div className="flex flex-row items-center gap-6">
                    <p className="font-semibold text-green-600">{member.totalSavings.toLocaleString()} টাকা</p>
                    <p className="font-semibold text-orange-600">
                      {member.currentLoan > 0 ? ` ${member.currentLoan.toLocaleString()} টাকা` : "লোন নেই"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
