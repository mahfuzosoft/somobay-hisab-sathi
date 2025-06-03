
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, Calendar, TrendingUp, Heart, DollarSign } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "মোট সদস্য",
      value: "১২৫",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      change: "+৫ এই মাসে"
    },
    {
      title: "মোট সঞ্চয়",
      value: "৫,৪৫,০০০ টাকা",
      icon: Coins,
      color: "from-green-500 to-green-600",
      change: "+১২,০০০ এই মাসে"
    },
    {
      title: "চলমান লোন",
      value: "২,৮৫,০০০ টাকা",
      icon: Calendar,
      color: "from-orange-500 to-orange-600",
      change: "১৮টি একটিভ লোন"
    },
    {
      title: "বিনিয়োগের মুনাফা",
      value: "৪৫,০০০ টাকা",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      change: "+৮% বৃদ্ধি"
    },
    {
      title: "সাহায্য প্রদান",
      value: "২৮,০০০ টাকা",
      icon: Heart,
      color: "from-red-500 to-red-600",
      change: "১২টি পরিবারকে"
    },
    {
      title: "নেট ব্যালেন্স",
      value: "৭,২৫,০০০ টাকা",
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
      change: "সুস্থিত অবস্থা"
    }
  ];

  const recentActivities = [
    { type: "সঞ্চয়", member: "রহিম উদ্দিন", amount: "৫,০০০ টাকা", date: "আজ" },
    { type: "লোন", member: "ফাতেমা খাতুন", amount: "২৫,০০০ টাকা", date: "গতকাল" },
    { type: "দান", member: "গরীব পরিবার", amount: "৩,০০০ টাকা", date: "২ দিন আগে" },
    { type: "মুনাফা", member: "বিনিয়োগ", amount: "+৮,০০০ টাকা", date: "৩ দিন আগে" },
    { type: "সঞ্চয়", member: "করিম মিয়া", amount: "৪,০০০ টাকা", date: "৪ দিন আগে" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={
                        activity.type === "সঞ্চয়" ? "default" :
                        activity.type === "লোন" ? "destructive" :
                        activity.type === "দান" ? "secondary" : "outline"
                      }>
                        {activity.type}
                      </Badge>
                      <span className="font-medium text-gray-900">{activity.member}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.date}</p>
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
            <CardTitle className="text-xl">মাসিক পরিসংখ্যান</CardTitle>
            <CardDescription>
              এই মাসের আর্থিক অগ্রগতি
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">সঞ্চয় সংগ্রহ</span>
                <div className="text-right">
                  <p className="font-semibold">৮৫%</p>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">লোন পরিশোধ</span>
                <div className="text-right">
                  <p className="font-semibold">৭২%</p>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">বিনিয়োগ রিটার্ন</span>
                <div className="text-right">
                  <p className="font-semibold">৯২%</p>
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                    <div className="w-22 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
