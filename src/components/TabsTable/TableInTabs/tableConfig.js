import FMTypography from "components/FMTypography/FMTypography";

export const homePageTableConfig = (
  type,
  ViewParticularUserHandler,
  homepageCategories
) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "17%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "15%",
    renderColumn: (row) => {
      console.log("row ", row);
      return type === "homePageBannerString" ? (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      ) : (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  ...(type === "homePageCategoryString"
    ? [
        {
          headername: "SubCategories",
          field: "SubCategories",
          align: "left",
          width: "20%",
          renderColumn: (row) => {
            return row?.children?.length > 0 ? (
              <FMTypography
                styleData={{
                  fontSize: "12px",
                  marginRight: "1rem",
                  fontFamily: "Inter",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: "bold",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                displayText={"Sub Categories"}
                onClick={() => ViewParticularUserHandler(row?.id)}
              />
            ) : (
              <FMTypography
                styleData={{
                  fontSize: "12px",
                  fontFamily: "Inter",
                  marginRight: "1rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: "bold",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                displayText={"No Sub Categories"}
              />
            );
          },
        },
      ]
    : []),

  {
    headername: "Actions",
    field: "Actions",
    align: "left",
    width: "29%",
  },
];

export const brandProductTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const brandPageTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Text",
    field: "Text",
    width: "20%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];
export const exhibitionPageTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Text",
    field: "Text",
    width: "20%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const corporateProductTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Text",
    field: "Text",
    width: "20%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const corporateBannerTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt={"img"}
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const exhibitionBannerTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const newsPressBannerConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const newsPressProductConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Text",
    field: "Text",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

//
export const virtualTourBannerConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const careCleanConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "13%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "22%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Heading",
    field: "Heading",
    width: "20%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const blogsConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "10%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "22%",
  },
  {
    headername: "Text",
    field: "Text",
    width: "16%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "17%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "36%",
  },
];

export const blogsCategoryConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "10%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "22%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "36%",
  },
];

export const cataloguesConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "13%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "25%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "17%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const brandPageBannerConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "13%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "25%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "17%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const categoryBannerConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "13%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "25%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "17%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const aboutUsConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "20%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const faqCategoryConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "10%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "22%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "36%",
  },
];

export const faqConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "20%",
  },
  {
    headername: "Faq Category",
    field: "FaqCategory",
    width: "20%",
  },
  {
    headername: "Question",
    field: "Question",
    width: "20%",
  },
  {
    headername: "Answer",
    field: "Answer",
    width: "20%",
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const warrantyRegistrationConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },
  {
    headername: "Email",
    field: "Email",
    width: "24%",
  },

  {
    headername: "MobileNo",
    field: "MobileNo",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const quotationSectionConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },
  {
    headername: "Email",
    field: "Email",
    width: "24%",
  },

  {
    headername: "MobileNo",
    field: "MobileNo",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const careerSectionConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },
  {
    headername: "Email",
    field: "Email",
    width: "24%",
  },

  {
    headername: "MobileNo",
    field: "MobileNo",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const contactUsSectionConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },
  {
    headername: "Email",
    field: "Email",
    width: "24%",
  },

  {
    headername: "MobileNo",
    field: "MobileNo",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const homepageExploreCatSectionConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "Title",
    field: "Title",
    width: "20%",
  },
  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "20%",
    renderColumn: (row) => {
      return (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];

export const orientationCenterConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "City",
    field: "City",
    width: "20%",
  },
  {
    headername: "Center Name",
    field: "CenterName",
    width: "20%",
  },
  {
    headername: "Center Address",
    field: "centerAddress",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];
export const whereToBuyConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "16%",
  },
  {
    headername: "City",
    field: "City",
    width: "20%",
  },
  {
    headername: "Center Name",
    field: "CenterName",
    width: "20%",
  },
  {
    headername: "Center Address",
    field: "centerAddress",
    width: "20%",
  },

  {
    headername: "Actions",
    field: "Actions",
    width: "20%",
  },
];
