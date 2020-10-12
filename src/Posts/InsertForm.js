import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPost } from "../DatabaseCrud/PostCrud";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
      textAlign: "center",
      TypographyStyle: {
        color: "blue",
      },
    },
  },
}));

const InsertForm = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPostData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/posts"
    );
    const data = await res.json();
    setPosts(data);
    setLoading(false);
    return;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        alert("Invalid Input");
      } else {
        await addPost(title, content);
        console.log("ok");
        //setLoading(true);

        await getPostData();
        history.push("/post/view");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Τίτλος"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Συμπληρώστε Τίτλο"
              type="text"
              name="Τίτλος"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Περιεχόμενο"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Συμπληρώστε Περιεχόμενο"
              type="text"
              name="Περιεχόμενο"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              ΔΗΜΙΟΥΡΓΙΑ ΔΗΜΟΣΙΕΥΣΗΣ
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/post/view");
              }}
              className="button muted-button"
            >
              ΑΚΥΡΩΣΗ
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
export default InsertForm;
