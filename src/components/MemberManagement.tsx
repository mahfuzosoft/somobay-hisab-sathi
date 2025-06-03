
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Edit, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<any>(null);
  const [viewingMember, setViewingMember] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "রহিম উদ্দিন",
      phone: "০১৭১২৩৪৫৬৭২",
      nid: "১২৩৪৫৬৭৮৯০১২ৃ",
      address: "ঢাকা, বাংলাদেশ",
      balance: 45000,
      joinDate: "২০২৩-০১-১৫",
      status: "সক্রিয়"
    },
    {
      id: 2,
      name: "ফাতেমা খাতুন",
      phone: "০১৮১২৩৪৫৬৭৩",
      nid: "২৩৪৫৬৭৮৯০১২৩৪",
      address: "চট্টগ্রাম, বাংলাদেশ",
      balance: 32000,
      joinDate: "২০২৩-০২-২০",
      status: "সক্রিয়"
    },
    {
      id: 3,
      name: "করিম মিয়া",
      phone: "০১৯১২৩৪৫৬৭৪",
      nid: "৩৪৫৬৭৮৯০১২৩৪৫",
      address: "সিলেট, বাংলাদেশ",
      balance: 28000,
      joinDate: "২০২৩-০৩-১০",
      status: "সক্রিয়"
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    phone: "",
    nid: "",
    address: "",
    openingBalance: ""
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.phone && newMember.nid) {
      const member = {
        id: members.length + 1,
        name: newMember.name,
        phone: newMember.phone,
        nid: newMember.nid,
        address: newMember.address,
        balance: parseInt(newMember.openingBalance) || 0,
        joinDate: new Date().toLocaleDateString('bn-BD'),
        status: "সক্রিয়"
      };
      setMembers([...members, member]);
      setNewMember({ name: "", phone: "", nid: "", address: "", openingBalance: "" });
    }
  };

  const handleEditMember = (member: any) => {
    setEditingMember({ ...member });
    setIsEditDialogOpen(true);
  };

  const handleViewMember = (member: any) => {
    setViewingMember(member);
    setIsViewDialogOpen(true);
  };

  const handleUpdateMember = () => {
    if (editingMember) {
      setMembers(members.map(m => 
        m.id === editingMember.id ? editingMember : m
      ));
      setIsEditDialogOpen(false);
      setEditingMember(null);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">সদস্য ব্যবস্থাপনা</h2>
          <p className="text-gray-600 mt-1">সমিতির সদস্যদের তথ্য ও হিসাব</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              নতুন সদস্য যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>নতুন সদস্য নিবন্ধন</DialogTitle>
              <DialogDescription>
                নতুন সদস্যের সকল তথ্য সঠিকভাবে পূরণ করুন
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  নাম
                </Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="col-span-3"
                  placeholder="সদস্যের নাম"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  ফোন
                </Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="col-span-3"
                  placeholder="০১xxxxxxxxx"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nid" className="text-right">
                  জাতীয় পরিচয়পত্র
                </Label>
                <Input
                  id="nid"
                  value={newMember.nid}
                  onChange={(e) => setNewMember({...newMember, nid: e.target.value})}
                  className="col-span-3"
                  placeholder="১৩ সংখ্যার এনআইডি"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  ঠিকানা
                </Label>
                <Input
                  id="address"
                  value={newMember.address}
                  onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                  className="col-span-3"
                  placeholder="সম্পূর্ণ ঠিকানা"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  প্রাথমিক জমা
                </Label>
                <Input
                  id="balance"
                  type="number"
                  value={newMember.openingBalance}
                  onChange={(e) => setNewMember({...newMember, openingBalance: e.target.value})}
                  className="col-span-3"
                  placeholder="০"
                />
              </div>
            </div>
            <Button onClick={handleAddMember} className="w-full">
              সদস্য নিবন্ধন করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                সদস্য তালিকা
              </CardTitle>
              <CardDescription>
                মোট {members.length} জন সদস্য নিবন্ধিত
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {member.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">ফোন:</span> {member.phone}</p>
                    <p><span className="font-medium">যোগদান:</span> {member.joinDate}</p>
                    <p><span className="font-medium">ঠিকানা:</span> {member.address}</p>
                    <p><span className="font-medium">ব্যালেন্স:</span> {member.balance.toLocaleString()} টাকা</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewMember(member)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>সদস্যের প্রোফাইল</DialogTitle>
            <DialogDescription>
              {viewingMember?.name} এর বিস্তারিত তথ্য
            </DialogDescription>
          </DialogHeader>
          {viewingMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">নাম</Label>
                  <p className="text-lg font-semibold">{viewingMember.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">ফোন নম্বর</Label>
                  <p className="text-lg">{viewingMember.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">জাতীয় পরিচয়পত্র</Label>
                  <p className="text-lg">{viewingMember.nid}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">যোগদানের তারিখ</Label>
                  <p className="text-lg">{viewingMember.joinDate}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-sm font-medium text-gray-500">ঠিকানা</Label>
                  <p className="text-lg">{viewingMember.address}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">বর্তমান ব্যালেন্স</Label>
                  <p className="text-2xl font-bold text-green-600">{viewingMember.balance.toLocaleString()} টাকা</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">স্ট্যাটাস</Label>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {viewingMember.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>সদস্যের তথ্য আপডেট করুন</DialogTitle>
            <DialogDescription>
              সদস্যের তথ্য পরিবর্তন করুন
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">নাম</Label>
                <Input
                  id="edit-name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">ফোন</Label>
                <Input
                  id="edit-phone"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">ঠিকানা</Label>
                <Input
                  id="edit-address"
                  value={editingMember.address}
                  onChange={(e) => setEditingMember({...editingMember, address: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-balance" className="text-right">ব্যালেন্স</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={editingMember.balance}
                  onChange={(e) => setEditingMember({...editingMember, balance: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <Button onClick={handleUpdateMember} className="w-full">
            তথ্য আপডেট করুন
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberManagement;
