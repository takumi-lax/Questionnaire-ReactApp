import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

// import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// const isSubmitButtonAnabled = true

// const startQuestionnaire = (text1,text2,text3) => {
//   Axios.post('http://127.0.0.1:5000/posttest', {
//       post_text1: text1,
//       post_text2: text2,
//       post_text3: text3,
//     }).then(function(res) {
//       alert(res.data.result);
//     })
// };

// const handleClick = () => {
//   startQuestionnaire("testtest","aaa","bbb");
// };

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
    <AppBar position="static" className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Questionnaire App
      </Typography>
    </AppBar>

    {/* <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      onClick={handleClick}
      disabled={!isSubmitButtonAnabled}
    >
      次へ
  </Button> */}
  </div>
  );
}