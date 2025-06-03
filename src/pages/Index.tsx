
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, Calendar, TrendingUp, Heart, FileText, Settings } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MemberManagement from "@/components/MemberManagement";
import SavingsManagement from "@/components/SavingsManagement";
import LoanManagement from "@/components/LoanManagement";
import InvestmentManagement from "@/components/InvestmentManagement";
import DonationManagement from "@/components/DonationManagement";
import Reports from "@/components/Reports";
import UserManagement from "@/components/UserManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                সমবায় সমিতির একাউন্টিং সফটওয়্যার
              </h1>
              <p className="text-lg text-gray-600">
                আধুনিক ও নিরাপদ আর্থিক ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
