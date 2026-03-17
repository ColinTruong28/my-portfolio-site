// src/components/reusable-tabs.tsx
import Tabs from "./ui/tabs";
import React from 'react';

export interface TabItem {
  id: number | string;
  name: string;
  content: React.ReactNode; // ReactNode allows for text, HTML, or other Components
}

interface ReusableTabsProps {
  items: TabItem[];
}

export default function ReusableTabs({ items }: ReusableTabsProps) {
  return <Tabs items={items} />;
}