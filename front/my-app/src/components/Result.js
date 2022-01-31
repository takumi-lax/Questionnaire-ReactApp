import React, { useState, useEffect } from 'react';
import { QUESTIONNAIRES } from '../utils/Constants';
import { Button, Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Axios from 'axios';
// import firebase from 'firebase/compat/app';

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexWrap:"wrap",
    justifyContent: "space-around",
  },
  card: {
    width: 500,
    margin: 10,
    display: "flex",
    flexDirection: "row",
  },
  media: {
    width: 200,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  button2: {
    top: 40,
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
  },
});

const Result = props =>  {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getAnswers();
  }, []);

  // const getAnswers = () => {
  //   firebase.database().ref('answers').once('value').then( snapshot => {
  //     var _answers = [];
  //     snapshot.forEach( childSnapshot  => {
  //       _answers.push(childSnapshot.val());
  //     });
  //     setAnswers(_answers);
  //   });
  // };

  const getAnswers = () => {
    Axios.get('http://127.0.0.1:5000/answers')
      .then(function(res) {
        // alert(res)
        // Object.values(res.data).map((answer, key)=>{
        //   alert(answer.image_id)
        // });
        // alert(res)
        // alert(Object.keys(res.data))
        // Object.kyes(res.data).array.forEach(element => {
        //   alert(element)
        // });
        // alert(res.data.aki_0);
        // alert(Object.keys(res.data.aki_0));
        // alert(res.data.aki_0.contents);
        // alert(Object.keys(res.data.aki_0.contents));
        // alert(res.data["aki_0"]["image_id"]);
        const answers = res.data;
        // alert(answer)
        setAnswers(answers);
      })
  };



  // const getAnswers = () => {
  //   Axios.get('http://127.0.0.1:5000/image',{
  //   }).then(function (response) {
  //     const res = response.data;
  //     // alert(JSON.stringify(response.data));
  //     // alert(JSON.stringify(res["image"]["id"]));
    
  //     setImageId(res["image"]["id"]);
  //     const imageId = res["image"]["id"]
    
  // })
  // }



  // const getHumanReadable = time => {
  //   const dateTime = new Date(time);
  //   return dateTime.toLocaleDateString('ja-JP')+dateTime.toLocaleTimeString('ja-JP')
  // };

  const getEvaluationItem = questionnaireId => {
      const questionaire = QUESTIONNAIRES.find(element => element.id === questionnaireId);
      return questionaire.descriptionLeft+"-"+questionaire.descriptionRight;
  };


  const startReQuestionnaire = (image_id) => {
    props.history.push({
      pathname: "/requestionnaire",
      state: {"image_id": image_id},
    });
  };

  const handleClick = (image_id) => {
    startReQuestionnaire(image_id);
    // alert(image_id)
  };

  const handleClick2 = () => {
    startHome();
  };

  const startHome = () => {
    props.history.push({
      pathname: "/",
    });
  };

  return (
    <div className={classes.root}>

      {Object.values(answers).map((answer, key)=>

        <Card className={classes.card} key={key}>
            
            <CardMedia
              className={classes.media}
              image={`http://127.0.0.1:5000/image/${answer.image_id}`}
              title="Drawing"
            />

            <div className={classes.details}>

            <CardContent>

                {Object.values(answer.contents).map((content, key)=>

                    <Typography gutterBottom variant="body2" component="h2" key={key}>

                      {getEvaluationItem(content.questionaire_id)} :　{content.value}
                      
                    </Typography>

                )}

                <Typography variant="body2" color="textSecondary" component="p">
                    Submitted at: {(answer.time)}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  // className={classes.button}
                  onClick={() => handleClick(answer.image_id)}
                  // disabled={!isSubmitButtonAnabled}
                >
                  回答修正
                </Button>

            </CardContent>
            </div>
        </Card>

        

      )}
      <Button
        variant="outlined"
        color="primary"
        className={classes.button2}
        onClick={handleClick2}
        // disabled={!isSubmitButtonAnabled}
      >
        Home
      </Button>
    </div>
    
  );
}

export default Result;