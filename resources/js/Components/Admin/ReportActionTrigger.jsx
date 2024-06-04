import { Menu, Transition } from "@headlessui/react";
import React, { useState } from "react";
import Icon from "../Common/Icon";

function ReportActionTrigger({ openViewReportModal, report, openReviewReport }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Menu>
      {() => (
        <>
          <Menu.Button>
            <Icon src='menu' className='w-4 h-4' fill='var(--gray)' />
          </Menu.Button>

          <Transition className='relative'>
            <Menu.Items className='bg-white z-[100] min-w-[140px] border shadow-md absolute bottom-0 right-0'>
              <Menu.Item as={'button'} className='p-2 hover:bg-green-300 w-full' onClick={() => openViewReportModal(report)}>
                <span className='flex justify-start items-center'>
                  <Icon src='eyeOpen' className="w-4 h-4" fill="var(--blue)"/>
                  <p className='pl-2'>View Report</p>
                </span>
              </Menu.Item>
              <Menu.Item as={'button'} className='p-2 hover:bg-green-300 w-full' onClick={() => openReviewReport(report)}>
                <span className='flex justify-start items-center'>
                  <Icon src='report' className="w-4 h-4" fill="var(--blue)"/>
                  <p className='pl-2'>Review Report</p>
                </span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default ReportActionTrigger;
