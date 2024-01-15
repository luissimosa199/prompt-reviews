"use client";
import React, { useState } from "react";
import ItemPageButtons from "./ItemPageButtons";
import CurrentTabContent from "./CurrentTabContent";
import { Tabs } from "@/types";

const ItemPageBody = ({
  visible,
  prompt,
  tags,
  name,
  slug,
  itemId,
  rank,
}: {
  visible?: boolean;
  prompt: string;
  tags: string[];
  name: string;
  slug: string;
  itemId: string;
  rank: number;
}) => {
  const [currentTab, setCurrentTab] = useState<Tabs>("informacion");

  return (
    <div className="bg-white">
      <div className="shadow-md">
        <ItemPageButtons
          slug={slug}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>

      <CurrentTabContent
        itemId={itemId}
        slug={slug}
        visible={visible}
        currentTab={currentTab}
        prompt={prompt}
        tags={tags}
        name={name}
        rank={rank}
      />
    </div>
  );
};

export default ItemPageBody;
