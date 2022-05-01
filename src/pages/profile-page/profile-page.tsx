import React from 'react';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import Profile from '../../components/profile/profile';
import styles from './profile-page.module.css';
import {Route, Switch} from "react-router";

const ProfilePage = () => (
  <div className={`${styles.main} pl-5 pr-5`}>
    <ProfileNavigation />
    <Switch>
      <Route path='/profile'>
        <Profile />
      </Route>
    </Switch>
  </div>
);

export default ProfilePage;
