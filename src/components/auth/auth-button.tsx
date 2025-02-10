'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
}

export function AuthButton({ icon, text, className, ...props }: AuthButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full bg-background hover:bg-background/90 text-foreground",
        className
      )}
      {...props}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  );
}