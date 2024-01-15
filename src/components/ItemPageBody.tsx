"use client";
import React, { useState } from "react";
import ItemPageButtons from "./ItemPageButtons";
import CurrentTabContent from "./CurrentTabContent";
import { Tabs } from "@/types";

const ItemPageBody = ({
  visible,
  phone,
  tags,
  name,
  slug,
  itemId,
}: {
  visible?: boolean;
  phone: string;
  tags: string[];
  name: string;
  slug: string;
  itemId: string;
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
        phone={phone}
        tags={tags}
        name={name}
      />
    </div>
  );
};

export default ItemPageBody;
