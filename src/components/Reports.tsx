
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, BarChart3 } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "মাসিক আর্থিক প্রতিবেদন",
      description: "জুন ২০২৪ এর সম্পূর্ণ আর্থিক কার্যক্রমের রিপোর্ট",
      date: "২০২৪-০৬-৩০",
      type: "মাসিক",
      status: "তৈরি"
    },
    {
      title: "সদস্য সঞ্চয় রিপোর্ট",
      description: "সকল সদস্যের সঞ্চয়ের বিস্তারিত তালিকা",
      date: "২০২৪-০৬-৩০",
      type: "সঞ্চয়",
      status: "তৈরি"
    },
    {
      title: "লোন পরিশোধ রিপোর্ট",
      description: "চলমান ও সম্পন্ন লোনের বিস্তারিত হিসাব",
      date: "২০২৪-০৬-৩০",
      type: "লোন",
      status: "তৈরি"
    },
    {
      title: "বিনিয়োগ মুনাফা রিপোর্ট",
      description: "সকল বিনিয়োগের লাভ-ক্ষতির হিসাব",
      date: "২০২৪-০৬-৩০",
      type: "বিনিয়োগ",
      status: "তৈরি"
    },
    {
      title: "দান ও সাহায্য রিপোর্ট",
      description: "প্রদানকৃত সকল সাহায্যের তালিকা",
      date: "২০২৪-০৬-৩০",
      type: "দান",
      status: "তৈরি"
    },
    {
      title: "বার্ষিক ব্যালেন্স শীট",
      description: "২০২৪ সালের সম্পূর্ণ আর্থিক অবস্থান",
      date: "২০২৪-১২-৩১",
      type: "বার্ষিক",
      status: "প্রস্তুতকরণে"
    }
  ];

  const quickStats = [
    { label: "মোট সদস্য", value: "১২৫", change: "+৫%" },
    { label: "মোট সঞ্চয়", value: "৫,৪৫,০০০ টাকা", change: "+৮%" },
    { label: "চলমান লোন", value: "২,৮৫,০০০ টাকা", change: "-৩%" },
    { label: "বিনিয়োগ মুনাফা", value: "৪৫,০০০ টাকা", change: "+১২%" },
    { label: "সাহায্য প্রদান", value: "২৮,০০০ টাকা", change: "+২%" },
    { label: "নেট ব্যালেন্স", value: "৭,২৫,০০০ টাকা", change: "+৬%" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">রিপোর্ট ও বিশ্লেষণ</h2>
          <p className="text-gray-600 mt-1">আর্থিক প্রতিবেদন ও পরিসংখ্যান</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
          <Download className="w-4 h-4 mr-2" />
          সব রিপোর্ট ডাউনলোড
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            দ্রুত পরিসংখ্যান
          </CardTitle>
          <CardDescription>
            সমিতির বর্তমান আর্থিক অবস্থার সারসংক্ষেপ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-colors">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">{stat.value}</p>
                <Badge variant="outline" className={
                  stat.change.startsWith('+') ? 'text-green-600 border-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600 border-red-600' : 
                  'text-blue-600 border-blue-600'
                }>
                  {stat.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            উপলব্ধ রিপোর্ট
          </CardTitle>
          <CardDescription>
            বিভিন্ন ধরনের আর্থিক প্রতিবেদন তৈরি ও ডাউনলোড করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{report.title}</h3>
                    <Badge variant={report.status === "তৈরি" ? "default" : "outline"}>
                      {report.status}
                    </Badge>
                    <Badge variant="secondary">
                      {report.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={report.status !== "তৈরি"}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled={report.status !== "তৈরি"}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>মাসিক প্রবণতা</CardTitle>
            <CardDescription>
              গত ৬ মাসের আর্থিক কার্যক্রমের ট্রেন্ড
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>সঞ্চয় সংগ্রহ</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">৮৫%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>লোন পরিশোধ</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">৭২%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>বিনিয়োগ রিটার্ন</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-22 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">৯২%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>আগামী মাসের লক্ষ্য</CardTitle>
            <CardDescription>
              জুলাই ২০২৪ এর জন্য নির্ধারিত লক্ষ্যসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                <span className="font-medium">সঞ্চয় সংগ্রহ</span>
                <span className="text-green-600 font-bold">৬০,০০০ টাকা</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                <span className="font-medium">নতুন বিনিয়োগ</span>
                <span className="text-blue-600 font-bold">১,০০,০০০ টাকা</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50">
                <span className="font-medium">লোন বিতরণ</span>
                <span className="text-orange-600 font-bold">৮০,০০০ টাকা</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                <span className="font-medium">সাহায্য প্রদান</span>
                <span className="text-red-600 font-bold">৩০,০০০ টাকা</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
