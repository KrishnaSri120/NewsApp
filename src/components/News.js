import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json()
    props.setProgress(30)
    setArticles(parseData.articles)
    setLoading(false)
    setTotalResults(parseData.totalResults)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews()
    // elsint-disable-next-line
  }, [])

  // handlePrev = async () => {
  //setPage(page - 1)
  //   updateNews()

  // }
  // handleNext = async () => {
  //setPage(page + 1)
  //   updateNews()
  // }

  const fetchMoreData = async () => {
    setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };
  return (
    <>
      <h2 className='text-center' style={{ marginTop: '90px' }}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className='container my-2'>
          <div className='row'>
            {articles.map((element) => {
              return (<div className='col-md-4' key={element.url}>
                <NewsItem title={element.title != null ? element.title.slice(0, 45) : ""} description={element.description != null ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage != null ? element.urlToImage : ""} newsurl={element.url != null ? element.url : ""} author={element.author != null ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
              </div>)
            })}
          </div></div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}

    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
