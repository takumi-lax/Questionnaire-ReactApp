import React, { useState, useEffect } from 'react';
import { QUESTIONNAIRES } from '../utils/Constants';
import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import firebase from 'firebase/compat/app'

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
});

const Result = props =>  {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getAnswers();
  }, []);

  const getAnswers = () => {
    firebase.database().ref('answers').once('value').then( snapshot => {
      var _answers = [];
      snapshot.forEach( childSnapshot  => {
        _answers.push(childSnapshot.val());
      });
      setAnswers(_answers);
    });
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



  const getHumanReadable = time => {
    const dateTime = new Date(time);
    return dateTime.toLocaleDateString('ja-JP')+dateTime.toLocaleTimeString('ja-JP')
  };

  const getEvaluationItem = questionnaireId => {
      const questionaire = QUESTIONNAIRES.find(element => element.id === questionnaireId);
      return questionaire.descriptionLeft+"-"+questionaire.descriptionRight;
  };

  return (
    <div className={classes.root}>
      {answers.map((answer, key)=>
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
                    Submitted at: {getHumanReadable(answer.submitted_at)}
                </Typography>
            </CardContent>
            </div>
        </Card>
      )}
    </div>
  );
}

export default Result;