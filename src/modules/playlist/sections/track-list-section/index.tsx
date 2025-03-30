// "use client";

// import type { Row } from "@tanstack/react-table";
// import React, { useEffect, useMemo, useRef } from "react";
// import {
//   keepPreviousData,
//   useSuspenseInfiniteQuery,
// } from "@tanstack/react-query";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useVirtualizer } from "@tanstack/react-virtual";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/shared/components/ui/table";
// import { useTRPC } from "~/shared/lib/trpc/client";
// import { cn } from "~/shared/lib/utils";
// import { usePlaylistView } from "../../context/playlist-view-context";
// import { playlistTracksDataTableColumns } from "../../ui/playlist-tracks-data-table-columns";

// export function TrackListSection() {
//   const trpc = useTRPC();
//   const { playlistId, scrollRef, isScrollInitialized } = usePlaylistView();

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useSuspenseInfiniteQuery(
//       trpc.playlist.getTracks.infiniteQueryOptions(
//         {
//           playlistId,
//           limit: 50,
//         },
//         {
//           getNextPageParam: (lastPage) => lastPage.nextCursor,
//           placeholderData: keepPreviousData,
//         },
//       ),
//     );

//   const flatData = useMemo(
//     () => data.pages.flatMap((page) => page.items),
//     [data],
//   );

//   const table = useReactTable({
//     data: flatData,
//     columns: playlistTracksDataTableColumns,
//     getCoreRowModel: getCoreRowModel(),
//     debugTable: true,
//   });

//   const { rows } = table.getRowModel();

//   const rowVirtualizer = useVirtualizer({
//     count: rows.length,
//     getScrollElement: () => scrollRef.current,
//     enabled: isScrollInitialized,
//     estimateSize: () => 34,
//     measureElement:
//       typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
//         ? (element) => element.getBoundingClientRect().height
//         : undefined,
//     overscan: 5,
//   });

//   const bottomMarkerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
//         fetchNextPage().catch(console.error);
//       }
//     });

//     if (bottomMarkerRef.current) {
//       observer.observe(bottomMarkerRef.current);
//     }

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   return (
//     <div className="relative">
//       <table style={{ display: "grid" }}>
//         <thead
//           style={{
//             display: "grid",
//             position: "sticky",
//             top: 0,
//             zIndex: 1,
//           }}
//         >
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th
//                     key={header.id}
//                     style={{
//                       display: "flex",
//                       width: header.getSize(),
//                     }}
//                   >
//                     <div
//                       {...{
//                         className: header.column.getCanSort()
//                           ? "cursor-pointer select-none"
//                           : "",
//                         onClick: header.column.getToggleSortingHandler(),
//                       }}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext(),
//                       )}
//                       {{
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted() as string] ?? null}
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody
//           style={{
//             display: "grid",
//             height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
//             position: "relative", //needed for absolute positioning of rows
//           }}
//         >
//           {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//             const row = rows[virtualRow.index];
//             return (
//               <tr
//                 data-index={virtualRow.index} //needed for dynamic row height measurement
//                 ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
//                 key={row.id}
//                 style={{
//                   display: "flex",
//                   position: "absolute",
//                   transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
//                   width: "100%",
//                 }}
//               >
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <td
//                       key={cell.id}
//                       style={{
//                         display: "flex",
//                         width: cell.column.getSize(),
//                       }}
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div ref={bottomMarkerRef} className="h-px w-full" />
//     </div>
//   );
// }
