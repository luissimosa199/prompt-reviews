import React from "react";
// import DoctorPageOpinionsTab from "./DoctorPageOpinionsTab";
// import DoctorPageInfoTab from "./DoctorPageInfoTab";
// import DoctorPageOpinionsInput from "./DoctorPageOpinionsInput";

const CurrentTabContent = ({
  currentTab,
  visiblePhone,
  phone,
  hours,
  address,
  slug,
  username,
  doctorName,
  doctorId,
}: {
  currentTab: string;
  visiblePhone?: boolean;
  phone: string;
  hours: string;
  address: string;
  slug: string;
  username: string;
  doctorName: string;
  doctorId: string;
}) => {
  return (
    <div>
      <div className={`${currentTab !== "informacion" ? "hidden" : "block"}`}>
        {/* <DoctorPageInfoTab
          username={username}
          visiblePhone={visiblePhone}
          phone={phone}
          hours={hours}
          address={address}
          slug={slug}
        /> */}
        {/* <div className="mx-4 mb-4 overflow-hidden hidden">
          <Ad />
        </div> */}
      </div>
      <div className={`${currentTab !== "opiniones" ? "hidden" : "block"}`}>
        {/* <DoctorPageOpinionsTab doctorId={doctorId} />
        <DoctorPageOpinionsInput
          doctorName={doctorName}
          doctorId={doctorId}
        /> */}
      </div>
    </div>
  );
};

export default CurrentTabContent;
