
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Edit, Trash2, Shield, Key } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      name: "প্রধান প্রশাসক",
      email: "admin@samabay.com",
      role: "অ্যাডমিন",
      status: "সক্রিয়",
      lastLogin: "আজ",
      permissions: ["সব কিছু"]
    },
    {
      id: 2,
      username: "accountant1",
      name: "হিসাবরক্ষক রহিম",
      email: "rahim@samabay.com",
      role: "অ্যাকাউন্টেন্ট",
      status: "সক্রিয়",
      lastLogin: "গতকাল",
      permissions: ["সঞ্চয়", "লোন", "রিপোর্ট"]
    },
    {
      id: 3,
      username: "user1",
      name: "সাধারণ ইউজার করিম",
      email: "karim@samabay.com",
      role: "সাধারণ ইউজার",
      status: "সক্রিয়",
      lastLogin: "৩ দিন আগে",
      permissions: ["প্রোফাইল দেখা"]
    }
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    permissions: []
  });

  const roles = ["অ্যাডমিন", "অ্যাকাউন্টেন্ট", "সাধারণ ইউজার"];
  const allPermissions = ["সদস্য ব্যবস্থাপনা", "সঞ্চয়", "লোন", "বিনিয়োগ", "দান", "রিপোর্ট", "ইউজার ব্যবস্থাপনা"];

  const handleAddUser = () => {
    if (newUser.username && newUser.name && newUser.email && newUser.role) {
      const user = {
        id: users.length + 1,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "সক্রিয়",
        lastLogin: "কখনো না",
        permissions: newUser.permissions
      };
      setUsers([...users, user]);
      setNewUser({ username: "", name: "", email: "", password: "", role: "", permissions: [] });
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id ? editingUser : u
      ));
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (userId !== 1) { // প্রধান অ্যাডমিন ডিলিট করা যাবে না
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "অ্যাডমিন": return "bg-red-100 text-red-800 border-red-200";
      case "অ্যাকাউন্টেন্ট": return "bg-blue-100 text-blue-800 border-blue-200";
      case "সাধারণ ইউজার": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">ইউজার ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">সিস্টেম ইউজার ও অনুমতি নিয়ন্ত্রণ</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              নতুন ইউজার যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>নতুন ইউজার তৈরি করুন</DialogTitle>
              <DialogDescription>
                নতুন ইউজারের সকল তথ্য ও অনুমতি নির্ধারণ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">ইউজারনেম</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    placeholder="ইউজারনেম"
                  />
                </div>
                <div>
                  <Label htmlFor="name">পূর্ণ নাম</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="পূর্ণ নাম"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">ইমেইল</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="ইমেইল ঠিকানা"
                />
              </div>
              <div>
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="পাসওয়ার্ড"
                />
              </div>
              <div>
                <Label htmlFor="role">ভূমিকা</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="ভূমিকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddUser} className="w-full">
              ইউজার তৈরি করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট ইউজার</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">নিবন্ধিত ইউজার</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">অ্যাডমিন</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === "অ্যাডমিন").length}</div>
            <p className="text-xs text-muted-foreground">প্রশাসক</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">অ্যাকাউন্টেন্ট</CardTitle>
            <Key className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === "অ্যাকাউন্টেন্ট").length}</div>
            <p className="text-xs text-muted-foreground">হিসাবরক্ষক</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সাধারণ ইউজার</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === "সাধারণ ইউজার").length}</div>
            <p className="text-xs text-muted-foreground">সাধারণ ব্যবহারকারী</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                ইউজার তালিকা
              </CardTitle>
              <CardDescription>
                সিস্টেমের সকল ইউজারের তালিকা ও অনুমতি
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="নাম, ইউজারনেম বা ইমেইল দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {user.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">ইউজারনেম:</span> {user.username}</p>
                    <p><span className="font-medium">ইমেইল:</span> {user.email}</p>
                    <p><span className="font-medium">শেষ লগইন:</span> {user.lastLogin}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">অনুমতি:</span> {user.permissions.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {user.id !== 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>ইউজার তথ্য আপডেট করুন</DialogTitle>
            <DialogDescription>
              ইউজারের তথ্য ও অনুমতি পরিবর্তন করুন
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-username">ইউজারনেম</Label>
                  <Input
                    id="edit-username"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-name">পূর্ণ নাম</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-email">ইমেইল</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-role">ভূমিকা</Label>
                <Select value={editingUser.role} onValueChange={(value) => setEditingUser({...editingUser, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <Button onClick={handleUpdateUser} className="w-full">
            তথ্য আপডেট করুন
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
