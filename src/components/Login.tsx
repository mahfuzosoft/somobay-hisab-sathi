
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LoginProps {
  onLogin: (username: string, role: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ডেমো ইউজার ডেটা
  const users = [
    { username: "admin", password: "admin123", role: "অ্যাডমিন", name: "প্রধান প্রশাসক" },
    { username: "accountant", password: "acc123", role: "অ্যাকাউন্টেন্ট", name: "হিসাবরক্ষক" },
    { username: "user", password: "user123", role: "সাধারণ ইউজার", name: "সাধারণ ব্যবহারকারী" }
  ];

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user.name, user.role);
      setError("");
    } else {
      setError("ভুল ইউজারনেম বা পাসওয়ার্ড");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">সমবায় সমিতি</CardTitle>
          <CardDescription>অ্যাডমিন প্যানেলে প্রবেশ করুন</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">ইউজারনেম</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ইউজারনেম লিখুন"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড লিখুন"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <Button 
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            লগইন করুন
          </Button>
          
          <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
            <p className="font-semibold mb-2">ডেমো লগইন তথ্য:</p>
            <p>অ্যাডমিন: admin / admin123</p>
            <p>অ্যাকাউন্টেন্ট: accountant / acc123</p>
            <p>সাধারণ ইউজার: user / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
