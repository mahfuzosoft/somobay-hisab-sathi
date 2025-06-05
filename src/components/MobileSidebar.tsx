
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Coins, 
  Calendar, 
  TrendingUp, 
  Heart, 
  FileText,
  BarChart3,
  Home,
  Settings,
  Menu 
} from "lucide-react";

interface MobileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileSidebar = ({ activeTab, setActiveTab }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "ড্যাশবোর্ড", icon: Home },
    { id: "members", label: "সদস্য ব্যবস্থাপনা", icon: Users },
    { id: "savings", label: "মাসিক সঞ্চয়", icon: Coins },
    { id: "loans", label: "লোন ব্যবস্থাপনা", icon: Calendar },
    { id: "investments", label: "বিনিয়োগ", icon: TrendingUp },
    { id: "donations", label: "দান ও সাহায্য", icon: Heart },
    { id: "reports", label: "রিপোর্ট", icon: FileText },
    { id: "users", label: "ইউজার ব্যবস্থাপনা", icon: Settings },
  ];

  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="h-full bg-background">
          <Card className="m-4 mb-6">
            <div className="p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-bold text-lg">সমবায় সমিতি</h2>
              <p className="text-sm text-muted-foreground">একাউন্টিং সিস্টেম</p>
            </div>
          </Card>

          <nav className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-12 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : "text-foreground hover:bg-accent"
                  }`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
