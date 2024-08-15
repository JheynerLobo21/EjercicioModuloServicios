import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link } from "react-router-dom";
import "./styles.css";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function MenuAppBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const icons = [
    <HomeOutlinedIcon />,
    <FormatListBulletedOutlinedIcon />,
    <PeopleOutlineOutlinedIcon />,
    <SettingsSuggestIcon />,
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickCategory = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img
              className="logo_macropay"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRdWBDuf9TPEgiiIQNl9a0BzeDwrVPLK55bw&usqp=CAU"
              alt="logo macropay"
            />
          </Typography>
          <div className="data-user">
            <div>
              <MenuItem id="name-user" onClick={handleClose}>
                Macropayer Pedro Soler
              </MenuItem>
              <MenuItem id="txt-user" onClick={handleClose}>
                CORP4-AVMJIA
              </MenuItem>
            </div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="success"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
      {['dashboard', 'tickets', 'usuarios', 'configuración'].map((text, index) => (
        <Link
          to={`/${text}`}
          key={`link-${text}`}
          style={{ textTransform: 'uppercase', color: '#070707', textDecoration: 'none' }}
        >
          <ListItem key={text} disablePadding onClick={() => handleClickCategory(index)} style={{margin:"0 8px", width:"93%", borderRadius:"5px"}}>
            <ListItemButton
              sx={{
                backgroundColor: selectedIndex === index ? '#0047BA' : 'transparent',
                color: selectedIndex === index ? '#FFDD00': '#070707',
                marginBottom: '0 8px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <ListItemIcon style={{ textTransform: 'uppercase' }}>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>

        <div className="pet-macropay">
          <img src="/public/img-pet-macropay.png" alt="" />
        </div>
      </Drawer>
    </Box>
  );
}
