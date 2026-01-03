import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Episode {
  id: string;
  title: string;
  guest: string;
  duration: string;
  image: string;
  link: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}