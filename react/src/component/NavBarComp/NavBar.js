import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import styles from "../../css/navBar.module.css";

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
        <FaSearch size={24} />
      </NavLink>
      {/* 쇼츠 화면 이동 */}
      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <FaPlusSquare size={24} />
      </NavLink>
      {/* 홈 화면 이동 */}
      <NavLink
        to="/api"
        end
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <FaHome size={24} />
      </NavLink>
      {/* 캘린더 화면 이동 */}
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <FaHeart size={24} />
      </NavLink>
      {/* 마이페이지 화면 이동 */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <FaUser size={24} />
      </NavLink>
    </nav>
  );
}

export default NavBar;
