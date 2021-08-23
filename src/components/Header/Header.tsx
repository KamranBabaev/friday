import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';


export const Header = () => {
  return (
      <div className={styles.header}>
        <div className={styles.navHeader}>
          <div>
            <NavLink to={'/login'}>Login</NavLink>
          </div>
          <div>
            <NavLink to={'/profile'}>Profile</NavLink>
          </div>
          <div>
            <NavLink to={'/registration'}>Registration</NavLink>
          </div>
          <div>
            <NavLink to={'/restorpassword'}>Restore password</NavLink>
          </div>
          <div>
            <NavLink to={'/inputpassword'}>Input password</NavLink>
          </div>
          <div>
            <NavLink to={'/error404'}>Error404</NavLink>
          </div>
        </div>
      </div>
  )
}