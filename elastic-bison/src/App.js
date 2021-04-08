import {
  DataSearch,
  ReactiveBase,
  ReactiveList,
  ResultList,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import { Button, Card, Tag, Tooltip } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";

function authorValidation(author) {
  if (author.fname === "null") {
    if (author.lname === "null") {
      return "unknown";
    } else {
      return author.lname;
    }
  } else if (author.lname === "null") {
    return author.fname;
  } else {
    return author.fname + "" + author.lname;
  }
}

function getArticleURL(item) {
  return (
    "https://digital.harding.edu/thebison/" +
    item.date +
    ".pdf#page=" +
    item.page
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Bison Index</h1>
        <p>The following is a search interface for the Bison Index.</p>
      </header>

      <div className="Search-Box">
        <ReactiveBase
/*           app="elastic-seminar"
          credentials="fdc4cda1b1c6:d4766f28-ae9f-404a-8d84-80d90c2429ed"
          url="https://elastic-pedro-dvgexed-arc.searchbase.io" */
          app="elastic-bison"
          credentials="NavH:Pjnavh990223#"
          url="https://search-elastic-bison-4hu5udirnnvt7dya2ulgknduku.us-east-2.es.amazonaws.com/"
        >
          <DataSearch
            componentId="General Search"
            dataField={("title", "fname", "lname", "tags")}
            placeholder="Search for a Bison's Article"
            autosuggest={true}
          />

          <div></div>
          <SelectedFilters showClearAll={true} />
          <ReactiveList
            componentId="result"
            title="Results"
            dataField="title"
            from={0}
            size={5}
            pagination={true}
            pages={4}
            react={{
              and: ["General Search", "ratingsfilter"],
            }}
            render={({ data }) => (
              <ReactiveList.ResultListWrapper>
                {data.map((item) => (
                  <ResultList key={item._id}>
                    <Card
                      title={item.title}
                      extra={
                        <Tooltip title="Read the article">
                          <Button
                            type="circle link"
                            target="_blank"
                            href={getArticleURL(item)}
                            icon={<ArrowRightOutlined />}
                          ></Button>
                        </Tooltip>
                      }
                    >
                      <p className="card-date">
                        In: {item.date}, page: {item.page}
                      </p>

                      <p className="card-author">
                        By: {authorValidation(item)}
                      </p>

                      <div className="card-tags">
                        {item.tags.map((x) => (
                          <Tag key={x}>{x}</Tag>
                        ))}
                      </div>
                    </Card>
                    <div></div>
                  </ResultList>
                ))}
              </ReactiveList.ResultListWrapper>
            )}
          />
        </ReactiveBase>
      </div>
    </div>
  );
}

export default App;
