import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {CacheProvider} from "@emotion/react";
import {createTheme, ThemeProvider} from "@mui/material";
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {router} from "./routes.tsx";
import {Provider} from "react-redux";
import store from "./store.ts";
import {AdapterMomentJalaali} from "@mui/x-date-pickers/AdapterMomentJalaali";
import {LocalizationProvider} from "@mui/x-date-pickers";

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#F4FBFF"
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1600
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
          <RouterProvider router={router}/>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  </Provider>
);
