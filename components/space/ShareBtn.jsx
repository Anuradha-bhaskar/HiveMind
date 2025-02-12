"use client"
import React from 'react'
import toast from 'react-hot-toast';
import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
function ShareBtn() {
    const handleShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    }
  return (
      <Button variant="secondary" className="gap-2" onClick={(e)=>handleShare(e)}>
          <Share2 className="w-4 h-4" />
          Share
      </Button>
  )
}

export default ShareBtn
