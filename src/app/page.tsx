import ItemCard from "@/components/ItemCard";
import { dataSample } from "@/data/prompts";
import React from "react";

export default function Home() {
  return (
    <main className="">
      <div className={`bg-zinc-50 md:p-8`}>
        <div className="w-full mb-4 max-w-4xl mx-auto">
          <div className=""></div>

          {/* <input
            type="text"
            placeholder="Buscar por nombre..."
            className="p-2 mt-4 w-full border rounded"
            value={"nameFilter"}
            onChange={(e) => console.log(e.target.value)}
          /> */}
        </div>

        <ul className="flex flex-wrap gap-4 justify-around w-full mt-4 px-24">
          {dataSample.map((e) => (
            <ItemCard
            slug={e.slug}
              key={e.id}
              name={e.name}
              tags={e.tags}
              image={e.image}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
