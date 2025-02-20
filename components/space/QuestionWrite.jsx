"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const QuestionWrite = () => {
    const [question, setQuestion] = useState('');

    return (
        <div className="w-full p-4 rounded-lg shadow-sm border border-gray-100 bg-gray-50 transition-all">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer">
                                <Input
                                    type="text"
                                    placeholder="Write your question here..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full rounded-full bg-white border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
                                    readOnly
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Ask your question</DialogTitle>
                                <DialogDescription>
                                    Write your question in detail. Be specific to get better answers.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input
                                    type="text"
                                    placeholder="Write your question here..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <Avatar className="h-10 w-10 transition-transform hover:scale-105">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default QuestionWrite;