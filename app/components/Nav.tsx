"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import styles from "../styles/layout.module.css";
import { Autocomplete, Box, TextField } from "@mui/material";

import { useFetchGeoLocationsQuery } from "@/lib/features/geo-coding/geocodingApiSlice";
import { setGeoLocation } from "@/lib/features/geo-coding/geoCodingSlice";
import { useAppDispatch } from "@/lib/hooks";

const params = {
	"name": 'london',
};

export const Nav = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, isSuccess } = useFetchGeoLocationsQuery(params);


  const menu: any = [
    // { name: "Home", href: "/" },
    // { name: "Verify", href: "/verify" },
    // { name: "Weather", href: "/weather" },
    // { name: "Quotes", href: "/quotes" },
    // { name: "Location search field here", href: "/counter" },
    // { name: "Location to fetch icon", href: "/counter" },
    // { name: "Temparature unit toggle fahrenheit to celsius", href: "/counter" },
  ];

  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  const selectLocation = (event: any, value: any) => {
    console.log('Selected location:', value);
    dispatch(setGeoLocation({ latitude: value.latitude, longitude: value.longitude, city: value.name, country: value.country }));
  }

  return (
      <Disclosure
      as="nav"
      className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"> */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold">Weather Forecast App</span>
            </div>
          {/* </div> */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {menu.map((link: any, index: number) => (
              <Link
                key={index}
                className={`${styles.link} ${pathname === "/" ? "bg-gray-950/50 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"} ${"rounded-md px-3 py-2 text-sm font-medium"}`}
                href={link.href}
              >
                {link.name}
              </Link>
              ))}
               <Autocomplete
                  className={`${styles.link} "text-gray-300 text-white" ${"rounded-md px-3 py-2 text-sm font-medium"}`}
                  disablePortal
                  options={data ? data.results : []}
                  getOptionLabel={(option: any) => option.name + ', ' + option.country}
                  onChange={selectLocation}
                  sx={{
                    width: 300,
                    '& .MuiInputBase-input': {
                      background: '#fff',
                      // borderRadius: '30px'
                    } 
                  }}
                  renderOption={(props, option: any) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          // src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.name}, {option.country}
                      </Box>
                    );
                  }}
                  renderInput={(params) => <TextField {...params} color="secondary" label="Search Location" />}
                />
            </div>
          </div>
        </div>
      </div>
      </div>
      </Disclosure>
  );
};
