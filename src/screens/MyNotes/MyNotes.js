import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

import axios from "axios";
const link =
  "https://opendocs-global.api.airstore.io/v1/get/_/e4f9480d-f7ae-5311-85cf-e9f494950000/a500e6d94d985526bf9fdb818b9e569275d74c9c8ddc52e20c000dee793f6a31.jpg";
const MyNotes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [q, setQ] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setData] = useState([]);
  const deleteHandle = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(
          process.env.REACT_APP_BASE_URL + `api/notes/${id}`,
          config
        );
        alert("Note successfully deleted");
        getNotes();
      } catch (error) {
        alert("Invalid  Action");
        console.log(error);
      }
    }
  };

  const dataFilter = (q, data) => {
    const newData = data?.filter((item) => {
      return item?.title?.toLowerCase().includes(q.toLowerCase());
    });
    setfilterdata(newData);
    console.log(newData);
  };
  const getNotes = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BASE_URL + `api/notes`,
      config
    );
    // console.log(_id);
    // console.log(data);
    // console.log(filterdata);
    setfilterdata(data);
    setData(data);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <button
        type="button"
        style={{ backgroundColor: " #ffffff2e" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <MainScreen title={`Welcome back ${user.name}...`}>
        <Link to="/createnote">
          <Button style={{ marginBottom: 6, marginLeft: 10 }} size="md">
            Create New Tasks
          </Button>
        </Link>
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);

                // console.log(q);
              }}
              onKeyDown={(e) => {
                console.log(e.key);
                if (e.key == "Enter") {
                  dataFilter(q, data);
                }
              }}
            />
            {/* <span className="sr-only">Search</span> */}
          </label>
          <button
            className="search_btn"
            onClick={() => {
              dataFilter(q, data);
            }}
          >
            search
          </button>
        </div>
        <button
          className="SeeAll_btn"
          onClick={() => {
            setfilterdata(data);
          }}
        >
          See All
        </button>

        {filterdata?.map((note, idx) => {
          return (
            <Accordion defaultActiveKey={note._id}>
              <Accordion.Item eventKey={note._id}>
                <Card key={note._id}>
                  <CustomToggle
                    eventKey={note._id}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.18)",
                      border: "none",
                    }}
                  >
                    <Card.Header key={note._id}>
                      <span className="card_title" key={note._id}>
                        {note.title}
                      </span>
                      <div key={note._id}>
                        <Link to="/editnote" key={note._id}>
                          <Button
                            onClick={() => {
                              localStorage.setItem(
                                "noteId",
                                JSON.stringify(note._id)
                              );
                            }}
                            key={note._id}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          key={note._id}
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandle(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                  </CustomToggle>
                  <Accordion.Collapse eventKey={note._id}>
                    <Card.Body key={`${idx}`}>
                      <h4 key={`${idx}`}>
                        <Badge
                          bg="success"
                          color="white"
                          text="light"
                          key={`${idx}`}
                        >
                          {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0" key={`${idx}`}>
                        {/* <div class="content_images">
                           
                        <img src={link} /> 
                        <img src={link} /> 
                        <img src={link} /> 
                        <img src={link} /> 
                        <img src={link} /> 
                        <img src={link} /> 
                       
                            
                        </div> */}

                        <p className="content_text" >{note.content}</p>
                        <footer className="blockquote-footer" key={`${idx}`}>
                          Created on {note.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </MainScreen>
    );
  }
};

export default MyNotes;
