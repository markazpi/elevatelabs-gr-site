import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  quote: string;
  client: string;
  metric: string;
  metricLabel?: string;
  results: string[];
}