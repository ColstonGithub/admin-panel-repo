// export const ExploreCategoryChildrenTableConfig = (type) => [
//   {
//     headername: "S.NO.",
//     field: "S.NO.",
//     width: "15%",
//   },
//   {
//     headername: "Name",
//     field: "Name",
//     width: "20%",
//   },

//   {
//     headername: "Images",
//     field: "Images",
//     align: "left",
//     width: "15%",
//     renderColumn: (row) => {
//       return type === "homePageBannerString" ? (
//         <>
//           <img
//             src={row?.Images?.[0]?.img}
//             alt="img"
//             width="50px"
//             height="40px"
//             className="img-responsive img-fluid "
//             loading="lazy"
//           />
//         </>
//       ) : (
//         <>
//           <img
//             src={row?.Images}
//             alt="img"
//             width="50px"
//             height="40px"
//             className="img-responsive img-fluid "
//             loading="lazy"
//           />
//         </>
//       );
//     },
//   },
//   {
//     headername: "Keyword",
//     field: "Keyword",
//     align: "left",
//     width: "17%",
//   },

//   {
//     headername: "Actions",
//     field: "Actions",
//     align: "left",
//     width: "28%",
//   },
// ];
