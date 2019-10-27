// import React, { useContext, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// // Context
// import TimeContext from '../contexts/TimeContext'
// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     // borderBottom: '0px solid rgba(0, 0, 0, 0.42);'
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//     color: 'pink',
//     // borderBottom: '0px solid rgba(0, 0, 0, 0)'
//   },
//   underline: {
//     borderBottom: '4px solid rgba(0, 0, 0, 0) !important'
//   }



// }));

// export default function Test() {
//   const classes = useStyles();

//   const [show, setShow] = React.useState(false);

//   const timeContext = useContext(TimeContext)

//   const time = timeContext.time
//   const setTime = timeContext.setTime



// // $('.placeholder').on('click', function (ev) {
// //   $('.placeholder').css('opacity', '0');
// //   $('.list__ul').toggle();
// // });

// function openList(event) {
//   console.log(event)
//   setShow(true)
// }

// function closeList(event) {
//   console.log(event)
//   // setShow(false)
// }

// const handleChange = event => {
//   const newTime = {...time}
//   let newIntervalTime
//   if (event.target.value === "")
//   {
//     newIntervalTime = 1
//   }
//   else {
//     newIntervalTime = event.target.value
//   }
//   newTime.intervalTime = newIntervalTime
//   setTime(newTime)
// };

// function renderDefaultValue() {
// return time.intervalTime;
// }


//   return (
//     <FormControl className={classes.formControl}>
//             <Select
//                 htmlFor="outlined-age-simple"
//                 value={time.intervalTime}
//                 onChange={handleChange}
//                 name="intervalTime"
//                 className={classes.selectEmpty}
//                 displayEmpty={true}
//                 renderValue={renderDefaultValue}
//                 disableUnderline={true}
//                 >
//                 <MenuItem value={1}>1</MenuItem>
//                 <MenuItem value={10}>15</MenuItem>
//                 <MenuItem value={20}>30</MenuItem>
//                 <MenuItem value={30}>45</MenuItem>
//                 <MenuItem value={30}>60</MenuItem>
//             </Select>
//                 {/* <FormHelperText>Label + placeholder</FormHelperText> */}
//     </FormControl>





//   );
// }
//  /* <div className={classes.wrapper2, classes.typo}>This is a custom
//        <div className={classes.list}>
//         <span className={classes.placeholder} onClick={openList}>Select
//         </span>
//         {show &&
//             <select value={0} onClick={closeList}>
//               <option value={1}>1</option>
//               <option value={2}>2</option>
//               <option value={3}>3</option>
//               <option value={4}>4</option>
//               <option value={5}>5</option>
//             </select>
//         }
//       </div>
//     </div> */

// /*
//  <FormControl variant="outlined" className={classes.formControl,classes.formControl2, classes.typo}>
//                           <Select
//                   htmlFor="outlined-age-simple"
//                   value={time.numOrders}
//                   onChange={handleChange}
//                   name="numOrders"
//                   className={classes.select}
//                   placeholder={time.numOrders}
//                   displayEmpty={true}
//                   renderValue={renderDefaultValue}
//                 >
//                 <MenuItem value={1}>1</MenuItem>
//                 <MenuItem value={2}>2</MenuItem>
//                 <MenuItem value={3}>3</MenuItem>
//                 <MenuItem value={4}>4</MenuItem>
//                 <MenuItem value={5}>5</MenuItem>
//                 </Select>

//           </FormControl>
// */
