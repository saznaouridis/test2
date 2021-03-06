import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageHome from "../Dashboard";
import PageAddPosts from "../Posts/PageAddPosts";
import PageViewPosts from "../Posts/PageViewPosts";
import PageAddCategories from "../Categories/PageAddCategories";
import PageViewCategories from "../Categories/PageViewCategories";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  // Setting state
  const initialStatePost = { id: null, title: "", content: "" };
  const [posts, setPosts] = useState([]);
  const [curPost, setCurPost] = useState(initialStatePost);
  const [editPost, setEditPost] = useState(false);
  const getPostData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/posts"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
    return;
  };
  useEffect(() => {
    getPostData();
  }, []);
  const editRowPost = async (post) => {
    setEditPost(true);
    setCurPost(post);
  };

  // Setting state
  const initialStateCategory = {
    id: null,
    name: "",
    description: "",
    slug: "",
  };
  const [Categories, setCategories] = useState([]);
  const [curCategory, setCurCategory] = useState(initialStateCategory);
  const [editCategory, setEditCategory] = useState(false);

  const getCategoryData = async () => {
    const res = await fetch(
      "http://wpchamber.knowledge.gr/wp-json/wp/v2/categories"
    );
    if (!res.ok) {
      // oups! something went wrong
      return;
    }
    const data = await res.json();
    setCategories(data);
    setLoading(false);
    return;
  };
  useEffect(() => {
    getCategoryData();
  }, []);
  const editRowCategory = async (post) => {
    setEditCategory(true);
    setCurCategory(post);
  };

  return (
    <Switch>
      <Route
        exact
        path="/post/add"
        render={() =>
          loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <PageAddPosts
              curPost={curPost}
              editPost={editPost}
              setEditPost={setEditPost}
            />
          )
        }
      />
      <Route
        exact
        path="/post/view"
        render={() =>
          loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <PageViewPosts editRowPost={editRowPost} />
          )
        }
      />
      <Route
        exact
        path="/category/view"
        render={() =>
          loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <PageViewCategories editRowCategory={editRowCategory} />
          )
        }
      />
      <Route
        exact
        path="/category/add"
        render={() =>
          loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <PageAddCategories
              curCategory={curCategory}
              editCategory={editCategory}
              setEditCategory={setEditCategory}
            />
          )
        }
      />

      <Route path="/" exact component={PageHome} />
    </Switch>
  );
};
export default Routes;
