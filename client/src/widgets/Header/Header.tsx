"use client";

import { Button } from "@shared/ui/shadcn/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Explore", variant: "ghost" as const },
  { label: "MyVideo", variant: "ghost" as const },
  { label: "Signup", href: "/signup", variant: "default" as const },
  { label: "Login", href: "/login", variant: "ghost" as const },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center h-[50px] justify-between px-4 relative">
      <div className="flex items-center w-[133px] h-10 gap-4">
        <Link href="/" aria-label="LearnHub 홈으로">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M35.7 18.2031C35.9984 18.0715 36.2516 17.8552 36.4282 17.5811C36.6049 17.307 36.6973 16.9871 36.6939 16.661C36.6905 16.3349 36.5916 16.017 36.4093 15.7466C36.227 15.4762 35.9694 15.2652 35.6684 15.1398L21.3834 8.63311C20.9491 8.43503 20.4773 8.33252 20 8.33252C19.5227 8.33252 19.051 8.43503 18.6167 8.63311L4.33336 15.1331C4.03664 15.2631 3.78422 15.4767 3.60697 15.7478C3.42972 16.0189 3.33533 16.3359 3.33533 16.6598C3.33533 16.9837 3.42972 17.3006 3.60697 17.5718C3.78422 17.8429 4.03664 18.0565 4.33336 18.1864L18.6167 24.6998C19.051 24.8979 19.5227 25.0004 20 25.0004C20.4773 25.0004 20.9491 24.8979 21.3834 24.6998L35.7 18.2031Z"
              stroke="#9810FA"
              strokeWidth="3.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.6666 16.6665V26.6665"
              stroke="#9810FA"
              strokeWidth="3.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 20.8335V26.6668C10 27.9929 11.0536 29.2647 12.9289 30.2024C14.8043 31.14 17.3478 31.6668 20 31.6668C22.6522 31.6668 25.1957 31.14 27.0711 30.2024C28.9464 29.2647 30 27.9929 30 26.6668V20.8335"
              stroke="#9810FA"
              strokeWidth="3.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h2 className="text-[#9810FA] leading-10 font-bold">LearnHub</h2>
      </div>

      {/* Desktop Menu */}
      <nav className="w-[424px] h-10 items-center justify-evenly hidden md:flex">
        {NAV_ITEMS.map((item) =>
          item.href ? (
            <Button key={item.label} variant={item.variant} asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ) : (
            <Button key={item.label} variant={item.variant}>
              {item.label}
            </Button>
          ),
        )}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden"
        aria-label="MenuToggle"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Mobile Menu Overlay & Drawer */}
      <>
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <nav
          className={`fixed left-0 top-0 h-full w-[70%] max-w-[300px] bg-white shadow-2xl z-50 md:hidden flex flex-col p-4 gap-4 transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex w-[133px] h-10 items-center gap-4">
              <Link href="/" aria-label="LearnHub 홈으로">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    d="M35.7 18.2031C35.9984 18.0715 36.2516 17.8552 36.4282 17.5811C36.6049 17.307 36.6973 16.9871 36.6939 16.661C36.6905 16.3349 36.5916 16.017 36.4093 15.7466C36.227 15.4762 35.9694 15.2652 35.6684 15.1398L21.3834 8.63311C20.9491 8.43503 20.4773 8.33252 20 8.33252C19.5227 8.33252 19.051 8.43503 18.6167 8.63311L4.33336 15.1331C4.03664 15.2631 3.78422 15.4767 3.60697 15.7478C3.42972 16.0189 3.33533 16.3359 3.33533 16.6598C3.33533 16.9837 3.42972 17.3006 3.60697 17.5718C3.78422 17.8429 4.03664 18.0565 4.33336 18.1864L18.6167 24.6998C19.051 24.8979 19.5227 25.0004 20 25.0004C20.4773 25.0004 20.9491 24.8979 21.3834 24.6998L35.7 18.2031Z"
                    stroke="#9810FA"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36.6666 16.6665V26.6665"
                    stroke="#9810FA"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 20.8335V26.6668C10 27.9929 11.0536 29.2647 12.9289 30.2024C14.8043 31.14 17.3478 31.6668 20 31.6668C22.6522 31.6668 25.1957 31.14 27.0711 30.2024C28.9464 29.2647 30 27.9929 30 26.6668V20.8335"
                    stroke="#9810FA"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <h1 className="text-[#9810FA] leading-10 font-bold">LearnHub</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </Button>
          </div>
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Button
                key={item.label}
                variant={item.variant}
                asChild
                className="w-full h-12 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ) : (
              <Button
                key={item.label}
                variant={item.variant}
                className="w-full h-12 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Button>
            ),
          )}
        </nav>
      </>
    </header>
  );
}
