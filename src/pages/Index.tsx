
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import Dashboard from "@/components/Dashboard";
import MemberManagement from "@/components/MemberManagement";
import SavingsManagement from "@/components/SavingsManagement";
import LoanManagement from "@/components/LoanManagement";
import InvestmentManagement from "@/components/InvestmentManagement";
import DonationManagement from "@/components/DonationManagement";
import Reports from "@/components/Reports";
import UserManagement from "@/components/UserManagement";
import Login from "@/components/Login";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", role: "" });

  const handleLogin = (name: string, role: string) => {
    setCurrentUser({ name, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "", role: "" });
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "members":
        return <MemberManagement />;
      case "savings":
        return <SavingsManagement />;
      case "loans":
        return <LoanManagement />;
      case "investments":
        return <InvestmentManagement />;
      case "donations":
        return <DonationManagement />;
      case "reports":
        return <Reports />;
      case "users":
        return <UserManagement />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b bg-background">
            <MobileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <h1 className="text-lg font-semibold">সমবায় সমিতি</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center p-6 border-b bg-background">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                সমবায় সমিতির একাউন্টিং সফটওয়্যার
              </h1>
              <p className="text-lg text-muted-foreground">
                আধুনিক ও নিরাপদ আর্থিক ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.role}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                লগআউট
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Mobile Title */}
              <div className="md:hidden mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  সমবায় সমিতির একাউন্টিং
                </h2>
                <p className="text-sm text-muted-foreground">
                  আর্থিক ব্যবস্থাপনা সিস্টেম
                </p>
              </div>
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
