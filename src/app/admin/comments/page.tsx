"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Opinion } from "@/types";
import formatDateString from "@/utils/formatDateString";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomSession } from "../../api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";

interface OldData {
  opinions: Opinion[];
  totalPages: number;
  currentPage: number;
  totalOpinions: number;
}

const Comments = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: session } = useSession();
  if (!session || (session as CustomSession)?.role !== "ADMIN") {
    router.push("/login");
  }

  const name = session?.user?.name;
  const email = session?.user?.email;

  const fetchOpinions = async ({ page = 1, limit = 10 }) => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await fetch(`/api/opinions?${query.toString()}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const handleAprove = async (id: string) => {
    try {
      queryClient.cancelQueries({
        queryKey: ["opinions", page, limit],
      });

      queryClient.setQueryData(
        ["opinions", page, limit],
        (oldData?: OldData) => {
          if (!oldData) {
            return undefined;
          }
          return {
            ...oldData,
            opinions: oldData.opinions.filter((opinion) => opinion._id !== id),
          };
        }
      );

      const response = await fetch(`/api/opinions?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["opinions", page, limit],
    queryFn: () => fetchOpinions({ page, limit }),
    // keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <p className="mb-6 p-4">
        Logueado como {name} ({email})
      </p>

      <div>
        {data && (
          <div>
            <div>
              <div>
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Nombre</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Prompt</th>
                      <th className="px-4 py-2 text-left">Fecha</th>
                      <th className="px-4 py-2 text-left">Comentario</th>
                      <th className="px-4 py-2 text-left">Archivos</th>
                      <th className="px-4 py-2 text-left">Aprobar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.opinions.map((e: Opinion) => (
                      <tr
                        key={e._id}
                        className="border-b"
                      >
                        <td className="px-4 py-2">{e.name}</td>
                        <td className="px-4 py-2">{e.email}</td>
                        <td className="px-4 py-2">{e.promptName}</td>
                        <td className="px-4 py-2">
                          {formatDateString(e.createdAt)}
                        </td>
                        <td className="px-4 py-2">{e.comment}</td>
                        <td className="px-4 py-2">
                          <div>
                            {e.files.map((file, idx) => {
                              const type = file.includes("video")
                                ? "VIDEO"
                                : "IMAGEN";

                              return (
                                <div key={`file_${e._id}_${idx}`}>
                                  <Link
                                    className="text-blue-400 hover:text-blue-600"
                                    href={file}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {type}
                                  </Link>
                                </div>
                              );
                            })}
                            {e.audio && (
                              <div key={`audio_${e._id}`}>
                                <Link
                                  className="text-blue-400 hover:text-blue-600"
                                  href={e.audio}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  AUDIO
                                </Link>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            className="shadow-md rounded-md py-2 px-4 font-semibold text-green-400"
                            onClick={() => {
                              handleAprove(e._id);
                            }}
                          >
                            ✔
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2 justify-center my-2">
                <button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="shadow-md rounded-md py-2 px-4 text-white bg-blue-400 font-semibold"
                >
                  &lt;
                </button>
                <button
                  onClick={() => setPage((old) => old + 1)}
                  disabled={!data || data.opinions.length < limit}
                  className="shadow-md rounded-md py-2 px-4 text-white bg-blue-400 font-semibold"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
