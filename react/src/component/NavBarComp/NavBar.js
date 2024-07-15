import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/navBar.module.css";
import { TbCalendar } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import { TbUserCircle } from "react-icons/tb";
import { TbMovie } from "react-icons/tb";
import { TbMap } from "react-icons/tb";
function NavBar() {
  return (
    <nav className={styles.navbar}>
      {/* 지도 화면 이동 */}
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbMap size={30} />
      </NavLink>
      {/* 쇼츠 화면 이동 */}
      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbMovie size={30} />
      </NavLink>
      {/* 홈 화면 이동 */}
      <NavLink
        to="/api/home"
        end
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbHome size={30} />
      </NavLink>
      {/* 캘린더 화면 이동 */}
      <NavLink
        to="/api/schedule"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbCalendar size={30} />
      </NavLink>
      {/* 마이페이지 화면 이동 */}
      <NavLink
        to="/api/mypage"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbUserCircle size={30} />
      </NavLink>
    </nav>
  );
}

export default NavBar;
