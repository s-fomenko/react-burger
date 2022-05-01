import React from 'react';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import Profile from '../../components/profile/profile';
import styles from './profile-page.module.css';
import {Route, Routes} from "react-router";

const ProfilePage = () => (
  <div className={`${styles.main} pl-5 pr-5`}>
    <ProfileNavigation />
    <Routes>
      <Route path='*' element={<Profile />} />
    </Routes>
  </div>
);

export default ProfilePage;
