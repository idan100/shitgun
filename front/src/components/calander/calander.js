import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function BasicDateCalendar() {

   const [value, setValue] = React.useState(dayjs(new Date()));

   const setLocalStorage = (newValue) => {
      localStorage.setItem('date', newValue);
      setValue(newValue);
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar value={value} onChange={(newValue) => setLocalStorage(newValue)} />
      </LocalizationProvider>
   );
}