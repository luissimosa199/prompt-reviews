import React from "react";
import ItemPageOpinionsTab from "./ItemPageOpinionsTab";
import ItemPageInfoTab from "./ItemPageInfoTab";
import ItemPageOpinionsInput from "./ItemPageOpinionsInput";
// import Ad from "./Ad";

const CurrentTabContent = ({
  currentTab,
  visible,
  phone,
  tags,
  name,
  slug,
  itemId,
}: {
  currentTab: string;
  visible?: boolean;
  phone: string;
  tags: string[];
  name: string;
  slug: string;
  itemId: string;
}) => {
  return (
    <div>
      <div className={`${currentTab !== "informacion" ? "hidden" : "block"}`}>
        <ItemPageInfoTab
          visible={visible}
          phone={phone}
          tags={tags}
          name={name}
          slug={slug}
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
