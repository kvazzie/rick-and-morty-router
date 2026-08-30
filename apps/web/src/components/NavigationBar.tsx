
import { NavLink, useLocation, useNavigation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Avatar, AvatarIcon } from '@heroui/avatar';
import { Image } from '@heroui/image';
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/characters', label: 'Characters' },
  { path: '/locations', label: 'Locations' },
  { path: '/episodes', label: 'Episodes' },
];

export const AcmeLogo = () => {
  return (
    <div className="flex flex-col leading-tight">
      <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Rick and Morty
      </span>
      <span className="block font-light">Universe Explorer</span>
    </div>
  );
};

export function NavigationBar() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <AcmeLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.path} className="content-center">
            <Link
              as={NavLink}
              to={link.path}
              size="lg"
              isBlock
              color={pathname === link.path ? 
                "success" : 
                navigation.location?.pathname === link.path ? 
                  "foreground" :
                  "primary"
              }
              className="transition-colors-opacity"
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <AuthButtons />
      </NavbarContent>
    </Navbar>
  );
};

function AuthButtons() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <NavbarItem className="lg:flex">
          <Button 
            onPress={logout}
            color="primary"
          >Signout</Button>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="lg:flex">
            <Button 
              as={NavLink}
              to="/login"
              color="primary"
            >Login</Button>
          </NavbarItem>
          <NavbarItem className="lg:flex">
            <Button 
              as={NavLink}
              to="/signup"
              color="primary"
            >Signup</Button>
          </NavbarItem>
        </>
      )}
    </>
  );
}