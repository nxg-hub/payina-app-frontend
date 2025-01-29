import React, { useState } from 'react';
import ProfileSetting from './ProfileSetting';
import PasswordSetting from './PasswordSetting';
import NotificationSetting from './NotificationSetting';
import PinSetting from './PinSetting';

const SettingType = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col md:flex-row w-full mt-5 ">
      <div className="w-[60%] md:w-[40%] lg:w-[30%] h-[250px] space-y-9 pt-2  border-2 border-[#aaa] shadow-sm md:shadow-2xl rounded-md mx-auto">
        <span
          onClick={() => handleActiveTabChange('profile')}
          className={
            activeTab === 'profile'
              ? 'bg-[#D9EDF8] flex w-[90%] m-auto gap-2'
              : 'flex cursor-pointer w-[90%] m-auto gap-2'
          }>
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.25 18V17.25C1.25 15.6587 1.88214 14.1326 3.00736 13.0074C4.13258 11.8821 5.6587 11.25 7.25 11.25H8.75C10.3413 11.25 11.8674 11.8821 12.9926 13.0074C14.1179 14.1326 14.75 15.6587 14.75 17.25V18M11.75 4.5C11.75 5.49456 11.3549 6.44839 10.6517 7.15165C9.94839 7.85491 8.99456 8.25 8 8.25C7.00544 8.25 6.05161 7.85491 5.34835 7.15165C4.64509 6.44839 4.25 5.49456 4.25 4.5C4.25 3.50544 4.64509 2.55161 5.34835 1.84835C6.05161 1.14509 7.00544 0.75 8 0.75C8.99456 0.75 9.94839 1.14509 10.6517 1.84835C11.3549 2.55161 11.75 3.50544 11.75 4.5Z"
              stroke="black"
            />
          </svg>
          <p>Profile Settings</p>
        </span>
        <span
          onClick={() => handleActiveTabChange('password')}
          className={
            activeTab === 'password'
              ? 'bg-[#D9EDF8] flex w-[90%] m-auto gap-2'
              : 'flex cursor-pointer w-[90%] m-auto gap-2'
          }>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 8V6C5 3.239 6.239 1 9 1C11.761 1 13 3.239 13 6V8M9 13.75V13.25M13 13.75V13.25M5 13.75V13.25M0.5 15.8V11.2C0.5 10.08 0.5 9.52 0.718 9.093C0.909574 8.71632 1.21554 8.41 1.592 8.218C2.02 8.001 2.58 8.001 3.7 8.001H14.3C15.42 8.001 15.98 8.001 16.408 8.218C16.7843 8.40974 17.0903 8.71569 17.282 9.092C17.5 9.52 17.5 10.08 17.5 11.2V15.8C17.5 16.92 17.5 17.48 17.282 17.908C17.0903 18.2843 16.7843 18.5903 16.408 18.782C15.98 19 15.42 19 14.3 19H3.7C2.58 19 2.02 19 1.592 18.782C1.21569 18.5903 0.909744 18.2843 0.718 17.908C0.5 17.481 0.5 16.921 0.5 15.8Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Password Settings
        </span>
        <span
          onClick={() => handleActiveTabChange('pin')}
          className={
            activeTab === 'pin'
              ? 'bg-[#D9EDF8] flex w-[90%] m-auto gap-2'
              : 'flex cursor-pointer w-[90%] m-auto gap-2'
          }>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 8V6C5 3.239 6.239 1 9 1C11.761 1 13 3.239 13 6V8M9 13.75V13.25M13 13.75V13.25M5 13.75V13.25M0.5 15.8V11.2C0.5 10.08 0.5 9.52 0.718 9.093C0.909574 8.71632 1.21554 8.41 1.592 8.218C2.02 8.001 2.58 8.001 3.7 8.001H14.3C15.42 8.001 15.98 8.001 16.408 8.218C16.7843 8.40974 17.0903 8.71569 17.282 9.092C17.5 9.52 17.5 10.08 17.5 11.2V15.8C17.5 16.92 17.5 17.48 17.282 17.908C17.0903 18.2843 16.7843 18.5903 16.408 18.782C15.98 19 15.42 19 14.3 19H3.7C2.58 19 2.02 19 1.592 18.782C1.21569 18.5903 0.909744 18.2843 0.718 17.908C0.5 17.481 0.5 16.921 0.5 15.8Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Pin Settings
        </span>
        <span
          onClick={() => handleActiveTabChange('notification')}
          className={
            activeTab === 'notification'
              ? 'bg-[#D9EDF8] flex w-[90%] m-auto gap-2'
              : 'flex cursor-pointer w-[90%] m-auto gap-2'
          }>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.4789 5.74891C14.3616 6.05606 15.1267 6.63039 15.668 7.39216C16.2094 8.15394 16.5001 9.06536 16.4999 9.99991V13.6999L18.5729 15.6349C18.6461 15.7034 18.697 15.7923 18.719 15.8901C18.741 15.9879 18.7331 16.09 18.6964 16.1833C18.6596 16.2765 18.5957 16.3566 18.5128 16.413C18.43 16.4695 18.3322 16.4998 18.2319 16.4999H5.76893C5.6684 16.5002 5.57012 16.4701 5.48691 16.4137C5.40371 16.3573 5.33946 16.2771 5.30253 16.1836C5.2656 16.0901 5.25772 15.9876 5.27991 15.8895C5.3021 15.7915 5.35334 15.7024 5.42693 15.6339L7.49993 13.6999V9.99991C7.49972 9.06536 7.79048 8.15394 8.33184 7.39216C8.8732 6.63039 9.6383 6.05606 10.5209 5.74891C10.58 5.39941 10.761 5.08213 11.0317 4.85334C11.3025 4.62455 11.6455 4.49902 11.9999 4.49902C12.3544 4.49902 12.6974 4.62455 12.9681 4.85334C13.2389 5.08213 13.4198 5.39941 13.4789 5.74891Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.585 18.5C10.688 18.793 10.8795 19.0468 11.133 19.2263C11.3864 19.4058 11.6894 19.5022 12 19.5022C12.3106 19.5022 12.6135 19.4058 12.867 19.2263C13.1204 19.0468 13.3119 18.793 13.415 18.5H10.585Z"
              stroke="black"
            />
          </svg>
          Notification Settings
        </span>
      </div>
      <section className=" w-[100%] mt-5  md:w-[60%] h-[100%] border-2 border-[#aaa] shadow-2xl rounded-md md:mt-0 m-auto">
        {activeTab === 'profile' && <ProfileSetting />}
        {activeTab === 'password' && <PasswordSetting />}
        {activeTab === 'notification' && <NotificationSetting />}
        {activeTab === 'pin' && <PinSetting />}
      </section>
    </div>
  );
};

export default SettingType;
