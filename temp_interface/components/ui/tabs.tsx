"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex w-full",
        orientation === "horizontal" ? "flex-col gap-4" : "flex-row gap-4",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center",
  {
    variants: {
      variant: {
        default: "rounded-md bg-muted/50 p-1 text-muted-foreground w-fit",
        line: "w-full justify-start gap-4 border-b border-border bg-transparent p-0 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors outline-none cursor-pointer",
        "text-muted-foreground hover:text-foreground focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        // Default pill variant
        "group-data-[variant=default]/tabs-list:rounded group-data-[variant=default]/tabs-list:data-active:bg-card group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-2xs",
        // Line variant: border-b-2 with accent #F6B17A
        "group-data-[variant=line]/tabs-list:pb-2.5 group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:-mb-px",
        "group-data-[variant=line]/tabs-list:data-active:border-accent group-data-[variant=line]/tabs-list:data-active:text-foreground group-data-[variant=line]/tabs-list:data-active:font-semibold",
        "group-data-[variant=line]/tabs-list:data-[selected]:border-accent group-data-[variant=line]/tabs-list:data-[selected]:text-foreground group-data-[variant=line]/tabs-list:data-[selected]:font-semibold",
        "group-data-[variant=line]/tabs-list:aria-selected:border-accent group-data-[variant=line]/tabs-list:aria-selected:text-foreground group-data-[variant=line]/tabs-list:aria-selected:font-semibold",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("w-full flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
