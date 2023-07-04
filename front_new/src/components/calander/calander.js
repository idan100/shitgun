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
         <DateCalendar value={value} onChange={(newValue) => {
            setLocalStorage(newValue);
            window.location.reload();
            
            //axios.get(`${process.env.REACT_APP_API}/schedules/free/${localStorage.getItem('class')}/${localStorage.getItem('date')}`)
            //   .then(res => {
            //      setRows(res.data.schedule.map(row => ({ name: row.person === 'free' ? 'פנוי' : row.person, hour: Math.floor(row.hour) === row.hour ? `${row.hour}:00` : `${Math.floor(row.hour)}:30` })));
            //   }).catch(err => {
            //      console.log(err)
            //   })
         }} />
      </LocalizationProvider>
   );
}