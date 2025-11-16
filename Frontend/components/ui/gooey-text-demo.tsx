import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Cypher", "Encrypted", "Secure", "Private"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
        textClassName="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      />
    </div>
  );
}