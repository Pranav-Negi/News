import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Newitem from "./Newitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalresults, settotalresults] = useState(0);

  const updatenew = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5ce5b119d85f4aca8e403fccfddc1e6e&page=${page}&pageSize=${props.pagesize}`;
    setloading(true);
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedata = await data.json();
    props.setProgress(70);
    setarticles(parsedata.articles);
    settotalresults(parsedata.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updatenew();
    document.title = `NewHUb-${props.category}`;
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=5ce5b119d85f4aca8e403fccfddc1e6e&page=${
      page + 1
    }&pageSize=${props.pagesize}`;
    setloading(true);
    setpage(page + 1);
    let data = await fetch(url);
    let parsedata = await data.json();
    setarticles(articles.concat(parsedata.articles));
    settotalresults(parsedata.totalResults);
    setloading(false);
  };

  return (
    <>
      <h2 className="text-center my-3" style={{ marginTop: "90px" }}>
        Top Headlines form {props.category}
      </h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalresults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newitem
                    title={element.title}
                    author={element.author}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pagesize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
