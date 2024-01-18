import React from "react";
import ItemPageOpinionsTab from "./ItemPageOpinionsTab";
import ItemPageInfoTab from "./ItemPageInfoTab";
import ItemPageOpinionsInput from "./ItemPageOpinionsInput";
// import Ad from "./Ad";

const CurrentTabContent = ({
  currentTab,
  visible,
  prompt,
  tags,
  name,
  slug,
  itemId,
  rank,
  votes,
}: {
  currentTab: string;
  visible?: boolean;
  prompt: string;
  tags: string[];
  name: string;
  slug: string;
  itemId: string;
  rank: number;
  votes: number;
}) => {
  return (
    <div>
      <div className={`${currentTab !== "informacion" ? "hidden" : "block"}`}>
        <ItemPageInfoTab
          visible={visible}
          prompt={prompt}
          tags={tags}
          name={name}
          slug={slug}
          rank={rank}
          votes={votes}
        />
        {/* <div className="mx-4 mb-4 overflow-hidden hidden">
          <Ad />
        </div> */}
      </div>
      <div className={`${currentTab !== "opiniones" ? "hidden" : "block"}`}>
        <ItemPageOpinionsTab itemId={itemId} />
        <ItemPageOpinionsInput
          name={name}
          itemId={itemId}
        />
      </div>
    </div>
  );
};

export default CurrentTabContent;
