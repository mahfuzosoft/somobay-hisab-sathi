
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Coins, 
  Calendar, 
  TrendingUp, 
  Heart, 
  FileText,
  BarChart3,
  Home 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "ড্যাশবোর্ড", icon: Home },
    { id: "members", label: "সদস্য ব্যবস্থাপনা", icon: Users },
    { id: "savings", label: "মাসিক সঞ্চয়", icon: Coins },
    { id: "loans", label: "লোন ব্যবস্থাপনা", icon: Calendar },
    { id: "investments", label: "বিনিয়োগ", icon: TrendingUp },
    { id: "donations", label: "দান ও সাহায্য", icon: Heart },
    { id: "reports", label: "রিপোর্ট", icon: FileText },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4">
      <Card className="mb-6">
        <div className="p-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-bold text-lg text-gray-900">সমবায় সমিতি</h2>
          <p className="text-sm text-gray-600">একাউন্টিং সিস্টেম</p>
        </div>
      </Card>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start text-left h-12 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
