"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import {
  createCache,
  extractStyle,
  StyleProvider,
} from "@ant-design/cssinjs/lib";
import type Entity from "@ant-design/cssinjs/es/Cache";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return (
      <>
        {styles}
        <style
          id="antd"
          dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
        />
      </>
    );
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleProvider cache={cache}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    </StyleProvider>
  );
}
